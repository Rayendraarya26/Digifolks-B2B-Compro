"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading2, Heading3, Heading4, List, ListOrdered, Quote,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Unlink, Image as ImageIcon,
  Undo, Redo, Minus, UploadCloud, Loader2
} from "lucide-react";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article content here...",
}: RichTextEditorProps) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent-emerald underline underline-offset-4 hover:opacity-80",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-2xl max-w-full my-6 border border-border-flat/20 shadow-xl",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[360px] p-4 text-text-off-white/90 leading-relaxed font-body",
      },
    },
  });

  if (!editor) {
    return (
      <div className="h-64 rounded-2xl border border-border-flat/20 bg-navy-base flex items-center justify-center text-text-off-white/40 font-mono text-xs">
        Loading editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImageUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size exceeds 10MB limit.");
      return;
    }

    try {
      setIsUploadingImage(true);
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const sanitizedName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
      const fileName = `content/${Date.now()}-${sanitizedName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
      if (data?.publicUrl) {
        editor.chain().focus().setImage({ src: data.publicUrl }).run();
      }
    } catch (err: any) {
      console.error("Failed to upload content image:", err);
      alert(`Image upload failed: ${err.message || "Unknown error"}`);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-border-flat/20 bg-navy-base/80 overflow-hidden shadow-xl focus-within:border-accent-emerald/50 transition-colors">
      {/* Hidden file input for content images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border-flat/15 bg-[#091527]/90 backdrop-blur-md sticky top-0 z-10">
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            editor.isActive("heading", { level: 2 })
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            editor.isActive("heading", { level: 3 })
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
            editor.isActive("heading", { level: 4 })
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Heading 4"
        >
          H4
        </button>

        <div className="w-[1px] h-5 bg-border-flat/20 mx-1" />

        {/* Basic Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("bold")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("italic")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("underline")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("strike")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("code")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-border-flat/20 mx-1" />

        {/* Lists & Quotes */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("bulletList")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("orderedList")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("blockquote")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded-lg text-text-off-white/70 hover:bg-navy-light hover:text-text-pure transition-all cursor-pointer"
          title="Horizontal Divider"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-border-flat/20 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive({ textAlign: "left" })
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive({ textAlign: "center" })
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive({ textAlign: "right" })
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Align Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-border-flat/20 mx-1" />

        {/* Links */}
        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            editor.isActive("link")
              ? "bg-accent-emerald text-navy-base"
              : "text-text-off-white/70 hover:bg-navy-light hover:text-text-pure"
          }`}
          title="Add / Edit Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        {editor.isActive("link") && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
            title="Remove Link"
          >
            <Unlink className="w-4 h-4" />
          </button>
        )}

        <div className="w-[1px] h-5 bg-border-flat/20 mx-1" />

        {/* Image insertion: Upload & URL */}
        <button
          type="button"
          disabled={isUploadingImage}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-light/80 hover:bg-navy-light text-accent-emerald text-xs font-mono font-medium transition-all cursor-pointer disabled:opacity-50"
          title="Upload image from computer"
        >
          {isUploadingImage ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Image</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={addImageUrl}
          className="p-1.5 rounded-lg text-text-off-white/70 hover:bg-navy-light hover:text-text-pure transition-all cursor-pointer"
          title="Insert image by URL"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-border-flat/20 mx-1" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded-lg text-text-off-white/70 hover:bg-navy-light hover:text-text-pure disabled:opacity-30 transition-all cursor-pointer"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded-lg text-text-off-white/70 hover:bg-navy-light hover:text-text-pure disabled:opacity-30 transition-all cursor-pointer"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Surface */}
      <div className="blog-editor-surface bg-[#0B172B] min-h-[380px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
