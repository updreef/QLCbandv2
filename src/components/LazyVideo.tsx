"use client";

import { useEffect, useRef, VideoHTMLAttributes } from "react";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * Video die pas data ophaalt en afspeelt zodra hij (bijna) in beeld is,
 * en weer pauzeert zodra hij uit beeld scrolt. Scheelt megabytes aan
 * upfront downloads op pagina's met meerdere autoplay-loops.
 *
 * De src wordt pas gezet als de observer 'm activeert, zodat de browser
 * niets prefetcht — ook niet met preload="none" (Chrome haalt bij autoplay
 * anders alsnog de hele file op).
 *
 * `muted` wordt expliciet naar de video-property geschreven: React
 * reflecteert de `muted` *attribute* niet betrouwbaar, waardoor de
 * geluid-toggle (Live Moments) anders niet zou werken.
 */
export default function LazyVideo({ src, muted = true, ...rest }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = src;
              video.load();
            }
            if (!reduce) video.play().catch(() => {});
          } else if (video.src) {
            video.pause();
          }
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={ref} muted={muted} loop playsInline preload="none" {...rest} />;
}
