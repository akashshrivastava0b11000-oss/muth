import React from 'react';

interface SutraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  lightMode?: boolean; // if true, for dark backgrounds (pure white text)
}

export const SutraLogo: React.FC<SutraLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  lightMode = false
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-2xl', sub: 'text-[11px]' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', sub: 'text-sm' }
  };

  const current = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SUTRA Leaf Symbol - organic leaf with dynamic vein representing the connecting thread */}
      <div className={`relative ${current.icon} flex-shrink-0 transition-transform duration-200 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Leaf Body */}
          <path
            d="M50 6C24 22 14 52 24 78C32 92 56 96 74 88C90 78 96 52 86 28C78 12 62 6 50 6Z"
            fill="url(#sutraLeafGradient)"
          />
          {/* Subtle Secondary Inner Leaf Petal */}
          <path
            d="M50 14C34 26 26 50 34 72C40 82 58 86 70 78C82 70 86 50 78 30C72 18 60 14 50 14Z"
            fill="white"
            fillOpacity="0.12"
          />
          {/* The Connecting Thread / Central Vein (Sutra) */}
          <path
            d="M50 10C53 32 46 58 26 84"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Accent Node indicating Catalytic Growth */}
          <circle cx="50" cy="12" r="3.5" fill="#60A5FA" />
          <circle cx="27" cy="83" r="3.5" fill="#14B8A6" />

          {/* Gradients */}
          <defs>
            <linearGradient id="sutraLeafGradient" x1="20" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="0.6" stopColor="#1D4ED8" />
              <stop offset="1" stopColor="#0F2B5B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark and Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-wider ${
              lightMode ? 'text-white' : 'text-sutra-navy'
            } ${current.text}`}
            style={{ letterSpacing: '0.08em' }}
          >
            SUTRA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-sutra-royal animate-pulse"></span>
        </div>
        {showTagline && (
          <span
            className={`font-semibold uppercase tracking-widest mt-1 ${
              lightMode ? 'text-blue-200' : 'text-sutra-royal'
            } ${current.sub}`}
            style={{ letterSpacing: '0.18em' }}
          >
            The Venture Catalyst
          </span>
        )}
      </div>
    </div>
  );
};
