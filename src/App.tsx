import { Suspense, lazy } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";

const FoodExplorer = lazy(() => import("./pages/FoodExplorer"));
const InstaMVP = lazy(() => import("./pages/InstaMVP"));

const navLinkBase =
  "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

function App() {
  return (
    <div className="min-h-screen bg-brand-surface text-brand-dark">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-6 md:flex-nowrap md:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-semibold text-brand-dark shadow-card backdrop-blur transition hover:bg-white"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-sm text-white shadow-md">
            FE
          </span>
          Food Explorer
        </NavLink>

        <div className="flex items-center gap-2 rounded-full bg-white/80 p-1 shadow-card backdrop-blur">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive ? "bg-brand-primary text-white" : "text-brand-muted hover:bg-brand-surface"
              }`
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/instamvp"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive ? "bg-brand-primary text-white" : "text-brand-muted hover:bg-brand-surface"
              }`
            }
          >
            InstaMVP
          </NavLink>
        </div>
      </nav>

      <main>
        <Suspense
          fallback={
            <div className="mx-auto flex h-[60vh] max-w-6xl items-center justify-center px-4 text-brand-muted md:px-6 lg:px-8">
              Loading experience...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<FoodExplorer />} />
            <Route path="/instamvp" element={<InstaMVP />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
