export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050506]">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/paul-earle-wVjd0eWNqI8-unsplash.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.12]"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,#1a1a25_0,#050506_60%,#020205_80%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </main>
  );
}