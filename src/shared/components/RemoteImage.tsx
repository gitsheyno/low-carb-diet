import { Utensils } from "lucide-react";
import { useEffect, useState } from "react";

const API_ORIGIN = "https://low-carb-server.onrender.com";
const IMAGE_KEYS = ["url", "src", "href", "uri", "regular", "original"];

function readImageSource(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    for (const candidate of value) {
      const source = readImageSource(candidate);
      if (source) return source;
    }
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of IMAGE_KEYS) {
      const source = readImageSource(record[key]);
      if (source) return source;
    }
  }
  return null;
}

function normalizeImageUrl(value: unknown) {
  const source = readImageSource(value)?.trim();
  if (!source) return null;
  if (source.startsWith("//")) return `https:${source}`;
  if (source.startsWith("http://"))
    return source.replace("http://", "https://");
  if (/^https?:\/\//i.test(source) || source.startsWith("data:")) return source;
  return encodeURI(`${API_ORIGIN}/${source.replace(/^\/+/, "")}`);
}

export default function RemoteImage({
  alt,
  className,
  loading = "lazy",
  src,
}: {
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  src?: unknown;
}) {
  const normalizedSrc = normalizeImageUrl(src);
  const [failed, setFailed] = useState(!normalizedSrc);

  useEffect(() => setFailed(!normalizedSrc), [normalizedSrc]);

  if (failed || !normalizedSrc) {
    return (
      <span
        aria-label={`${alt} image unavailable`}
        className={`${className ?? ""} image-fallback`}
        role="img"
      >
        <Utensils aria-hidden="true" size={20} />
      </span>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
      src={normalizedSrc}
    />
  );
}
