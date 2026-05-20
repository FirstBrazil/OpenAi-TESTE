import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export default function HlsVideo({ src, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return <video ref={ref} {...rest} />;
}
