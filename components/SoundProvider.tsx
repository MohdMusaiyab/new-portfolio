"use client";

import { useEffect, useMemo } from "react";
import useSound from "use-sound";

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [click1] = useSound("/click1.wav", { volume: 0.3 });
  const [click2] = useSound("/click2.wav", { volume: 0.3 });
  const [click3] = useSound("/click3.mp3", { volume: 0.3 });
  const [click4] = useSound("/click4.mp3", { volume: 0.3 });
  const [click5] = useSound("/click5.mp3", { volume: 0.3 });

  const soundPool = useMemo(
    () => [click1, click2, click3, click4, click5],
    [click1, click2, click3, click4, click5],
  );

  useEffect(() => {
    const playSound = (seed: number) => {
      const soundIndex = seed % soundPool.length;
      const playSelectedClick = soundPool[soundIndex];

      playSelectedClick({
        playbackRate: 0.98 + Math.random() * 0.04,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || !e.key) return;
      playSound(e.key.charCodeAt(0));
    };

    const handleMouseDown = (e: MouseEvent) => {
      playSound(e.button + 10);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [soundPool]);

  return <>{children}</>;
}
