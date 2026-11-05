'use client';

import { useEffect, useRef } from 'react';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play with sound automatically
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If the browser blocks unmuted autoplay, play muted first
        video.muted = true;
        video.play().catch(() => {});

        // Unmute automatically on the very first user interaction anywhere on the page
        const enableSoundOnInteraction = () => {
          video.muted = false;
          video.play().catch(() => {});
          window.removeEventListener('click', enableSoundOnInteraction);
          window.removeEventListener('touchstart', enableSoundOnInteraction);
          window.removeEventListener('keydown', enableSoundOnInteraction);
        };

        window.addEventListener('click', enableSoundOnInteraction, { once: true });
        window.addEventListener('touchstart', enableSoundOnInteraction, { once: true });
        window.addEventListener('keydown', enableSoundOnInteraction, { once: true });
      });
    }
  }, []);

  return (
    <main className="container">
      <h1>Happy Diwali</h1>
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
