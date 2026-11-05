export default function Page() {
  return (
    <main className="container">
      <h1>Happy Diwali 🪔</h1>
      <video
        src="/diwali.mp4"
        controls
        autoPlay
        loop
        muted
        playsInline
      />
      <p>Wishing you and your family a very Happy Diwali!</p>
    </main>
  );
}
