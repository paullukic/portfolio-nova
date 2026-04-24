/**
 * Small decorative SVG diagrams per project — each one hints visually at the
 * product/domain. Uses currentColor so tone propagates from parent.
 */

export function DiagramGrid() {
  /* Grid energy topology — CYBERGRID */
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full">
      <defs>
        <linearGradient id="dgEdge" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--tone-cyan-hex)" />
          <stop offset="100%" stopColor="var(--tone-mag-hex)" />
        </linearGradient>
      </defs>
      {/* grid lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          x2={240}
          y1={20 + i * 20}
          y2={20 + i * 20}
          stroke="currentColor"
          strokeOpacity={0.12}
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={20 + i * 20}
          x2={20 + i * 20}
          y1={0}
          y2={140}
          stroke="currentColor"
          strokeOpacity={0.12}
        />
      ))}
      {/* nodes */}
      {[
        [40, 40],
        [120, 30],
        [200, 60],
        [60, 100],
        [160, 110],
        [100, 70],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="currentColor" />
          <circle
            cx={x}
            cy={y}
            r="10"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.4}
          >
            <animate
              attributeName="r"
              values="4;14;4"
              dur={`${3 + i * 0.6}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.6;0;0.6"
              dur={`${3 + i * 0.6}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
      {/* edges */}
      <g stroke="url(#dgEdge)" strokeWidth="1.2" fill="none">
        <path d="M40 40 L100 70 L120 30" />
        <path d="M100 70 L200 60" />
        <path d="M100 70 L60 100 L160 110" />
        <path d="M200 60 L160 110" />
      </g>
    </svg>
  );
}

export function DiagramHighlight() {
  /* Text highlight / markup — COLLABWRITING */
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      {[20, 40, 60, 80, 100, 120, 140].map((y, i) => (
        <g key={i}>
          <line
            x1={20}
            x2={160 - (i % 3) * 20}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeOpacity={0.25}
            strokeWidth="2"
          />
          {i === 2 && (
            <rect
              x={40}
              y={y - 6}
              width={80}
              height={12}
              fill="currentColor"
              fillOpacity={0.3}
            >
              <animate attributeName="width" values="0;80;80" dur="2.4s" repeatCount="indefinite" />
            </rect>
          )}
          {i === 5 && (
            <rect
              x={30}
              y={y - 6}
              width={60}
              height={12}
              fill="currentColor"
              fillOpacity={0.2}
            >
              <animate attributeName="width" values="0;60;60" dur="3.2s" repeatCount="indefinite" />
            </rect>
          )}
        </g>
      ))}
    </svg>
  );
}

export function DiagramMap() {
  /* Map pins — GASTARBAJTER24 */
  return (
    <svg viewBox="0 0 220 140" className="h-full w-full">
      {/* country outline stylised */}
      <path
        d="M20 110 C30 80, 60 70, 80 80 S 120 90, 140 70 S 180 60, 200 80 L 200 130 L 20 130 Z"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.3}
      />
      {[
        [60, 90, 0],
        [110, 80, 0.4],
        [150, 75, 0.8],
        [180, 90, 1.2],
        [85, 100, 1.6],
      ].map(([x, y, d], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="currentColor" />
          <path
            d={`M${x} ${y} L${x - 4} ${y - 10} L${x + 4} ${y - 10} Z`}
            fill="currentColor"
          />
          <circle
            cx={x}
            cy={y}
            r="3"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.5}
          >
            <animate
              attributeName="r"
              values="3;18;3"
              dur="3s"
              begin={`${d}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.8;0;0.8"
              dur="3s"
              begin={`${d}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function DiagramTimeline() {
  /* Timeline / Gantt — TEODESK */
  return (
    <svg viewBox="0 0 220 120" className="h-full w-full">
      {[
        [10, 20, 90],
        [40, 40, 120],
        [20, 60, 160],
        [70, 80, 80],
        [30, 100, 100],
      ].map(([x, y, w], i) => (
        <g key={i}>
          <line
            x1={0}
            x2={220}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeOpacity={0.15}
          />
          <rect
            x={x}
            y={(y as number) - 5}
            width={w}
            height={10}
            fill="currentColor"
            fillOpacity={0.5}
          >
            <animate
              attributeName="x"
              values={`${x};${(x as number) + 20};${x}`}
              dur={`${4 + i}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
    </svg>
  );
}

export function DiagramGame() {
  /* Arcade / controller — 4BEES */
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <rect x="30" y="40" width="140" height="60" rx="30" fill="none" stroke="currentColor" strokeOpacity={0.7} />
      {/* dpad */}
      <rect x="50" y="62" width="24" height="6" fill="currentColor" />
      <rect x="59" y="53" width="6" height="24" fill="currentColor" />
      {/* buttons */}
      <circle cx="135" cy="60" r="5" fill="currentColor">
        <animate attributeName="fill-opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="75" r="5" fill="currentColor">
        <animate attributeName="fill-opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="135" cy="90" r="5" fill="currentColor" />
      <circle cx="120" cy="75" r="5" fill="currentColor" fillOpacity={0.4} />
    </svg>
  );
}

export function DiagramSpike() {
  /* Counter spike chart — RESULT COUNTER */
  return (
    <svg viewBox="0 0 220 120" className="h-full w-full">
      <polyline
        points="0,100 20,95 40,85 60,88 80,60 100,55 120,20 140,25 160,40 180,35 200,30 220,15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polyline
        points="0,100 20,95 40,85 60,88 80,60 100,55 120,20 140,25 160,40 180,35 200,30 220,15 220,120 0,120"
        fill="currentColor"
        fillOpacity={0.15}
      />
      <circle cx="120" cy="20" r="4" fill="currentColor">
        <animate attributeName="r" values="4;10;4" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function DiagramBlocks() {
  /* Block layout — COR_TECH */
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      {[
        [20, 20, 60, 40],
        [90, 20, 90, 20],
        [90, 50, 40, 30],
        [140, 50, 40, 30],
        [20, 80, 40, 40],
        [70, 90, 110, 30],
      ].map(([x, y, w, h], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.5}
        >
          <animate
            attributeName="stroke-opacity"
            values="0.2;0.8;0.2"
            dur={`${2 + i * 0.5}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </svg>
  );
}

export function DiagramShield() {
  /* Shield / lock — PAXHAX */
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full">
      <path
        d="M100 20 L160 40 L160 80 C160 110 130 120 100 130 C70 120 40 110 40 80 L40 40 Z"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.7}
      />
      <path
        d="M100 30 L150 48 L150 78 C150 102 125 112 100 120 C75 112 50 102 50 78 L50 48 Z"
        fill="currentColor"
        fillOpacity={0.08}
      />
      <text
        x="100"
        y="85"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="JetBrains Mono, monospace"
        fontSize="12"
        letterSpacing="2"
      >
        ROOT
      </text>
      <circle cx="100" cy="70" r="3" fill="currentColor">
        <animate attributeName="fill-opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function DiagramShop() {
  /* Product catalog + phone silhouette — IGELPHONE */
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full">
      {/* product tile grid */}
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <rect
            key={`t${row}-${col}`}
            x={10 + col * 42}
            y={10 + row * 38}
            width={36}
            height={30}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.28}
          />
        ))
      )}
      {/* accent: one tile highlighted */}
      <rect
        x={52}
        y={48}
        width={36}
        height={30}
        fill="currentColor"
        fillOpacity={0.18}
        stroke="currentColor"
        strokeOpacity={0.8}
      />
      {/* phone silhouette overlay right */}
      <g transform="translate(170,18)">
        <rect
          x={0}
          y={0}
          width={50}
          height={100}
          rx={6}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.7}
        />
        <rect
          x={4}
          y={10}
          width={42}
          height={72}
          fill="currentColor"
          fillOpacity={0.1}
          stroke="currentColor"
          strokeOpacity={0.35}
        />
        <circle cx={25} cy={92} r={2} fill="currentColor" />
      </g>
      {/* ticker tape at bottom */}
      <text
        x={10}
        y={130}
        fill="currentColor"
        fillOpacity={0.6}
        fontFamily="JetBrains Mono, monospace"
        fontSize={7}
        letterSpacing={1.4}
      >
        CART · CHECKOUT · STRIPE · DE/EN · ADMIN_PANEL
      </text>
    </svg>
  );
}

export function DiagramFor(title: string) {
  if (title.includes("CYBERGRID")) return <DiagramGrid />;
  if (title.includes("COLLABWRITING") || title.includes("CLUING")) return <DiagramHighlight />;
  if (title.includes("GASTARBAJTER")) return <DiagramMap />;
  if (title.includes("IGELPHONE")) return <DiagramShop />;
  if (title.includes("TEODESK")) return <DiagramTimeline />;
  if (title.includes("ARCADE")) return <DiagramGame />;
  if (title.includes("RESULT_COUNTER")) return <DiagramSpike />;
  if (title.includes("COR_TECH")) return <DiagramBlocks />;
  if (title.includes("PAXHAX")) return <DiagramShield />;
  return null;
}
