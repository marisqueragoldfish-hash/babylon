'use client';

export function DivineEye({ size = 60, className = '', animated = true }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none">
      <defs>
        <radialGradient id="eye-iris" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="40%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0a1855" />
        </radialGradient>
        <linearGradient id="eye-frame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
        <radialGradient id="eye-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow exterior */}
      <circle cx="50" cy="50" r="48" fill="url(#eye-glow)" />

      {/* Triángulo de la providencia */}
      <path
        d="M 50 10 L 90 80 L 10 80 Z"
        stroke="url(#eye-frame)"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Triángulo interior decorativo */}
      <path
        d="M 50 22 L 78 72 L 22 72 Z"
        stroke="url(#eye-frame)"
        strokeWidth="0.7"
        fill="none"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Almendra del ojo (forma) */}
      <path
        d="M 25 50 Q 50 32 75 50 Q 50 68 25 50 Z"
        stroke="url(#eye-frame)"
        strokeWidth="1.8"
        fill="rgba(2,8,32,0.6)"
      />

      {/* Iris */}
      <circle cx="50" cy="50" r="10" fill="url(#eye-iris)" />

      {/* Pupila */}
      <circle cx="50" cy="50" r="4" fill="#020410" />

      {/* Reflejo divino */}
      <circle cx="47" cy="47" r="1.5" fill="#fff" opacity="0.9" />

      {/* Rayos divinos */}
      {animated && (
        <g className="animate-rune" style={{ transformOrigin: 'center' }}>
          {[0, 60, 120, 180, 240, 300].map(angle => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 38;
            const y1 = 50 + Math.sin(rad) * 38;
            const x2 = 50 + Math.cos(rad) * 44;
            const y2 = 50 + Math.sin(rad) * 44;
            return (
              <line
                key={angle}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#fbbf24"
                strokeWidth="1"
                opacity="0.6"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}
