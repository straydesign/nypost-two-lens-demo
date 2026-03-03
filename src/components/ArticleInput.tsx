import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";

interface ArticleInputProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

export function ArticleInput({ onSubmit, isLoading }: ArticleInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="w-full bg-[#fafafa] border-b border-gray-200">
      <div className="max-w-[800px] mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#cf0000]" />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#cf0000",
            }}
          >
            AI Two Lens Demo
          </span>
        </div>
        <p
          className="text-gray-600 mb-4"
          style={{ fontSize: "14px", lineHeight: 1.6 }}
        >
          Paste a news article link or type any topic below. Our AI will analyze
          the story and generate a Two Lens Panel showing how different
          perspectives interpret the same facts.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a URL or type a topic (e.g. 'immigration reform')"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded bg-white focus:outline-none focus:border-[#cf0000] focus:ring-1 focus:ring-[#cf0000] transition-colors"
              style={{ fontSize: "14px" }}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-[#cf0000] text-white rounded hover:bg-[#a80000] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shrink-0"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
