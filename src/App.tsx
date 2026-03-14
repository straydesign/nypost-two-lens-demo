import { useState } from "react";
import { NYPostHeader } from "./components/NYPostHeader";
import { ArticleInput } from "./components/ArticleInput";
import { ArticleView } from "./components/ArticleView";
import { TwoLensPanel } from "./components/TwoLensPanel";
import { Loader2, Sparkles, Eye, ArrowDown, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const SUPABASE_PROJECT_ID = "xafqozjhlajmlatijwdf";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZnFvempobGFqbWxhdGlqd2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTIxMjgsImV4cCI6MjA3NjQ2ODEyOH0._aMylYS_TDEKhKHjmnEAq-6Y1LMuH3bsotX5td0oRpM";
const API_BASE = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-22fe3a64`;

interface AnalysisResult {
  article: {
    category: string;
    title: string;
    subtitle: string;
    author: string;
    date: string;
    imageUrl: string;
    imageCaption: string;
    paragraphs: string[];
  };
  twoLens: {
    issueAtHand: string;
    sharedFacts: {
      claim: string;
      source: string;
      timestamp: string;
    }[];
    lensA: {
      name: string;
      summary: string;
      bullets: { text: string; type: "evidence" | "value" }[];
    };
    lensB: {
      name: string;
      summary: string;
      bullets: { text: string; type: "evidence" | "value" }[];
    };
    divergence: string;
    selfAwarenessCue: {
      message: string;
      readingMixPercent: number;
      dominantLens: string;
    };
    shouldShow: boolean;
    notShownReason?: string;
  };
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1764344802672-aa688668ed8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1659995880953-f01cb1b3b6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1766902832506-150926fb73fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
];

const LOADING_STEPS = [
  "Fetching article content...",
  "Sending to Claude AI for analysis...",
  "Identifying the core issue...",
  "Extracting shared facts...",
  "Constructing Lens A perspective...",
  "Constructing Lens B perspective...",
  "Mapping the divergence...",
  "Finalizing Two Lens Panel...",
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [scraped, setScraped] = useState(false);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    let stepIndex = 0;
    setLoadingStep(LOADING_STEPS[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < LOADING_STEPS.length) {
        setLoadingStep(LOADING_STEPS[stepIndex]);
      }
    }, 2500);

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ url }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
          errData.error || `Server returned ${response.status}`
        );
      }

      const json = await response.json();

      if (!json.success || !json.data) {
        throw new Error("Invalid response structure from server");
      }

      setScraped(json.scraped);

      const analysisData = json.data as AnalysisResult;
      if (!analysisData.article.imageUrl) {
        analysisData.article.imageUrl =
          FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
      }

      setResult(analysisData);
      setLoadingStep("");

      setTimeout(() => {
        document
          .getElementById("article-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || "Something went wrong. Please try again.");
      setLoadingStep("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NYPostHeader />
      <ArticleInput onSubmit={handleSubmit} isLoading={isLoading} />

      {/* Error State */}
      {error && (
        <div className="max-w-[800px] mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p
                className="text-red-800"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                Analysis Failed
              </p>
              <p
                className="text-red-600 mt-1"
                style={{ fontSize: "13px", lineHeight: 1.6 }}
              >
                {error}
              </p>
              <button
                onClick={() => setError(null)}
                className="mt-3 px-4 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                style={{ fontSize: "12px", fontWeight: 600 }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-[800px] mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <Loader2 className="w-10 h-10 text-[#cf0000] animate-spin" />
              <Sparkles className="w-4 h-4 text-[#cf0000] absolute -top-1 -right-1" />
            </div>
            <motion.p
              key={loadingStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-600"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              {loadingStep}
            </motion.p>
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#cf0000]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <p className="text-gray-400 mt-4" style={{ fontSize: "12px" }}>
              Claude is analyzing the article — this typically takes 15-30
              seconds
            </p>
          </motion.div>
        </div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          id="article-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Scraping badge */}
          <div className="max-w-[800px] mx-auto px-4 pt-4">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                scraped
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
              style={{ fontSize: "11px", fontWeight: 600 }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  scraped ? "bg-green-500" : "bg-amber-500"
                }`}
              />
              {scraped
                ? "Article scraped successfully — analysis based on actual content"
                : "Could not scrape article — analysis inferred from URL"}
            </div>
          </div>

          <ArticleView article={result.article} />

          {/* Scroll prompt */}
          <div className="max-w-[800px] mx-auto px-4">
            <div className="flex items-center justify-center gap-2 py-4 text-gray-400">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontWeight: 600,
                }}
              >
                Two Lens Panel Below
              </span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>

          <div className="bg-[#fafaf8]">
            <TwoLensPanel data={result.twoLens} />
          </div>

          {/* Footer */}
          <footer className="bg-[#1a1a1a] text-gray-400 py-8 mt-8">
            <div className="max-w-[800px] mx-auto px-4 text-center">
              <p
                className="text-amber-400/90 mb-3"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Externship Case Study Demo
              </p>
              <p style={{ fontSize: "11px", lineHeight: 1.6 }}>
                This is a concept demo of the Two Lens Panel feature, created as
                part of an externship case study. It is not affiliated with,
                endorsed by, or representative of the New York Post or its
                editorial positions. Article content and analysis are generated
                by Claude AI for demonstration purposes only.
              </p>
              <p
                className="mt-3 text-gray-500"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                Powered by Claude AI (Anthropic) &middot; Concept by{" "}
                <a
                  href="https://straydesign.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors underline"
                >
                  Thomas Sesler
                </a>
              </p>
              <p
                className="mt-2 text-gray-600"
                style={{ fontSize: "10px", fontWeight: 500 }}
              >
                Built by{" "}
                <a
                  href="https://straywebdesign.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors underline"
                >
                  Stray Web Design
                </a>
              </p>
            </div>
          </footer>
        </motion.div>
      )}

      {/* Empty state */}
      {!isLoading && !result && !error && (
        <div className="max-w-[800px] mx-auto px-4 py-20 text-center">
          <Eye className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h2
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "22px",
              fontWeight: 600,
              color: "#999",
              lineHeight: 1.4,
            }}
          >
            Paste a news article link above to see the
            <br />
            Two Lens Panel in action
          </h2>
          <p
            className="mt-3 text-gray-400"
            style={{ fontSize: "13px", lineHeight: 1.6 }}
          >
            Try any news URL — Claude AI will analyze the story, generate an
            article view,
            <br className="hidden sm:inline" />
            and build a dual-perspective panel showing how different camps
            interpret the same facts.
          </p>
          <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg inline-block">
            <p
              className="text-gray-500"
              style={{ fontSize: "12px", lineHeight: 1.6 }}
            >
              <strong>Tip:</strong> Paste any URL from NYPost, CNN, BBC,
              Reuters, AP News, or any news site.
              <br />
              If the article can't be scraped, Claude will infer from the URL
              and title.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
