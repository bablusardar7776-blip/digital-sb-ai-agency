import React, { useState } from 'react';

interface AgencyLogoProps {
  logoUrl?: string;
  agencyName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

export const AgencyLogo: React.FC<AgencyLogoProps> = ({
  logoUrl = '/src/assets/images/digital_sb_logo_1793757065507.jpg',
  agencyName = 'Digital SB AI Agency',
  size = 'md',
  showText = false,
  subtitle,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-7 w-7 rounded-md',
    md: 'h-9 w-9 rounded-lg',
    lg: 'h-12 w-12 rounded-xl',
    xl: 'h-20 w-20 rounded-2xl',
  };

  const initials = agencyName
    ? agencyName
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'SB';

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <div
        className={`relative overflow-hidden border border-blue-500/30 bg-slate-900 shadow-md shadow-blue-950/40 flex items-center justify-center shrink-0 ${sizeClasses[size]}`}
      >
        {!imgError && logoUrl ? (
          <img
            src={logoUrl}
            alt={`${agencyName} Logo`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white font-mono font-black text-xs">
            {initials}
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-base font-bold leading-tight tracking-tight text-white whitespace-nowrap">
            {agencyName}
          </span>
          {subtitle && (
            <span className="text-[11px] text-slate-400 font-normal leading-tight">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
