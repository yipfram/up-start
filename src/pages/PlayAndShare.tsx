import { ChangeEvent, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import HotspotMap from "../components/HotspotMap";
import { hotspots } from "../data/hotspots";

const experienceSteps = [
  {
    id: 0,
    title: "Scout & Pin",
    description: "Pick the hotspot that feels right for tonight’s mission."
  },
  {
    id: 1,
    title: "Taste & Rate",
    description: "Drop your score, add mood notes, and unlock XP."
  },
  {
    id: 2,
    title: "Story Drop",
    description: "Transform the night into an animated, shareable story."
  }
];

const gradientThemes = [
  {
    id: "pulse",
    name: "Pulse Wave",
    className: "from-brand-primary via-[#f97316] to-[#1d4ed8]",
    badge: "Boosted +35 XP"
  },
  {
    id: "oasis",
    name: "Neon Oasis",
    className: "from-[#f87171] via-[#8b5cf6] to-[#0ea5e9]",
    badge: "Night Owl Bonus"
  },
  {
    id: "garden",
    name: "Garden Party",
    className: "from-[#22c55e] via-[#14b8a6] to-[#facc15]",
    badge: "Fresh Drop"
  }
];

const levelLabels = ["Explorer", "Taste Maker", "Night Icon", "Legend"];

function PlayAndShare() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedHotspotId, setSelectedHotspotId] = useState(hotspots[0]?.id);
  const [rating, setRating] = useState(4);
  const [moodTag, setMoodTag] = useState("Vibe Check: Euphoric");
  const [storyCaption, setStoryCaption] = useState("Skyline Sushi came through with the skyline glow.");
  const [gradientId, setGradientId] = useState(gradientThemes[0].id);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedHotspot = useMemo(
    () => hotspots.find((item) => item.id === selectedHotspotId) ?? hotspots[0],
    [selectedHotspotId]
  );

  const stageScore = rating * 120 + (moodTag.length % 30) * 3;
  const levelIndex = Math.min(levelLabels.length - 1, Math.floor(stageScore / 320));
  const progressPercentage = ((activeStep + 1) / experienceSteps.length) * 100;

  const activeGradient = useMemo(
    () => gradientThemes.find((option) => option.id === gradientId) ?? gradientThemes[0],
    [gradientId]
  );

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      window.alert("Try an image smaller than 4MB for quicker exports.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      setIsExporting(true);
      const file = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3
      });
      const anchor = document.createElement("a");
      anchor.href = file;
      anchor.download = `${selectedHotspot?.id ?? "food-quest"}-story.png`;
      anchor.click();
    } catch (error) {
      console.error("Failed to export quest story", error);
      window.alert("We couldn’t export this story. Refresh and try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 lg:px-8">
      <header className="rounded-3xl bg-surface-primary p-8 shadow-hero md:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-text-primary md:text-4xl lg:text-5xl">
              Quest Mode: Scout · Score · Story
            </h1>
            <p className="mt-3 max-w-2xl text-base text-text-secondary md:text-lg">
              Rally your crew, pin a hotspot, rate the experience, and drop a wrapped-style story to
              flex the night's flavor arc.
            </p>
          </div>
          <div className="rounded-2xl bg-brand-primary/10 px-4 py-3 text-center text-xs uppercase tracking-[0.35em] text-text-secondary shadow-inner shadow-black/5 backdrop-blur">
            season xp
            <div className="mt-2 text-2xl font-semibold text-text-primary">{stageScore}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          {experienceSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`flex flex-1 flex-col gap-1 rounded-2xl border-2 px-4 py-3 text-left transition ${
                index === activeStep
                  ? "border-brand-primary bg-brand-primary text-white shadow-lg"
                  : "border-surface-border bg-white hover:border-brand-primary/40 hover:shadow-md"
              }`}
            >
              <span className={`text-xs uppercase tracking-[0.3em] ${
                index === activeStep ? "text-white/80" : "text-text-secondary"
              }`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`text-sm font-semibold ${
                index === activeStep ? "text-white" : "text-text-primary"
              }`}>{step.title}</span>
              <span className={`text-xs ${
                index === activeStep ? "text-white/90" : "text-text-secondary"
              }`}>{step.description}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 h-2 rounded-full bg-surface-border">
          <div
            className="h-full rounded-full bg-brand-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)]">
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
                Step {activeStep + 1}: {experienceSteps[activeStep].title}
              </h2>
              <p className="text-sm text-text-secondary">
                {experienceSteps[activeStep].description}
              </p>
            </div>
            <div className="rounded-full bg-brand-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-primary">
              {levelLabels[levelIndex]}
            </div>
          </div>

          {activeStep === 0 && (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)]">
              <div className="h-[420px] overflow-hidden rounded-3xl">
                <HotspotMap
                  className="h-full w-full"
                  selectedHotspotId={selectedHotspotId}
                  onSelectHotspot={(id) => {
                    setSelectedHotspotId(id);
                    setActiveStep(1);
                  }}
                  scrollWheelZoom
                />
              </div>
              <div className="flex flex-col gap-4 rounded-3xl bg-surface-primary px-5 py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">
                  quest picks
                </span>
                <ul className="flex flex-col gap-3">
                  {hotspots.map((place) => {
                    const isSelected = place.id === selectedHotspotId;
                    return (
                      <li key={place.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedHotspotId(place.id)}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                            isSelected
                              ? "border-brand-primary bg-white shadow-card"
                              : "border-transparent bg-white/50 hover:border-brand-primary/40"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-text-primary">{place.name}</span>
                            <span className="text-xs uppercase tracking-wide text-brand-primary">
                              {isSelected ? "locked in" : "pin"}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-text-secondary">{place.description}</p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-surface-border bg-surface-primary px-6 py-8 shadow-inner">
                <span className="text-xs uppercase tracking-[0.3em] text-text-secondary">your rate</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.5}
                    value={rating}
                    onChange={(event) => setRating(Number(event.target.value))}
                    className="flex-1 accent-brand-primary"
                  />
                  <span className="text-3xl font-semibold text-text-primary">{rating.toFixed(1)}</span>
                  <span className="text-sm text-text-secondary">/5</span>
                </div>
                <p className="mt-4 text-sm text-text-secondary">
                  {selectedHotspot?.name} gets bonus XP when rated above 4.5.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2 text-sm font-semibold text-text-primary">
                  Mood Tag
                  <input
                    value={moodTag}
                    onChange={(event) => setMoodTag(event.target.value)}
                    className="rounded-2xl border border-surface-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
                    placeholder="Vibe Check: Euphoric"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-text-primary">
                  Story Caption
                  <textarea
                    rows={3}
                    value={storyCaption}
                    onChange={(event) => setStoryCaption(event.target.value)}
                    className="resize-none rounded-2xl border border-surface-border bg-white px-4 py-3 text-sm text-text-primary outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/30"
                    placeholder="Drop the hook for your story..."
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-text-primary">
                  Upload Proof Shot
                  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-brand-primary/40 bg-brand-primary/5 px-4 py-8 text-center text-sm text-text-secondary transition hover:border-brand-primary/80 hover:bg-brand-primary/10">
                    <input type="file" accept="image/*" onChange={handleFileInput} className="sr-only" />
                    <span className="pointer-events-none select-none">
                      Drag &amp; drop or <span className="font-semibold text-brand-primary">browse</span>
                    </span>
                    {previewImage && (
                      <span className="text-xs text-text-secondary">Image locked. Ready for the story.</span>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr),minmax(0,1fr)]">
              <div className="flex flex-col items-center gap-4">
                <div
                  ref={cardRef}
                  className={`relative flex aspect-[9/16] w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-gradient-to-br ${activeGradient.className} p-6 text-white shadow-hero`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.18),transparent_60%)]" />

                  {previewImage ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Quest highlight"
                        className="h-full w-full object-cover opacity-65 mix-blend-screen"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
                    </div>
                  ) : (
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.25),transparent_70%)]" />
                  )}

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/80">
                      <span>{selectedHotspot?.name ?? "Exploration"}</span>
                      <span>{levelLabels[levelIndex]}</span>
                    </header>

                    <div className="space-y-4">
                      <div className="text-sm uppercase tracking-[0.35em] text-white/70">quest wrap</div>
                      <h2 className="text-3xl font-semibold leading-tight drop-shadow-md md:text-[2.2rem]">
                        {moodTag}
                      </h2>
                      <p className="rounded-3xl bg-white/15 px-4 py-3 text-sm font-medium text-white/90 shadow-sm shadow-black/20 backdrop-blur">
                        {storyCaption}
                      </p>
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
                        <span className="flex items-center gap-2">
                          <span className="inline-flex h-2 w-2 rounded-full bg-white" />
                          {rating.toFixed(1)}/5
                        </span>
                        <span>{stageScore} xp</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:cursor-wait disabled:opacity-60"
                >
                  {isExporting ? "Rendering..." : "Export Story PNG"}
                </button>
              </div>

              <div className="flex flex-col gap-5 rounded-3xl bg-surface-primary px-5 py-6">
                <span className="text-xs uppercase tracking-[0.3em] text-text-secondary">styling boosts</span>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-2">
                  {gradientThemes.map((option) => {
                    const isActive = option.id === gradientId;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setGradientId(option.id)}
                        className={`relative flex h-28 flex-col justify-end rounded-3xl p-4 text-left text-white transition ${
                          isActive ? "ring-2 ring-white ring-offset-2 ring-offset-brand-primary" : ""
                        } bg-gradient-to-br ${option.className}`}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide">{option.name}</span>
                        <span className="text-[0.7rem] leading-tight text-white/90">{option.badge}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-surface-border bg-white px-4 py-3 text-sm text-text-secondary shadow-inner">
                  Complete the drop to push your crew up the nightly leaderboard. Mondays reset at 5pm.
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-primary px-4 py-3 text-sm text-text-secondary">
            <span>
              Mission log · {selectedHotspot?.name ?? "Choose a spot"} ·{" "}
              {new Date().toLocaleDateString(undefined, {
                month: "short",
                day: "numeric"
              })}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
                className="rounded-full border border-surface-border px-4 py-1.5 transition hover:border-brand-primary hover:text-brand-primary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(Math.min(activeStep + 1, experienceSteps.length - 1))}
                className="rounded-full bg-brand-primary px-4 py-1.5 font-semibold text-white transition hover:bg-brand-primary/90"
              >
                {activeStep === experienceSteps.length - 1 ? "Replay Quest" : "Continue"}
              </button>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-text-primary">Quest Feed</h3>
            <p className="text-sm text-text-secondary">
              Gamified timeline that logs your squad's flavor adventures.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-surface-border bg-surface-primary px-5 py-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-text-secondary">
              <span>crew heat</span>
              <span>{stageScore + 240} total xp</span>
            </div>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="rounded-2xl bg-white px-4 py-3 shadow-card">
                <strong className="text-text-primary">Nova</strong> locked{" "}
                <span className="text-brand-primary">{selectedHotspot?.name ?? "?"}</span> · rated{" "}
                <strong>{rating.toFixed(1)}</strong> · unlocked <strong>{stageScore} XP</strong>.
              </li>
              <li className="rounded-2xl bg-white px-4 py-3 shadow-card">
                <strong className="text-text-primary">Atlas</strong> boosted story optics with <em>{moodTag}</em>.
              </li>
              <li className="rounded-2xl bg-white px-4 py-3 shadow-card">
                <strong className="text-text-primary">You</strong> dropped{" "}
                <span className="text-brand-primary">{activeGradient.name}</span> theme.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-surface-border bg-surface-primary px-4 py-5 text-sm text-text-primary">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Daily Combo Bonus</span>
              <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                +15%
              </span>
            </div>
            <p className="mt-2 text-text-secondary">
              Hit a new hotspot, rate above 4, and publish a story to multiply XP. Bonus refreshes nightly.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default PlayAndShare;
