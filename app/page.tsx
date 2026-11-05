'use client';

import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1.0;
    video.play().catch(() => {});
    setNeedsInteraction(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force volume to 100% and unmuted
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playing with audio successfully
          setNeedsInteraction(false);
        })
        .catch(() => {
          // Browser autoplay policy blocked unmuted audio until user interaction
          setNeedsInteraction(true);

          // Play muted first so video still rolls visually
          video.muted = true;
          video.play().catch(() => {});

          // Auto-enable sound on the very first interaction anywhere on screen
          const handleFirstGesture = () => {
            enableSound();
            window.removeEventListener('click', handleFirstGesture);
            window.removeEventListener('touchstart', handleFirstGesture);
            window.removeEventListener('pointerdown', handleFirstGesture);
            window.removeEventListener('keydown', handleFirstGesture);
          };

          window.addEventListener('click', handleFirstGesture);
          window.addEventListener('touchstart', handleFirstGesture);
          window.addEventListener('pointerdown', handleFirstGesture);
          window.addEventListener('keydown', handleFirstGesture);
        });
    }
  }, []);

  return (
    <main className="container">
      <h1>Happy Diwali</h1>

      {needsInteraction && (
        <button type="button" onClick={enableSound} className="sound-btn">
          🔊 Click here to Turn On Sound
        </button>
      )}

      <video
        ref={videoRef}
        src="/diwali.mp4"
        controls
        autoPlay
        loop
        playsInline
      />

      <p>Wishing you and your family a very Happy Diwali!</p>
    </main>
  );
}
