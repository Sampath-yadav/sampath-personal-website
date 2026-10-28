import { type ArtVariant } from "~/data/projects";

/**
 * Original illustrated covers for each project (not screenshots).
 * They keep the cards visually distinct until real screenshots are added via
 * the `image` field in `src/data/projects.ts`.
 */

function Bars({
  x,
  y,
  widths,
  h = 5,
  gap = 9,
  fill,
  r = 2.5,
}: {
  x: number;
  y: number;
  widths: number[];
  h?: number;
  gap?: number;
  fill: string;
  r?: number;
}) {
  return (
    <>
      {widths.map((w, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * (h + gap)}
          width={w}
          height={h}
          rx={r}
          fill={fill}
        />
      ))}
    </>
  );
}

function TasksArt() {
  const cols = [
    { x: 176, n: 3, label: 50 },
    { x: 304, n: 2, label: 66 },
    { x: 432, n: 3, label: 40 },
  ];
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of a task board dashboard"
    >
      <rect width="640" height="400" fill="#1d1d1d" />
      <rect
        x="36"
        y="40"
        width="568"
        height="330"
        rx="8"
        fill="#2a2a2a"
        stroke="#3b3b3b"
      />
      <rect x="36" y="40" width="112" height="330" rx="8" fill="#232323" />
      <circle cx="62" cy="68" r="10" fill="#fff" />
      <Bars
        x={54}
        y={104}
        widths={[70, 58, 64, 48]}
        h={6}
        gap={18}
        fill="#4a4a4a"
      />
      <rect x="54" y="104" width="70" height="6" rx="3" fill="#fff" />
      <rect
        x="168"
        y="58"
        width="150"
        height="10"
        rx="5"
        fill="#fff"
        opacity="0.9"
      />
      <rect x="524" y="55" width="62" height="18" rx="9" fill="#1d3b2a" />
      <circle cx="538" cy="64" r="3.5" fill="#22c55e" />
      <rect x="546" y="61.5" width="28" height="5" rx="2.5" fill="#6fd699" />
      {cols.map((c, ci) => (
        <g key={c.x}>
          <rect
            x={c.x}
            y="98"
            width={c.label}
            height="6"
            rx="3"
            fill="#8a8a8a"
          />
          {Array.from({ length: c.n }).map((_, i) => {
            const y = 116 + i * 82;
            return (
              <g key={i}>
                <rect
                  x={c.x}
                  y={y}
                  width="116"
                  height="70"
                  rx="6"
                  fill="#343434"
                  stroke="#454545"
                />
                <rect
                  x={c.x + 10}
                  y={y + 12}
                  width={64 - ((i + ci) % 3) * 10}
                  height="6"
                  rx="3"
                  fill="#e9e9e9"
                />
                <rect
                  x={c.x + 10}
                  y={y + 26}
                  width={88 - ((i * 2 + ci) % 3) * 12}
                  height="5"
                  rx="2.5"
                  fill="#6d6d6d"
                />
                <rect
                  x={c.x + 10}
                  y={y + 46}
                  width="30"
                  height="12"
                  rx="6"
                  fill={(i + ci) % 2 ? "#fff" : "#4b4b4b"}
                />
                <circle cx={c.x + 98} cy={y + 52} r="7" fill="#5a5a5a" />
                <circle
                  cx={c.x + 88}
                  cy={y + 52}
                  r="7"
                  fill="#7a7a7a"
                  stroke="#343434"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </g>
      ))}
      <rect x="552" y="98" width="36" height="60" rx="6" fill="#343434" />
      <rect x="560" y="132" width="5" height="18" rx="2" fill="#6d6d6d" />
      <rect x="570" y="120" width="5" height="30" rx="2" fill="#fff" />
      <rect x="580" y="108" width="5" height="42" rx="2" fill="#9a9a9a" />
    </svg>
  );
}

function ChatArt() {
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of a website with an AI chatbot"
    >
      <rect width="640" height="400" fill="#e7e7e7" />
      <rect
        x="40"
        y="36"
        width="560"
        height="328"
        rx="8"
        fill="#fff"
        stroke="#d6d6d6"
      />
      <rect x="40" y="36" width="560" height="34" rx="8" fill="#f2f2f2" />
      <circle cx="62" cy="53" r="4.5" fill="#cfcfcf" />
      <circle cx="78" cy="53" r="4.5" fill="#cfcfcf" />
      <circle cx="94" cy="53" r="4.5" fill="#cfcfcf" />
      <rect x="150" y="45" width="220" height="16" rx="8" fill="#e4e4e4" />
      <Bars
        x={68}
        y={100}
        widths={[210, 150]}
        h={14}
        gap={10}
        fill="#1d1d1d"
        r={4}
      />
      <Bars
        x={68}
        y={156}
        widths={[240, 200, 120]}
        h={5}
        gap={9}
        fill="#cfcfcf"
      />
      <rect x="68" y="214" width="84" height="26" rx="13" fill="#1d1d1d" />
      <rect x="68" y="262" width="108" height="76" rx="6" fill="#f0f0f0" />
      <rect x="188" y="262" width="108" height="76" rx="6" fill="#f0f0f0" />
      <rect x="312" y="262" width="0" height="0" />
      {/* chat widget */}
      <g>
        <rect x="360" y="92" width="212" height="248" rx="12" fill="#1d1d1d" />
        <rect x="360" y="92" width="212" height="40" rx="12" fill="#2d2d2d" />
        <circle cx="381" cy="112" r="9" fill="#fff" />
        <rect x="397" y="106" width="64" height="6" rx="3" fill="#fff" />
        <rect x="397" y="117" width="38" height="4" rx="2" fill="#7a7a7a" />
        <rect x="376" y="146" width="128" height="34" rx="10" fill="#3a3a3a" />
        <Bars
          x={388}
          y={157}
          widths={[96, 62]}
          h={4.5}
          gap={7}
          fill="#bdbdbd"
        />
        <rect x="440" y="192" width="116" height="26" rx="10" fill="#fff" />
        <Bars x={452} y={201} widths={[84]} h={4.5} gap={7} fill="#7a7a7a" />
        <rect x="376" y="230" width="150" height="34" rx="10" fill="#3a3a3a" />
        <Bars
          x={388}
          y={241}
          widths={[116, 74]}
          h={4.5}
          gap={7}
          fill="#bdbdbd"
        />
        <rect x="376" y="276" width="128" height="26" rx="13" fill="#fff" />
        <path
          d="M392 289h18m0 0-6-6m6 6-6 6"
          stroke="#1d1d1d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="418" y="286.5" width="70" height="5" rx="2.5" fill="#1d1d1d" />
        <rect x="372" y="312" width="156" height="20" rx="10" fill="#2d2d2d" />
        <circle cx="552" cy="322" r="9" fill="#fff" />
      </g>
    </svg>
  );
}

function LandingArt() {
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of a responsive landing page on desktop and phone"
    >
      <rect width="640" height="400" fill="#f3f3f3" />
      <rect
        x="40"
        y="38"
        width="420"
        height="300"
        rx="8"
        fill="#fff"
        stroke="#d9d9d9"
      />
      <rect x="40" y="38" width="420" height="28" rx="8" fill="#f1f1f1" />
      <circle cx="58" cy="52" r="4" fill="#d0d0d0" />
      <circle cx="72" cy="52" r="4" fill="#d0d0d0" />
      <circle cx="86" cy="52" r="4" fill="#d0d0d0" />
      <rect x="60" y="82" width="40" height="8" rx="4" fill="#1d1d1d" />
      <Bars x={300} y={84} widths={[28, 28, 28]} h={4} gap={0} fill="#bdbdbd" />
      <rect x="296" y="82" width="28" height="4" rx="2" fill="#bdbdbd" />
      <rect x="332" y="82" width="28" height="4" rx="2" fill="#bdbdbd" />
      <rect x="368" y="82" width="28" height="4" rx="2" fill="#bdbdbd" />
      <rect x="408" y="77" width="36" height="14" rx="7" fill="#1d1d1d" />
      <rect x="60" y="126" width="210" height="18" rx="5" fill="#1d1d1d" />
      <rect x="60" y="152" width="160" height="18" rx="5" fill="#1d1d1d" />
      <Bars x={60} y={188} widths={[220, 190]} h={5} gap={9} fill="#cfcfcf" />
      <rect x="60" y="226" width="86" height="26" rx="13" fill="#1d1d1d" />
      <rect
        x="156"
        y="226"
        width="86"
        height="26"
        rx="13"
        fill="#fff"
        stroke="#cfcfcf"
      />
      <rect x="320" y="118" width="124" height="116" rx="8" fill="#e6e6e6" />
      <path d="M338 214l28-34 22 22 18-16 24 28z" fill="#cfcfcf" />
      <circle cx="352" cy="146" r="9" fill="#cfcfcf" />
      <rect x="60" y="272" width="120" height="50" rx="6" fill="#f3f3f3" />
      <rect x="190" y="272" width="120" height="50" rx="6" fill="#f3f3f3" />
      <rect x="320" y="272" width="124" height="50" rx="6" fill="#f3f3f3" />
      {/* phone */}
      <g>
        <rect x="470" y="70" width="130" height="288" rx="20" fill="#1d1d1d" />
        <rect x="477" y="77" width="116" height="274" rx="14" fill="#fff" />
        <rect x="518" y="83" width="34" height="8" rx="4" fill="#1d1d1d" />
        <rect x="490" y="108" width="24" height="6" rx="3" fill="#1d1d1d" />
        <rect x="560" y="105" width="20" height="12" rx="3" fill="#cfcfcf" />
        <rect x="490" y="138" width="90" height="12" rx="4" fill="#1d1d1d" />
        <rect x="490" y="156" width="64" height="12" rx="4" fill="#1d1d1d" />
        <Bars
          x={490}
          y={184}
          widths={[90, 76]}
          h={4.5}
          gap={8}
          fill="#cfcfcf"
        />
        <rect x="490" y="218" width="70" height="22" rx="11" fill="#1d1d1d" />
        <rect x="490" y="254" width="90" height="60" rx="6" fill="#e6e6e6" />
        <rect x="490" y="322" width="90" height="20" rx="6" fill="#f3f3f3" />
      </g>
    </svg>
  );
}

function FigmaArt() {
  const Phone = ({ x, y, dark }: { x: number; y: number; dark?: boolean }) => (
    <g>
      <rect x={x} y={y} width="132" height="272" rx="20" fill="#1d1d1d" />
      <rect
        x={x + 6}
        y={y + 6}
        width="120"
        height="260"
        rx="15"
        fill={dark ? "#262626" : "#fff"}
      />
      <rect
        x={x + 46}
        y={y + 12}
        width="40"
        height="9"
        rx="4.5"
        fill="#1d1d1d"
      />
      <rect
        x={x + 18}
        y={y + 38}
        width="56"
        height="9"
        rx="4.5"
        fill={dark ? "#fff" : "#1d1d1d"}
      />
      <rect
        x={x + 18}
        y={y + 56}
        width="86"
        height="52"
        rx="8"
        fill={dark ? "#3a3a3a" : "#ececec"}
      />
      <rect
        x={x + 18}
        y={y + 118}
        width="40"
        height="38"
        rx="8"
        fill={dark ? "#3a3a3a" : "#ececec"}
      />
      <rect
        x={x + 64}
        y={y + 118}
        width="40"
        height="38"
        rx="8"
        fill={dark ? "#fff" : "#1d1d1d"}
      />
      <Bars
        x={x + 18}
        y={y + 170}
        widths={[86, 66]}
        h={5}
        gap={8}
        fill={dark ? "#6a6a6a" : "#cfcfcf"}
      />
      <rect
        x={x + 18}
        y={y + 212}
        width="86"
        height="26"
        rx="13"
        fill={dark ? "#fff" : "#1d1d1d"}
      />
    </g>
  );
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of mobile screens with Figma-style spacing guides"
    >
      <rect width="640" height="400" fill="#dedede" />
      <Phone x={56} y={58} />
      <Phone x={254} y={42} dark />
      <Phone x={452} y={58} />
      {/* selection frame with handles */}
      <rect
        x="248"
        y="36"
        width="144"
        height="284"
        fill="none"
        stroke="#1d1d1d"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      {[
        [248, 36],
        [392, 36],
        [248, 320],
        [392, 320],
      ].map(([cx, cy], i) => (
        <rect
          key={i}
          x={(cx ?? 0) - 4}
          y={(cy ?? 0) - 4}
          width="8"
          height="8"
          fill="#fff"
          stroke="#1d1d1d"
          strokeWidth="1.5"
        />
      ))}
      {/* spacing guides */}
      <g fill="none" stroke="#1d1d1d" strokeWidth="1.2">
        <path d="M272 300v14M268 300h8M268 314h8" />
        <path d="M392 120h14M392 116v8M406 116v8" />
      </g>
      <rect x="274" y="302" width="22" height="12" rx="3" fill="#1d1d1d" />
      <text
        x="285"
        y="311"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="#fff"
        fontFamily="inherit"
      >
        16
      </text>
      <rect x="410" y="114" width="22" height="12" rx="3" fill="#1d1d1d" />
      <text
        x="421"
        y="123"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="#fff"
        fontFamily="inherit"
      >
        24
      </text>
      <rect x="276" y="344" width="88" height="22" rx="11" fill="#1d1d1d" />
      <text
        x="320"
        y="359"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="inherit"
      >
        1:1 match
      </text>
    </svg>
  );
}

function VoiceArt() {
  const heights = [14, 30, 52, 24, 66, 40, 78, 34, 58, 22, 46, 70, 28, 54, 18];
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of a voice assistant booking appointment slots"
    >
      <rect width="640" height="400" fill="#1d1d1d" />
      {/* voice side */}
      <rect
        x="40"
        y="52"
        width="260"
        height="296"
        rx="10"
        fill="#262626"
        stroke="#3a3a3a"
      />
      <circle cx="170" cy="118" r="30" fill="#fff" />
      <rect x="161" y="102" width="18" height="28" rx="9" fill="#1d1d1d" />
      <path
        d="M155 122a15 15 0 0 0 30 0M170 137v8"
        stroke="#1d1d1d"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <g>
        {heights.map((h, i) => (
          <rect
            key={i}
            x={62 + i * 15.5}
            y={226 - h / 2}
            width="7"
            height={h}
            rx="3.5"
            fill={i % 4 === 2 ? "#fff" : "#7a7a7a"}
          />
        ))}
      </g>
      <rect x="62" y="290" width="216" height="30" rx="15" fill="#343434" />
      <Bars x={78} y={301} widths={[120]} h={5} gap={0} fill="#bdbdbd" />
      {/* flow arrow */}
      <path
        d="M312 200h34m0 0-8-8m8 8-8 8"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* calendar side */}
      <rect
        x="360"
        y="52"
        width="240"
        height="296"
        rx="10"
        fill="#262626"
        stroke="#3a3a3a"
      />
      <rect x="380" y="72" width="90" height="9" rx="4.5" fill="#fff" />
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 4 }).map((__, c) => {
          const booked = (r * 4 + c) % 3 === 0 || (r + c) % 5 === 1;
          return (
            <rect
              key={`${r}-${c}`}
              x={380 + c * 52}
              y={104 + r * 40}
              width="44"
              height="30"
              rx="6"
              fill={booked ? "#fff" : "#343434"}
            />
          );
        }),
      )}
      <rect x="380" y="312" width="80" height="22" rx="11" fill="#1d3b2a" />
      <circle cx="396" cy="323" r="4" fill="#22c55e" />
      <rect x="406" y="320.5" width="42" height="5" rx="2.5" fill="#6fd699" />
    </svg>
  );
}

const art: Record<ArtVariant, () => React.JSX.Element> = {
  tasks: TasksArt,
  chat: ChatArt,
  landing: LandingArt,
  figma: FigmaArt,
  voice: VoiceArt,
};

export function ProjectArt({
  variant,
  className,
}: {
  variant: ArtVariant;
  className?: string;
}) {
  const Art = art[variant];
  return (
    <div className={className}>
      <Art />
    </div>
  );
}
