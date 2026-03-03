import { Search, Menu, User } from "lucide-react";

const NAV_ITEMS = [
  "News",
  "Metro",
  "Sports",
  "Page Six",
  "Opinion",
  "Business",
  "Entertainment",
  "Shopping",
  "Real Estate",
];

const MOBILE_NAV_ITEMS = ["NEWS", "METRO", "SPORTS", "PAGE SIX", "OPINION"];

export function NYPostHeader() {
  return (
    <header className="w-full select-none">
      {/* Demo disclaimer banner */}
      <div
        className="bg-[#1a1a1a] text-center py-1.5 px-4"
        style={{ borderBottom: "1px solid #333" }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#fbbf24",
            letterSpacing: "0.5px",
          }}
        >
          EXTERNSHIP CASE STUDY DEMO — Not affiliated with the New York Post
        </p>
      </div>

      {/* Main red header bar */}
      <div className="bg-[#cf0000]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 h-[56px] md:h-[52px]">
          {/* Left: Menu + Search */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5" aria-label="Sections">
              <Menu className="w-5 h-5 text-white" strokeWidth={2.5} />
              <span
                className="hidden md:inline text-white"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Sections
              </span>
            </button>
            <button aria-label="Search">
              <Search className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span
              className="text-white whitespace-nowrap"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontStyle: "italic",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              NEW YORK POST
            </span>
          </div>

          {/* Right: Account */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-1.5 border border-white/40 rounded px-3 py-1 hover:bg-white/10 transition-colors"
              aria-label="Account"
            >
              <User className="w-4 h-4 text-white" strokeWidth={2} />
              <span
                className="text-white"
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Account
              </span>
            </button>
            <div className="md:hidden w-7 h-7 rounded-full bg-black/25 flex items-center justify-center">
              <User className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop nav bar */}
      <nav className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto flex items-center px-4 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <span
              key={item}
              className="py-2.5 mr-5 text-[#111] hover:text-[#cf0000] transition-colors cursor-default whitespace-nowrap"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Mobile nav bar */}
      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="flex items-center justify-center px-2 py-2.5 gap-0 overflow-x-auto">
          {MOBILE_NAV_ITEMS.map((item, index) => (
            <div key={item} className="flex items-center">
              {index > 0 && (
                <span
                  className="text-gray-300 mx-1.5"
                  style={{ fontSize: "12px" }}
                >
                  |
                </span>
              )}
              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#111",
                  letterSpacing: "0.3px",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
