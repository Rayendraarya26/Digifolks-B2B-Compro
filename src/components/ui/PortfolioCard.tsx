import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import type { Portfolio } from "@/lib/supabase/types";

interface PortfolioCardProps {
  study: Portfolio;
  href: string;
  coverImage: string;
  proposalBadge?: string;
  delay?: number;
}

const MAX_CARD_PILLS = 4;

export function PortfolioCard({
  study,
  href,
  coverImage,
  proposalBadge = "Professional Portfolio for Stakeholder Proposals",
  delay = 0,
}: PortfolioCardProps) {
  const allTags = Array.isArray(study.tags) ? study.tags.filter(Boolean) : [];
  const hasOverflowTags = allTags.length > MAX_CARD_PILLS;
  const visibleTags = hasOverflowTags
    ? allTags.slice(0, MAX_CARD_PILLS - 1)
    : allTags;
  const hiddenTags = hasOverflowTags
    ? allTags.slice(MAX_CARD_PILLS - 1)
    : [];

  return (
    <Reveal delay={delay} className="h-full min-w-0">
      <Link
        href={href}
        className="group block h-full min-w-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-emerald"
      >
        <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border-flat bg-bg-pure transition-all duration-300 hover:border-accent-forest/30 hover:shadow-2xl">
          {/* Card Header Visual: Project Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-base">
            <img
              src={coverImage}
              alt={study.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-base/60 via-transparent to-transparent" />

            {/* Proposal Badge */}
            {study.is_proposal && (
              <span
                title={proposalBadge}
                className="pointer-events-none absolute top-3 left-3 z-10 inline-block max-w-[calc(100%-1.5rem)] truncate rounded-md border border-accent-emerald/40 bg-navy-base/85 px-2.5 py-1 font-mono text-[9px] font-medium text-accent-emerald shadow-lg backdrop-blur-md transition-[max-width] duration-200 group-hover:max-w-[calc(100%-4.25rem)] sm:top-4 sm:left-4 sm:max-w-[calc(100%-2rem)] sm:text-[10px] sm:group-hover:max-w-[calc(100%-5rem)]"
              >
                {proposalBadge}
              </span>
            )}

            {/* Hover Indicator */}
            <div className="pointer-events-none absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-navy-light bg-navy-base/60 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 sm:top-4 sm:right-4 sm:h-9 sm:w-9">
              <ArrowUpRight className="h-4 w-4 text-accent-emerald" />
            </div>
          </div>

          {/* Card Body */}
          <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
            {/* Eyebrow Metadata Row: Industry + Year */}
            <div className="mb-1.5 flex min-w-0 items-center justify-between gap-2">
              <span
                title={study.industry}
                className="min-w-0 truncate text-[11px] font-semibold uppercase tracking-wider text-accent-forest"
              >
                {study.industry}
              </span>
              {study.year && (
                <span className="shrink-0 font-mono text-[11px] text-text-muted/75">
                  {study.year}
                </span>
              )}
            </div>

            {/* Client Name (Full-width dedicated row so long names never crush Industry) */}
            <p
              title={study.client}
              className="mb-2 line-clamp-2 break-words font-mono text-[11px] font-medium uppercase leading-snug tracking-wide text-text-muted sm:text-xs"
            >
              {study.client}
            </p>

            {/* Project Title */}
            <h3
              title={study.title}
              className="mb-4 line-clamp-3 break-words text-base font-bold leading-snug text-navy-base transition-colors duration-300 group-hover:text-accent-forest sm:text-lg"
            >
              {study.title}
            </h3>

            {/* Footer Tech Tags (Capped cleanly for uniform card height across rows) */}
            {visibleTags.length > 0 && (
              <div className="mt-auto border-t border-border-flat pt-3.5">
                <div className="flex flex-wrap items-start content-start gap-1.5 md:min-h-[3.875rem]">
                  {visibleTags.map((tag) => (
                    <span
                      key={tag}
                      title={tag}
                      className="inline-flex max-w-full items-center truncate rounded-md border border-border-flat bg-[#1e293b]/5 px-2 py-0.5 font-mono text-[11px] text-text-muted sm:px-2.5 sm:py-1"
                    >
                      {tag}
                    </span>
                  ))}
                  {hiddenTags.length > 0 && (
                    <span
                      title={hiddenTags.join(", ")}
                      className="inline-flex shrink-0 items-center rounded-md border border-accent-forest/20 bg-accent-forest/10 px-2 py-0.5 font-mono text-[11px] font-medium text-accent-forest sm:px-2.5 sm:py-1"
                    >
                      +{hiddenTags.length}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

