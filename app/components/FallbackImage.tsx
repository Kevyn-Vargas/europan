'use client';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallback?: string;
}

export default function FallbackImage({
  src,
  alt,
  className,
  style,
  fallback = '🍕',
}: FallbackImageProps) {
  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center text-center text-xs font-semibold"
        style={{
          background: fallback ? 'transparent' : '#ffffff',
          zIndex: -1,
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-muted)',
          padding: '4px',
        }}
      >
        {fallback || alt}
      </div>
    </div>
  );
}
