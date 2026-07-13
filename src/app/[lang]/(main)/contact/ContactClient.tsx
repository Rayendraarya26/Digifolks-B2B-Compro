"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { sendLaunchpadEmail } from "@/app/actions/ContactEmail";

const budgetOptions = [
  "< RP 15 Juta",
  "RP 15 – 20 Juta",
  "RP 20 – 50 Juta",
  "RP 50 – 150 Juta",
  "> RP 150 Juta",
];

export default function ContactClient({ dict }: { dict: any }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await sendLaunchpadEmail({
        name,
        company: company || "Not Provided",
        email,
        service: selectedCategories.length > 0 ? selectedCategories.join(", ") : "Not Provided",
        budget: selectedBudget || "Not Provided",
        currency: "IDR",
        details: message,
      });

      if (response && response.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setSelectedCategories([]);
        setSelectedBudget("");
      } else {
        console.error("Failed to send email:", response?.message);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const t = dict.contact;

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-navy-light/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <Reveal>
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-text-pure mb-6 leading-tight">
              {t.hero.titleLine1} <br />{t.hero.titleLine2}
            </h1>
            <p className="text-xl text-text-off-white max-w-2xl leading-relaxed">
              {t.hero.desc}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-navy-light border border-border-flat/10 rounded-2xl p-8 md:p-12 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* 1. Project Categories */}
              <div>
                <label className="block text-sm font-bold text-text-pure mb-4 uppercase tracking-wider">
                  {t.form.lookingFor}
                </label>
                <div className="flex flex-wrap gap-3">
                  {t.form.categories.map((cat: string) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-4 py-2 text-sm rounded-full transition-all duration-300 border ${isSelected
                          ? 'bg-accent-emerald text-navy-base border-accent-emerald font-semibold'
                          : 'bg-transparent text-text-off-white/70 border-border-flat/20 hover:border-accent-emerald hover:text-accent-emerald'
                          }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Budget Pills */}
              <div>
                <label className="block text-sm font-bold text-text-pure mb-4 uppercase tracking-wider">
                  {t.form.budget}
                </label>
                <div className="flex flex-wrap gap-3">
                  {budgetOptions.map((option) => {
                    const isSelected = selectedBudget === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedBudget(prev => prev === option ? "" : option)}
                        className={`px-4 py-2 text-sm rounded-full transition-all duration-300 border ${isSelected
                          ? 'bg-accent-emerald text-navy-base border-accent-emerald font-semibold'
                          : 'bg-transparent text-text-off-white/70 border-border-flat/20 hover:border-accent-emerald hover:text-accent-emerald'
                          }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Text Inputs */}
              <div className="space-y-8">
                {/* Row 1: Name + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      name="name"
                      type="text"
                      id="name"
                      className="w-full bg-transparent border-b border-border-flat/30 py-3 px-0 text-text-pure focus:outline-none focus:border-accent-emerald transition-colors peer placeholder-transparent"
                      placeholder="Name"
                      required
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-3 text-text-off-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-emerald peer-valid:-top-4 peer-valid:text-xs"
                    >
                      {t.form.name}
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      name="company"
                      type="text"
                      id="company"
                      className="w-full bg-transparent border-b border-border-flat/30 py-3 px-0 text-text-pure focus:outline-none focus:border-accent-emerald transition-colors peer placeholder-transparent"
                      placeholder="Company"
                    />
                    <label
                      htmlFor="company"
                      className="absolute left-0 top-3 text-text-off-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-emerald peer-placeholder-shown:top-3 peer-placeholder-shown:text-base -top-4 text-xs"
                    >
                      {t.form.company}
                    </label>
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="relative group">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-b border-border-flat/30 py-3 px-0 text-text-pure focus:outline-none focus:border-accent-emerald transition-colors peer placeholder-transparent"
                    placeholder="Email"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-text-off-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-emerald peer-valid:-top-4 peer-valid:text-xs"
                  >
                    {t.form.email}
                  </label>
                </div>

                {/* Row 3: Message */}
                <div className="relative group">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-border-flat/30 py-3 px-0 text-text-pure focus:outline-none focus:border-accent-emerald transition-colors peer placeholder-transparent resize-none"
                    placeholder="Tell us about your project"
                    required
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-3 text-text-off-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-emerald peer-valid:-top-4 peer-valid:text-xs"
                  >
                    {t.form.message}
                  </label>
                </div>
              </div>

              {/* 4. Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button size="lg" type="submit" disabled={loading} className="w-full sm:w-auto disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-navy-base/30 border-t-navy-base rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : t.form.submit}
                </Button>
                {status === "success" && (
                  <span className="text-accent-emerald text-sm font-medium">
                    ✓ Message sent successfully!
                  </span>
                )}
                {status === "error" && (
                  <span className="text-red-400 text-sm font-medium">
                    ✕ Failed to send. Please try again.
                  </span>
                )}
              </div>
            </form>
          </div>
        </Reveal>

        {/* Credibility Footer */}
        <Reveal delay={0.2}>
          <div className="mt-16 pt-8 border-t border-border-flat/10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-text-pure mb-3 uppercase tracking-wider">{t.info.directContact}</h4>
              <a href="mailto:digifolkstech@gmail.com" className="block text-base text-accent-emerald hover:underline mb-1">
                digifolkstech@gmail.com
              </a>
              <a href="mailto:marketing@digifolks.id" className="block text-base text-accent-emerald hover:underline">
                marketing@digifolks.id
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-pure mb-3 uppercase tracking-wider">{t.info.headquarters}</h4>
              <p className="text-text-off-white/70 leading-relaxed">
                {t.info.hqAddress}<br />
                {t.info.hqLabel}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
