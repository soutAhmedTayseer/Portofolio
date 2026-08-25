import Image from "next/image";

export type Screen = { src: string; framed?: boolean; landscape?: boolean; alt: string };

/**
 * Phone mockup. `framed: true` means the screenshot already contains a device
 * bezel (Android Studio emulator frame) — we just drop a shadow on it instead
 * of wrapping it in a second bezel.
 */
export default function DeviceFrame({
  screen,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 60vw, 260px",
}: {
  screen: Screen;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const ratio = screen.landscape ? "aspect-[19.5/9]" : "aspect-[9/19.5]";

  if (screen.framed) {
    return (
      <div className={`relative ${ratio} ${className}`}>
        <Image
          src={screen.src}
          alt={screen.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${ratio} rounded-[2rem] border border-white/15 bg-[#12161d] p-[3px] shadow-[0_25px_45px_rgba(0,0,0,0.65)] ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -right-[2px] top-[22%] h-[7%] w-[2px] rounded-r bg-white/25" />
      <span className="absolute -right-[2px] top-[33%] h-[11%] w-[2px] rounded-r bg-white/25" />
      <span className="absolute -left-[2px] top-[26%] h-[9%] w-[2px] rounded-l bg-white/20" />

      <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-black">
        <Image src={screen.src} alt={screen.alt} fill sizes={sizes} priority={priority} className="object-cover" />
        {/* punch-hole camera */}
        <span className="absolute left-1/2 top-[1.2%] size-[2.2%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        {/* gesture bar */}
        <span className="absolute bottom-[1%] left-1/2 h-[0.35%] w-[28%] -translate-x-1/2 rounded-full bg-white/70" />
      </div>
    </div>
  );
}
