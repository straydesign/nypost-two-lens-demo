import { useState } from "react";
import {
  CheckCircle2,
  Eye,
  GitFork,
  Brain,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  BarChart3,
  ArrowRight,
} from "lucide-react";

interface FactItem {
  claim: string;
  source: string;
  timestamp: string;
}

interface LensBullet {
  text: string;
  type: "evidence" | "value";
}

interface LensData {
  name: string;
  summary: string;
  bullets: LensBullet[];
}

interface TwoLensPanelData {
  issueAtHand: string;
  sharedFacts: FactItem[];
  lensA: LensData;
  lensB: LensData;
  divergence: string;
  selfAwarenessCue: {
    message: string;
    readingMixPercent: number;
    dominantLens: string;
  };
  shouldShow: boolean;
  notShownReason?: string;
}

interface TwoLensPanelProps {
  data: TwoLensPanelData;
}

export function TwoLensPanel({ data }: TwoLensPanelProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "facts"
  );
  const [lensAExpanded, setLensAExpanded] = useState(true);
  const [lensBExpanded, setLensBExpanded] = useState(true);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!data.shouldShow) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <div className="border-t-4 border-gray-300 pt-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#333" }}>
                  Context Module
                </h3>
                <p
                  className="mt-2 text-gray-600"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  {data.notShownReason ||
                    "The Two Lens Panel is not available for this article. A two-lens framing would create false balance on this topic."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-8">
      {/* Separator */}
      <div className="border-t-4 border-[#cf0000] pt-6 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Eye className="w-5 h-5 text-[#cf0000]" />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#cf0000",
            }}
          >
            Two Lens Panel
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.3,
          }}
        >
          {data.issueAtHand}
        </h2>
        <p
          className="mt-2 text-gray-500"
          style={{ fontSize: "13px", lineHeight: 1.5 }}
        >
          See how two credible perspectives interpret the same facts differently.
          The goal is understanding, not agreement.
        </p>
      </div>

      {/* Shared Facts */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("facts")}
          className="w-full flex items-center justify-between py-3 px-4 bg-[#f8f4ed] border border-[#e8dfd0] rounded-t-lg hover:bg-[#f2ece1] transition-colors"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#8b7355]" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#5a4a32",
              }}
            >
              Shared Facts
            </span>
            <span
              className="bg-[#e8dfd0] text-[#5a4a32] px-2 py-0.5 rounded-full"
              style={{ fontSize: "11px", fontWeight: 600 }}
            >
              {data.sharedFacts.length}
            </span>
          </div>
          {expandedSection === "facts" ? (
            <ChevronUp className="w-4 h-4 text-[#8b7355]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8b7355]" />
          )}
        </button>
        {expandedSection === "facts" && (
          <div className="border border-t-0 border-[#e8dfd0] rounded-b-lg bg-white p-4 space-y-3">
            {data.sharedFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
              >
                <div
                  className="w-5 h-5 rounded-full bg-[#f0e9dc] flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#8b7355",
                  }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#333" }}>
                    {fact.claim}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400" style={{ fontSize: "11px" }}>
                      {fact.source}
                    </span>
                    <span className="text-gray-300">&#183;</span>
                    <span className="text-gray-400" style={{ fontSize: "11px" }}>
                      {fact.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Lens A */}
        <div className="border border-[#c5d5e8] rounded-lg overflow-hidden">
          <button
            onClick={() => setLensAExpanded(!lensAExpanded)}
            className="w-full flex items-center justify-between py-3 px-4 bg-[#eef3f9] hover:bg-[#e3ecf5] transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded bg-[#3b6fa0] flex items-center justify-center"
                style={{ fontSize: "11px", fontWeight: 700, color: "white" }}
              >
                A
              </div>
              <span
                style={{ fontSize: "13px", fontWeight: 700, color: "#2a4d6e" }}
              >
                {data.lensA.name}
              </span>
            </div>
            {lensAExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#3b6fa0]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#3b6fa0]" />
            )}
          </button>
          {lensAExpanded && (
            <div className="p-4 bg-white">
              <p
                className="mb-3 text-gray-600"
                style={{ fontSize: "13px", lineHeight: 1.6, fontStyle: "italic" }}
              >
                {data.lensA.summary}
              </p>
              <div className="space-y-2.5">
                {data.lensA.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className={`shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-white ${
                        bullet.type === "evidence"
                          ? "bg-[#3b6fa0]"
                          : "bg-[#7b6fa0]"
                      }`}
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {bullet.type === "evidence" ? "EV" : "VA"}
                    </span>
                    <p
                      style={{ fontSize: "13px", lineHeight: 1.6, color: "#444" }}
                    >
                      {bullet.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p
                  className="text-gray-400 flex items-center gap-1"
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#3b6fa0" }}
                  />
                  Evidence based
                  <span className="mx-1">&#183;</span>
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#7b6fa0" }}
                  />
                  Value based
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Lens B */}
        <div className="border border-[#d8c5c5] rounded-lg overflow-hidden">
          <button
            onClick={() => setLensBExpanded(!lensBExpanded)}
            className="w-full flex items-center justify-between py-3 px-4 bg-[#f9eeee] hover:bg-[#f5e3e3] transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded bg-[#a03b3b] flex items-center justify-center"
                style={{ fontSize: "11px", fontWeight: 700, color: "white" }}
              >
                B
              </div>
              <span
                style={{ fontSize: "13px", fontWeight: 700, color: "#6e2a2a" }}
              >
                {data.lensB.name}
              </span>
            </div>
            {lensBExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#a03b3b]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#a03b3b]" />
            )}
          </button>
          {lensBExpanded && (
            <div className="p-4 bg-white">
              <p
                className="mb-3 text-gray-600"
                style={{ fontSize: "13px", lineHeight: 1.6, fontStyle: "italic" }}
              >
                {data.lensB.summary}
              </p>
              <div className="space-y-2.5">
                {data.lensB.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className={`shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-white ${
                        bullet.type === "evidence"
                          ? "bg-[#a03b3b]"
                          : "bg-[#a07b3b]"
                      }`}
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {bullet.type === "evidence" ? "EV" : "VA"}
                    </span>
                    <p
                      style={{ fontSize: "13px", lineHeight: 1.6, color: "#444" }}
                    >
                      {bullet.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100">
                <p
                  className="text-gray-400 flex items-center gap-1"
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#a03b3b" }}
                  />
                  Evidence based
                  <span className="mx-1">&#183;</span>
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#a07b3b" }}
                  />
                  Value based
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* The Divergence */}
      <div className="mb-4">
        <div className="border border-[#e0d6c8] rounded-lg overflow-hidden">
          <div className="py-3 px-4 bg-[#fdf9f3] flex items-center gap-2">
            <GitFork className="w-4 h-4 text-[#8b7355]" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#5a4a32",
              }}
            >
              The Divergence
            </span>
          </div>
          <div className="p-4 bg-white">
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#444" }}>
              {data.divergence}
            </p>
          </div>
        </div>
      </div>

      {/* Self-Awareness Cue */}
      <div className="mb-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="py-3 px-4 bg-gray-50 flex items-center gap-2">
            <Brain className="w-4 h-4 text-gray-500" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#555",
              }}
            >
              Your Reading Mix
            </span>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${data.selfAwarenessCue.readingMixPercent}%`,
                      background:
                        data.selfAwarenessCue.dominantLens === "A"
                          ? "linear-gradient(90deg, #3b6fa0, #5a8fc0)"
                          : "linear-gradient(90deg, #a03b3b, #c05a5a)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#3b6fa0",
                      fontWeight: 600,
                    }}
                  >
                    Lens A
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#a03b3b",
                      fontWeight: 600,
                    }}
                  >
                    Lens B
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <span
                  style={{ fontSize: "12px", fontWeight: 600, color: "#666" }}
                >
                  {data.selfAwarenessCue.readingMixPercent}%{" "}
                  {data.selfAwarenessCue.dominantLens === "A"
                    ? data.lensA.name
                    : data.lensB.name}
                </span>
              </div>
            </div>
            <p
              className="text-gray-600 mb-3"
              style={{ fontSize: "13px", lineHeight: 1.6 }}
            >
              {data.selfAwarenessCue.message}
            </p>
            <button
              className="flex items-center gap-1.5 text-[#cf0000] hover:underline"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              Explore the other lens
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Transparency footer */}
      <div className="text-center py-4 border-t border-gray-200">
        <p className="text-gray-400" style={{ fontSize: "11px", lineHeight: 1.5 }}>
          This panel separates evidence from values and requires traceability for
          all factual claims.
          <br />
          Claims that cannot be grounded in retrievable reporting do not appear.
        </p>
      </div>
    </div>
  );
}
