import { Clock, Share2, MessageSquare, Bookmark } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface ArticleData {
  category: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  imageUrl: string;
  imageCaption: string;
  paragraphs: string[];
}

interface ArticleViewProps {
  article: ArticleData;
}

export function ArticleView({ article }: ArticleViewProps) {
  return (
    <article className="max-w-[800px] mx-auto px-4 py-6">
      {/* Category tag */}
      <span
        className="inline-block mb-3"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#cf0000",
        }}
      >
        {article.category}
      </span>

      {/* Headline */}
      <h1
        className="mb-3"
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#1a1a1a",
        }}
      >
        {article.title}
      </h1>

      {/* Subtitle */}
      <p
        className="mb-4 text-gray-600"
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "18px",
          lineHeight: 1.5,
        }}
      >
        {article.subtitle}
      </p>

      {/* Byline */}
      <div className="flex items-center justify-between border-t border-b border-gray-200 py-3 mb-5">
        <div>
          <span
            className="text-[#cf0000]"
            style={{ fontSize: "13px", fontWeight: 700 }}
          >
            By {article.author}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-gray-500" style={{ fontSize: "12px" }}>
              {article.date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MessageSquare className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bookmark className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="mb-6">
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto object-cover"
          style={{ maxHeight: "500px" }}
        />
        <p
          className="mt-2 text-gray-500"
          style={{ fontSize: "12px", lineHeight: 1.5 }}
        >
          {article.imageCaption}
        </p>
      </div>

      {/* Article body */}
      <div className="space-y-4">
        {article.paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "17px",
              lineHeight: 1.75,
              color: "#333",
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
