/**
 * Lightweight CSS/SVG-only hero background for mobile / no-3D devices.
 * Mimics the wireframe + grid feel without R3F + bloom cost.
 */
export function MobileHeroBg() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 grid-floor opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.85)_85%)]" />

      <svg
        viewBox="0 0 600 400"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] text-cyan opacity-70"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* outer ring */}
        <circle cx="300" cy="200" r="160" fill="none" stroke="currentColor" strokeOpacity="0.6">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 300 200"
            to="360 300 200"
            dur="40s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="300" cy="200" r="120" fill="none" stroke="var(--tone-mag-hex)" strokeOpacity="0.6">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 300 200"
            to="-360 300 200"
            dur="55s"
            repeatCount="indefinite"
          />
        </circle>
        {/* hexagonal wireframe */}
        <g transform="translate(300 200)" stroke="currentColor" strokeOpacity="0.85" fill="none">
          <polygon points="80,0 40,69 -40,69 -80,0 -40,-69 40,-69" />
          <polygon points="60,0 30,52 -30,52 -60,0 -30,-52 30,-52" />
          <line x1="-80" y1="0" x2="80" y2="0" />
          <line x1="-40" y1="-69" x2="40" y2="69" />
          <line x1="40" y1="-69" x2="-40" y2="69" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="22s"
            repeatCount="indefinite"
            additive="sum"
          />
        </g>
        {/* nodes on outer ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={300 + Math.cos(a) * 160}
              cy={200 + Math.sin(a) * 160}
              r="3"
              fill={i % 3 === 0 ? "var(--tone-acid-hex)" : "currentColor"}
            />
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}
