import { lazy, Suspense } from "react";
import { hotspots } from "../data/hotspots";

const HotspotMap = lazy(() => import("../components/HotspotMap"));

function FoodExplorer() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 lg:px-8">
      <header className="rounded-3xl bg-gradient-to-tr from-brand-primary/95 to-brand-secondary/90 p-8 text-white shadow-hero md:p-12">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
          Discover, Taste, Share.
        </h1>
        <p className="mt-3 max-w-2xl text-base text-white/90 md:text-lg">
          Explore trending dishes, trusted reviews, and the delivery spots your friends rave about.
        </p>
      </header>

      <section className="grid flex-1 gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-brand-dark md:text-2xl">Hotspots Near You</h2>
            <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-primary">
              beta
            </span>
          </div>
          <div className="h-[420px] w-full overflow-hidden rounded-2xl bg-brand-surface">
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(-45deg,#f2f4f8,#f2f4f8_12px,#e5ebf4_12px,#e5ebf4_24px)] text-brand-muted animate-shimmer">
                  Loading map...
                </div>
              }
            >
              <HotspotMap />
            </Suspense>
          </div>
        </div>

        <aside className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <div>
            <h3 className="text-lg font-semibold text-brand-dark">Fresh Finds</h3>
            <p className="text-sm text-brand-muted">
              Follow local experts to keep tabs on the next big bite.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {hotspots.map((place) => (
              <li key={`${place.id}-summary`} className="rounded-2xl bg-brand-surface/60 p-4">
                <h4 className="text-base font-semibold text-brand-dark">{place.name}</h4>
                <span className="text-sm text-brand-muted">{place.description}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <footer className="pb-8 text-center text-xs text-brand-muted md:text-sm">
        Built for MVP testing. Install the app to stay in the loop when new hotspots appear.
      </footer>
    </div>
  );
}

export default FoodExplorer;
