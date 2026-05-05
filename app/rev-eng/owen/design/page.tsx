import Link from "next/link";
import {
  Fraunces,
  Inter,
  Instrument_Serif,
  Space_Grotesk,
  Syne,
} from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-space",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
  variable: "--font-syne",
});

type BrandSlug =
  | "texas-custom-timepiece"
  | "modded-seiko"
  | "yohman"
  | "bench-22";

type Brand = {
  slug: BrandSlug;
  name: string;
  shortName: string;
  tagline: string;
  shelf: string;
  palette: { bg: string; ink: string; accent: string; quiet: string };
  swatches: { label: string; hex: string }[];
  positioning: string;
  noteOnFit: string;
  wordmarkFont:
    | "fraunces"
    | "inter-clean"
    | "instrument"
    | "space"
    | "syne";
};

const BRANDS: Brand[] = [
  {
    slug: "texas-custom-timepiece",
    name: "Texas Custom Timepiece",
    shortName: "TCT",
    tagline: "Seiko inside. Iconic outside. Built honestly.",
    shelf: "In the Hodinkee · A. Lange · Worn & Wound shelf",
    palette: {
      bg: "#EFE7D6",
      ink: "#1A1612",
      accent: "#B8732A",
      quiet: "#4E5C3F",
    },
    swatches: [
      { label: "Paper", hex: "#EFE7D6" },
      { label: "Ink", hex: "#1A1612" },
      { label: "Copper", hex: "#B8732A" },
      { label: "Moss", hex: "#4E5C3F" },
    ],
    positioning:
      "Editorial horology. Treats TCT like a Hodinkee long-form. Best for collectors and serious watch buyers.",
    noteOnFit:
      "Highest design ceiling. Most distinct in the modder category. Already-owned domain (texascustomtimepiece.com).",
    wordmarkFont: "fraunces",
  },
  {
    slug: "modded-seiko",
    name: "Modded Seiko",
    shortName: "MS",
    tagline: "Built by hand. Shipped on time. Replied to in hours.",
    shelf: "In the Apple · Aesop · Vacheron Constantin shelf",
    palette: {
      bg: "#F5F5F2",
      ink: "#0A0A0A",
      accent: "#1F4DD2",
      quiet: "#6B6B6B",
    },
    swatches: [
      { label: "White", hex: "#F5F5F2" },
      { label: "Carbon", hex: "#0A0A0A" },
      { label: "Cobalt", hex: "#1F4DD2" },
      { label: "Stone", hex: "#6B6B6B" },
    ],
    positioning:
      "Apple-clean modern minimal. Preserves the @moddedseiko IG equity (300+ followers, 85 posts) by evolving — not abandoning — the existing handle.",
    noteOnFit:
      "Lowest-risk path. Looks like a tech product. Best for first-time buyers who want trust signals fast.",
    wordmarkFont: "inter-clean",
  },
  {
    slug: "yohman",
    name: "Yohman Watch Co.",
    shortName: "YWC",
    tagline: "Help from the same person who builds your watch.",
    shelf: "In the Drake's · Best Made · Filson · Bedrock shelf",
    palette: {
      bg: "#E8DFC9",
      ink: "#3A2A1A",
      accent: "#A6661A",
      quiet: "#594232",
    },
    swatches: [
      { label: "Linen", hex: "#E8DFC9" },
      { label: "Walnut", hex: "#3A2A1A" },
      { label: "Brass", hex: "#A6661A" },
      { label: "Saddle", hex: "#594232" },
    ],
    positioning:
      "Workshop / craftsman. Owen's last name as the brand. Founder-led, hands-on, behind-the-bench documentary feel.",
    noteOnFit:
      "Highest founder-equity option. If the brand should be Owen long-term, this is it.",
    wordmarkFont: "instrument",
  },
  {
    slug: "bench-22",
    name: "Bench 22",
    shortName: "B/22",
    tagline: "No — I built it myself.",
    shelf: "In the Aimé Leon Dore · Drake's drops shelf",
    palette: {
      bg: "#0E0E0E",
      ink: "#F5F1EA",
      accent: "#D9FF00",
      quiet: "#7A7A7A",
    },
    swatches: [
      { label: "Black", hex: "#0E0E0E" },
      { label: "Bone", hex: "#F5F1EA" },
      { label: "Volt", hex: "#D9FF00" },
      { label: "Smoke", hex: "#7A7A7A" },
    ],
    positioning:
      "Bold modern, drops energy. Streetwear-luxury crossover. New brand name, fresh start, targets the Gen-Z 'accessible luxury' buyer.",
    noteOnFit:
      "Most likely to look unlike any competitor. Riskiest naming, but biggest scaling ceiling beyond the watch category.",
    wordmarkFont: "syne",
  },
];

export const metadata = {
  title: "TCT — Brand Directions",
  description: "Four design directions for the Texas Custom Timepiece site + customer portal proposal.",
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <main
      className={`${fraunces.variable} ${inter.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${syne.variable} w-full`}
      style={{ background: "#0e0e0e", color: "#f5f1ea", minHeight: "100vh" }}
    >
      {/* HEADER */}
      <header className="px-5 pt-8 pb-6 sm:px-10 sm:pt-14 sm:pb-10 max-w-6xl mx-auto">
        <div
          className="flex items-center justify-between text-[11px] uppercase"
          style={{
            letterSpacing: "0.22em",
            color: "#6e685c",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <span>TCT · Design Review · By Zapp Studios</span>
          <span className="hidden sm:inline">May 2026 · v0.1</span>
        </div>
      </header>

      {/* TITLE */}
      <section className="px-5 sm:px-10 max-w-6xl mx-auto pb-12 sm:pb-20">
        <h1
          className="font-medium tracking-tight"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: "clamp(34px, 5.6vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 360,
            color: "#f5f1ea",
            fontVariationSettings: "'opsz' 144, 'SOFT' 0",
          }}
        >
          Four brand directions for Texas Custom Timepiece.
        </h1>

        <div
          className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2 sm:gap-12 max-w-4xl"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#b8b1a4" }}>
            We&apos;ve been thinking about how the new TCT site should look,
            sound, and feel — informed by 25,000+ words of research into your
            customers, your competitors, and the patterns proven in adjacent
            custom-goods categories (custom suits, sneakers, jewelry, knives).
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#b8b1a4" }}>
            Each direction below shows the <em>same</em> proposal — fully custom
            Next.js + Stripe site, real customer dashboard, 3-step configurator,
            3-tier pricing — rendered in four distinct visual identities and
            brand-naming approaches. Open each. Tell us which one feels closest
            to the brand you&apos;d be proud to build.
          </p>
        </div>
      </section>

      {/* BRAND CARDS */}
      <section
        aria-label="Brand directions"
        className="px-5 sm:px-10 max-w-6xl mx-auto pb-20 sm:pb-28"
      >
        <div
          className="mb-6 flex items-center gap-3 text-[11px] uppercase"
          style={{
            letterSpacing: "0.22em",
            color: "#6e685c",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <span className="h-px flex-1" style={{ background: "#2a2724" }} />
          <span>Four directions</span>
          <span className="h-px flex-1" style={{ background: "#2a2724" }} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          {BRANDS.map((brand, idx) => (
            <BrandCard key={brand.slug} brand={brand} index={idx + 1} />
          ))}
        </div>
      </section>

      {/* SCOPE LINK */}
      <section className="px-5 sm:px-10 max-w-6xl mx-auto pb-12 sm:pb-16">
        <Link
          href="/rev-eng/owen/design/scope.html"
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          className="group block rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-1"
          style={{
            border: "1px solid #2a2724",
            background: "linear-gradient(135deg, #161616 0%, #1c1815 100%)",
          }}
        >
          <div className="px-6 py-8 sm:px-12 sm:py-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
            <div className="flex-1">
              <div
                className="text-[11px] uppercase mb-3"
                style={{
                  letterSpacing: "0.22em",
                  color: "#B8732A",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                Implementation document
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "clamp(22px, 3vw, 34px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontWeight: 380,
                  fontVariationSettings: "'opsz' 144, 'SOFT' 0",
                  color: "#f5f1ea",
                  marginBottom: 8,
                }}
              >
                Read the full scope of work →
              </h3>
              <p
                className="text-[15px] max-w-[60ch]"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  color: "#b8b1a4",
                  lineHeight: 1.55,
                }}
              >
                Phase-by-phase build plan, complete feature list (including the
                in-portal chat with customers), monthly cost breakdown, 10-week
                timeline, and success metrics.
              </p>
            </div>
            <div
              className="flex items-center gap-3 text-[12px] uppercase whitespace-nowrap"
              style={{
                color: "#D9954A",
                letterSpacing: "0.18em",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
              }}
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                Open
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M6 3h7v7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* DECISION */}
      <section className="px-5 sm:px-10 max-w-6xl mx-auto pb-24 sm:pb-32">
        <div
          className="rounded-2xl px-6 py-10 sm:px-12 sm:py-16 text-center"
          style={{
            border: "1px solid #2a2724",
            background: "#161616",
          }}
        >
          <div
            className="text-[11px] uppercase mb-6"
            style={{
              letterSpacing: "0.22em",
              color: "#6e685c",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            Your turn
          </div>
          <h2
            className="font-medium tracking-tight max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontSize: "clamp(24px, 3.6vw, 40px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              fontWeight: 380,
              fontVariationSettings: "'opsz' 144, 'SOFT' 0",
              color: "#f5f1ea",
            }}
          >
            Which one feels closest to the watch business you&apos;d be proud to
            put on your business card?
          </h2>
          <p
            className="mt-6 text-[16px] max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              color: "#b8b1a4",
              lineHeight: 1.65,
            }}
          >
            Reply with your pick — a sentence on why is plenty. We&apos;ll then
            build the full clickable Next.js prototype on the chosen direction,
            line up a photo refresh, and kick off Phase 1.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 sm:px-10 max-w-6xl mx-auto pb-12">
        <div
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t pt-8 text-[12px] uppercase"
          style={{
            borderColor: "#2a2724",
            letterSpacing: "0.14em",
            color: "#6e685c",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <span>Zapp Studios · MMXXVI</span>
          <span>For Owen Yohman · Texas Custom Timepiece</span>
        </div>
      </footer>
    </main>
  );
}

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  return (
    <Link
      href={`/rev-eng/owen/design/${brand.slug}.html`}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      className="group relative block rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-1 focus-visible:-translate-y-1"
      style={{
        background: brand.palette.bg,
        color: brand.palette.ink,
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.04), 0 14px 40px -16px rgba(0,0,0,0.7)",
      }}
      aria-label={`Open full ${brand.name} brand preview`}
    >
      <div className="flex flex-col min-h-[460px] sm:min-h-[520px] p-7 sm:p-8">
        {/* Top row — number + shelf */}
        <div
          className="flex items-start justify-between text-[11px] uppercase"
          style={{
            color: brand.palette.quiet,
            letterSpacing: "0.22em",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <span>{String(index).padStart(2, "0")} / 04</span>
          <span style={{ opacity: 0.7 }}>{brand.shortName}</span>
        </div>

        {/* Wordmark */}
        <div className="mt-12 sm:mt-14">
          <BrandWordmark brand={brand} />
        </div>

        {/* Tagline */}
        <p
          className="mt-5 text-[18px] sm:text-[20px] leading-snug max-w-[26ch]"
          style={{
            color: brand.palette.ink,
            fontFamily: taglineFontFamily(brand.wordmarkFont),
            fontStyle:
              brand.wordmarkFont === "instrument" ? "italic" : "normal",
            letterSpacing: "-0.005em",
          }}
        >
          {brand.tagline}
        </p>

        {/* Shelf positioning tag */}
        <div
          className="mt-4 text-[11px] uppercase"
          style={{
            color: brand.palette.quiet,
            opacity: 0.78,
            letterSpacing: "0.18em",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          {brand.shelf}
        </div>

        <div className="flex-1" />

        {/* Positioning summary */}
        <p
          className="mt-8 text-[14px] leading-[1.55] opacity-90 max-w-[42ch]"
          style={{
            color: brand.palette.ink,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          {brand.positioning}
        </p>

        {/* Fit note */}
        <p
          className="mt-3 text-[13px] italic leading-[1.5] max-w-[42ch]"
          style={{
            color: brand.palette.quiet,
            opacity: 0.85,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          {brand.noteOnFit}
        </p>

        {/* Palette swatches */}
        <div className="mt-5 flex items-center gap-2">
          {brand.swatches.map((s) => (
            <span
              key={s.label}
              title={`${s.label} · ${s.hex}`}
              className="h-5 w-5 rounded-full border"
              style={{
                background: s.hex,
                borderColor: "rgba(0,0,0,0.12)",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-6 pt-5 flex items-center justify-between border-t"
          style={{ borderColor: "rgba(0,0,0,0.16)" }}
        >
          <span
            className="text-[12px] uppercase"
            style={{
              color: brand.palette.quiet,
              letterSpacing: "0.18em",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            Full proposal
          </span>
          <span
            className="flex items-center gap-2 text-[13px] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
            style={{
              color: brand.palette.accent,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            Open new tab
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3h7v7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function BrandWordmark({ brand }: { brand: Brand }) {
  const ink = brand.palette.ink;
  if (brand.wordmarkFont === "fraunces") {
    return (
      <div
        style={{
          fontFamily: "var(--font-fraunces), serif",
          fontSize: "clamp(36px, 6.5vw, 56px)",
          fontWeight: 380,
          letterSpacing: "-0.025em",
          fontVariationSettings: "'opsz' 144, 'SOFT' 0",
          color: ink,
          lineHeight: 1.0,
        }}
      >
        Texas Custom <em style={{ fontStyle: "italic", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>Timepiece</em>
      </div>
    );
  }
  if (brand.wordmarkFont === "inter-clean") {
    return (
      <div
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "clamp(40px, 7vw, 60px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: ink,
          lineHeight: 1.0,
        }}
      >
        Modded<span style={{ color: brand.palette.accent }}>Seiko</span>
      </div>
    );
  }
  if (brand.wordmarkFont === "instrument") {
    return (
      <div
        style={{
          fontFamily: "var(--font-instrument), serif",
          fontSize: "clamp(44px, 8vw, 68px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: ink,
          lineHeight: 0.95,
          fontStyle: "italic",
        }}
      >
        Yohman
        <span
          style={{
            fontStyle: "normal",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "clamp(11px, 1.4vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: brand.palette.quiet,
            display: "block",
            marginTop: 8,
          }}
        >
          Watch Co.
        </span>
      </div>
    );
  }
  if (brand.wordmarkFont === "syne") {
    return (
      <div
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "clamp(50px, 9vw, 78px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: ink,
          lineHeight: 0.92,
          textTransform: "lowercase",
        }}
      >
        bench
        <span style={{ color: brand.palette.accent }}>/</span>22
      </div>
    );
  }
  return null;
}

function taglineFontFamily(font: Brand["wordmarkFont"]): string {
  switch (font) {
    case "fraunces":
      return "var(--font-fraunces), serif";
    case "inter-clean":
      return "var(--font-inter), system-ui, sans-serif";
    case "instrument":
      return "var(--font-instrument), serif";
    case "syne":
      return "var(--font-space), sans-serif";
    case "space":
      return "var(--font-space), sans-serif";
    default:
      return "var(--font-inter), sans-serif";
  }
}
