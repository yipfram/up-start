import { ChangeEvent, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";

type GradientOption = {
  id: string;
  name: string;
  description: string;
  className: string;
  sample: string;
};

const gradients: GradientOption[] = [
  {
    id: "orange-sunset",
    name: "Orange Sunset",
    description: "Bold orange fade with golden glow",
    className: "from-[#F25C3D] to-[#FFC947]",
    sample: "bg-gradient-to-br from-[#F25C3D] to-[#FFC947]"
  },
  {
    id: "neon-city",
    name: "Neon City",
    description: "Purple twilight meets pink energy",
    className: "from-[#372772] to-[#E03FAC]",
    sample: "bg-gradient-to-br from-[#372772] to-[#E03FAC]"
  },
  {
    id: "matcha-vibe",
    name: "Matcha Vibe",
    description: "Fresh greens with mint highlight",
    className: "from-[#2A8C4A] to-[#88F1B6]",
    sample: "bg-gradient-to-br from-[#2A8C4A] to-[#88F1B6]"
  }
];

const defaultData = {
  handle: "@foodielens",
  headline: "Your Flavor Story",
  highlight: "Top Bite: Skyline Sushi",
  secondary: "Hidden Gem: Coffee Lab",
  footer: "Share your wrapped night 🔥"
};

function InstaMVP() {
  const [handle, setHandle] = useState(defaultData.handle);
  const [headline, setHeadline] = useState(defaultData.headline);
  const [highlight, setHighlight] = useState(defaultData.highlight);
  const [secondary, setSecondary] = useState(defaultData.secondary);
  const [footer, setFooter] = useState(defaultData.footer);
  const [gradientId, setGradientId] = useState<GradientOption["id"]>("orange-sunset");
  const [photo, setPhoto] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeGradient = useMemo(
    () => gradients.find((option) => option.id === gradientId) ?? gradients[0],
    [gradientId]
  );

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3
      });
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `${handle.replace(/[^a-z0-9]/gi, "").toLowerCase() || "insta-mvp"}-story.png`;
      anchor.click();
    } catch (error) {
      console.error("Failed to export image", error);
      window.alert("We could not export the story. Try again after reloading the page.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 lg:px-8">
      <header className="rounded-3xl bg-surface-primary p-8 shadow-hero md:p-12">
        <h1 className="text-3xl font-semibold leading-tight text-text-primary md:text-4xl lg:text-5xl">
          Your Story. Wrapped.
        </h1>
        <p className="mt-3 max-w-2xl text-base text-text-secondary md:text-lg">
          Upload a snapshot, tailor the captions, and export an Instagram-ready story that captures
          tonight&apos;s foodie vibe.
        </p>
      </header>

      <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">Story Preview</h2>
              <p className="text-sm text-text-secondary">
                9:16 format, perfect for Instagram Stories and Reels covers.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExporting ? "Rendering..." : "Download PNG"}
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <div
              ref={cardRef}
              className={`relative isolate flex aspect-[9/16] w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-gradient-to-br ${activeGradient.className} p-6 text-white shadow-hero`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="pointer-events-none absolute -right-20 top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 bottom-12 h-40 w-40 rounded-full bg-black/15 blur-3xl mix-blend-soft-light" />

              {photo ? (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={photo}
                    alt="Uploaded background"
                    className="h-full w-full object-cover opacity-60 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
                </div>
              ) : (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.25),transparent_70%)]" />
              )}

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/80">
                  <span>{handle || defaultData.handle}</span>
                  <span>{new Date().getFullYear()}</span>
                </div>

                <div className="mt-auto space-y-5">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/70">tonight</p>
                    <h2 className="text-3xl font-semibold leading-tight drop-shadow-md md:text-[2.2rem]">
                      {headline || defaultData.headline}
                    </h2>
                  </div>

                  <div className="space-y-2 text-sm font-medium text-white/85">
                    <div className="rounded-2xl bg-white/15 px-4 py-3 shadow-sm shadow-black/20 backdrop-blur">
                      <p>{highlight || defaultData.highlight}</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-3 shadow-sm shadow-black/10 backdrop-blur">
                      <p>{secondary || defaultData.secondary}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-white" />
                      stay tuned
                    </span>
                    <span>food explorer</span>
                  </div>

                  <p className="text-sm text-white/90">{footer || defaultData.footer}</p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-text-secondary">
              Tip: Long-press or use the download button to share your story on Instagram.
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-text-primary">Customize the vibe</h3>
            <p className="text-sm text-text-secondary">
              Swap gradients, rewrite captions, and drop in a photo to make it yours.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-text-primary">
              Upload spotlight photo
              <span className="mt-2 flex items-center justify-center rounded-2xl border border-dashed border-brand-primary/40 bg-brand-primary/5 px-4 py-6 text-center text-sm text-text-secondary transition hover:border-brand-primary/80 hover:bg-brand-primary/10">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
                <span className="pointer-events-none select-none">
                  Drag & drop, or <span className="font-semibold text-brand-primary">choose file</span>
                </span>
              </span>
              <span className="mt-1 block text-xs text-text-secondary">
                High-resolution vertical shots look best.
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-text-primary">
              Instagram handle
              <input
                value={handle}
                onChange={(event) => setHandle(event.target.value)}
                placeholder="@yourhandle"
                className="mt-2 w-full rounded-2xl border border-surface-border bg-surface-primary px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
              />
            </label>

            <label className="block text-sm font-semibold text-text-primary">
              Headline
              <input
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
                placeholder="Your Flavor Story"
                className="mt-2 w-full rounded-2xl border border-surface-border bg-surface-primary px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
              />
            </label>

            <label className="block text-sm font-semibold text-text-primary">
              Highlight
              <input
                value={highlight}
                onChange={(event) => setHighlight(event.target.value)}
                placeholder="Top Bite: Skyline Sushi"
                className="mt-2 w-full rounded-2xl border border-surface-border bg-surface-primary px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
              />
            </label>

            <label className="block text-sm font-semibold text-text-primary">
              Secondary shout-out
              <input
                value={secondary}
                onChange={(event) => setSecondary(event.target.value)}
                placeholder="Hidden Gem: Coffee Lab"
                className="mt-2 w-full rounded-2xl border border-surface-border bg-surface-primary px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
              />
            </label>

            <label className="block text-sm font-semibold text-text-primary">
              Footer note
              <input
                value={footer}
                onChange={(event) => setFooter(event.target.value)}
                placeholder="Share your wrapped night 🔥"
                className="mt-2 w-full rounded-2xl border border-surface-border bg-surface-primary px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
              />
            </label>
          </div>

          <div className="space-y-3">
            <span className="block text-sm font-semibold text-text-primary">Color story</span>
            <div className="grid gap-3 sm:grid-cols-3">
              {gradients.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setGradientId(option.id)}
                  className={`relative flex h-28 flex-col justify-end rounded-3xl p-4 text-left text-white transition ${
                    gradientId === option.id
                      ? "ring-4 ring-brand-primary shadow-lg scale-105"
                      : "ring-2 ring-surface-border hover:ring-brand-primary/40 hover:shadow-md"
                  } ${option.sample}`}
                >
                  <span className="relative z-10 text-xs font-semibold uppercase tracking-wide drop-shadow-md">
                    {option.name}
                  </span>
                  <span className="relative z-10 text-[0.7rem] leading-tight text-white/90 drop-shadow">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default InstaMVP;
