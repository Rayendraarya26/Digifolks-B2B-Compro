"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Settings, 
  Save, 
  Plus, 
  Trash2, 
  Globe, 
  Mail, 
  Video, 
  Phone, 
  Link as LinkIcon, 
  CheckCircle2 
} from "lucide-react";
import { saveGeneralSettings } from "../actions";
import { GeneralSettings, ContactNumber } from "@/lib/supabase/types";

export function SettingsManager({ initialSettings }: { initialSettings: GeneralSettings | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form State
  const [heroAnimationUrl, setHeroAnimationUrl] = useState(initialSettings?.hero_animation_url || "/Video/Hero/HeroAnimV2.webm");
  const [heroCtaUrl, setHeroCtaUrl] = useState(initialSettings?.hero_cta_url || "/contact");
  const [grandCtaUrl, setGrandCtaUrl] = useState(initialSettings?.grand_cta_url || "/services");
  const [bookMeetingUrl, setBookMeetingUrl] = useState(initialSettings?.book_meeting_url || "/book-meeting");
  const [instagramUrl, setInstagramUrl] = useState(initialSettings?.instagram_url || "https://instagram.com");
  const [linkedinUrl, setLinkedinUrl] = useState(initialSettings?.linkedin_url || "https://linkedin.com");
  const [githubUrl, setGithubUrl] = useState(initialSettings?.github_url || "https://github.com");
  const [email, setEmail] = useState(initialSettings?.email || "digifolkstech@gmail.com");

  // Contact numbers
  const [contactNumbers, setContactNumbers] = useState<ContactNumber[]>(() => {
    if (!initialSettings?.contact_numbers) return [];
    if (typeof initialSettings.contact_numbers === "string") {
      try {
        return JSON.parse(initialSettings.contact_numbers);
      } catch {
        return [];
      }
    }
    return initialSettings.contact_numbers;
  });

  const handleAddContact = () => {
    setContactNumbers([
      ...contactNumbers,
      {
        name: "",
        displayNumber: "",
        contactNumber: "",
        hoverColor: "hover:text-pop-green",
      },
    ]);
  };

  const handleContactChange = (index: number, field: keyof ContactNumber, value: string) => {
    const updated = [...contactNumbers];
    updated[index] = { ...updated[index], [field]: value };
    setContactNumbers(updated);
  };

  const handleRemoveContact = (index: number) => {
    setContactNumbers(contactNumbers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      await saveGeneralSettings({
        id: initialSettings?.id,
        hero_animation_url: heroAnimationUrl,
        hero_cta_url: heroCtaUrl,
        grand_cta_url: grandCtaUrl,
        book_meeting_url: bookMeetingUrl,
        instagram_url: instagramUrl,
        linkedin_url: linkedinUrl,
        github_url: githubUrl,
        email,
        contact_numbers: contactNumbers,
      });

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert("Error saving settings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {saved && (
        <div className="flex items-center gap-2.5 p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald text-sm animate-fadeIn">
          <CheckCircle2 className="h-5 w-5" />
          <span>General settings saved successfully!</span>
        </div>
      )}

      {/* Hero & Media Settings */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-border-flat/10 pb-3">
          <Video className="h-4 w-4 text-accent-emerald" />
          <h2 className="text-sm font-bold text-text-pure">Media & Hero Assets</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              Hero Video / Animation Asset Path
            </label>
            <input
              type="text"
              value={heroAnimationUrl}
              onChange={(e) => setHeroAnimationUrl(e.target.value)}
              placeholder="/Video/Hero/HeroAnimV2.webm"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
            <span className="text-[11px] text-text-off-white/40 mt-1 block">
              Relative path inside the `/public` folder or external CDN video URL.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation & CTA Links */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-border-flat/10 pb-3">
          <LinkIcon className="h-4 w-4 text-blue-400" />
          <h2 className="text-sm font-bold text-text-pure">Call-to-Action (CTA) Destinations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              Hero Primary CTA
            </label>
            <input
              type="text"
              value={heroCtaUrl}
              onChange={(e) => setHeroCtaUrl(e.target.value)}
              placeholder="/contact"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              Grand CTA Destination
            </label>
            <input
              type="text"
              value={grandCtaUrl}
              onChange={(e) => setGrandCtaUrl(e.target.value)}
              placeholder="/services"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              Book Meeting URL
            </label>
            <input
              type="text"
              value={bookMeetingUrl}
              onChange={(e) => setBookMeetingUrl(e.target.value)}
              placeholder="/book-meeting"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social & Contact */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-border-flat/10 pb-3">
          <Globe className="h-4 w-4 text-purple-400" />
          <h2 className="text-sm font-bold text-text-pure">Contact & Social Channels</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              Company Contact Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="digifolkstech@gmail.com"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/company/digifolks"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              Instagram URL
            </label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/digifolks"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/digifolks"
              className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp Contact Representatives */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border-flat/10 pb-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-text-pure">Contact Representatives (WhatsApp)</h2>
          </div>
          <button
            type="button"
            onClick={handleAddContact}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-emerald hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Person
          </button>
        </div>

        <div className="space-y-3">
          {contactNumbers.map((person, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-navy-base border border-border-flat/10 grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <div>
                <label className="block text-[10px] font-mono uppercase text-text-off-white/60 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handleContactChange(idx, "name", e.target.value)}
                  placeholder="e.g. Ailsa"
                  className="w-full bg-[#0F1E36] border border-border-flat/10 rounded-lg px-2.5 py-1.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-text-off-white/60 mb-1">
                  Display Number
                </label>
                <input
                  type="text"
                  value={person.displayNumber}
                  onChange={(e) => handleContactChange(idx, "displayNumber", e.target.value)}
                  placeholder="+62 895-4010-88270"
                  className="w-full bg-[#0F1E36] border border-border-flat/10 rounded-lg px-2.5 py-1.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-text-off-white/60 mb-1">
                  WhatsApp URL
                </label>
                <input
                  type="text"
                  value={person.contactNumber}
                  onChange={(e) => handleContactChange(idx, "contactNumber", e.target.value)}
                  placeholder="https://wa.me/62895..."
                  className="w-full bg-[#0F1E36] border border-border-flat/10 rounded-lg px-2.5 py-1.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-mono uppercase text-text-off-white/60 mb-1">
                    Hover Class
                  </label>
                  <input
                    type="text"
                    value={person.hoverColor}
                    onChange={(e) => handleContactChange(idx, "hoverColor", e.target.value)}
                    placeholder="hover:text-pop-green"
                    className="w-full bg-[#0F1E36] border border-border-flat/10 rounded-lg px-2.5 py-1.5 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveContact(idx)}
                  className="p-2 rounded-lg text-text-off-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Remove Contact"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {contactNumbers.length === 0 && (
            <p className="text-xs text-text-off-white/40 italic py-2">
              No contact representatives configured. Click "Add Person" above to add one.
            </p>
          )}
        </div>
      </div>

      {/* Save Action Bar */}
      <div className="flex items-center justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-6 py-3 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,223,137,0.2)] disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Saving Changes..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
