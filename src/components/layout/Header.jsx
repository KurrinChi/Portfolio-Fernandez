import { useState } from "react";
import { NavLink } from "react-router-dom";
import { siteConfig } from "../../content/siteConfig";

function navClass({ isActive }) {
  const base =
    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200";
  return isActive
    ? `${base} text-cyan-200`
    : `${base} text-zinc-300 hover:text-zinc-50`;
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <NavLink
          to="/"
          className="font-display text-sm uppercase tracking-[0.28em] text-cyan-300"
          onClick={() => setOpen(false)}
        >
          EGF // Portfolio
        </NavLink>

        <button
          type="button"
          className="rounded-md border border-zinc-700 px-3 py-2 text-xs text-zinc-200 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {siteConfig.navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-1 h-[2px] rounded bg-cyan-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-zinc-800 bg-zinc-950/95 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="grid gap-2">
            {siteConfig.navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={navClass}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
