export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050506]">
      {/* background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-[0.12]"
        />
      </div>

      {/* gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,#1a1a25_0,#050506_60%,#020205_80%)]" />

      {/* content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </main>
  );
}