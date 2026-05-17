import React from 'react';
import type { BanglaFontName } from '../index.d';

export interface BanglaTextProps {
  /** Font name to use */
  font?: BanglaFontName;
  /** Additional CSS class names */
  className?: string;
  /** Font weight (100-900) */
  weight?: number;
  /** Font style (normal, italic) */
  style?: 'normal' | 'italic';
  /** Font size (e.g., '16px', '1rem') */
  size?: string;
  /** Text color */
  color?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Child elements */
  children: React.ReactNode;
}

export const BanglaText: React.FC<BanglaTextProps> = ({
  font = 'hind-siliguri',
  className = '',
  weight = 400,
  style: fontStyle = 'normal',
  size,
  color,
  style,
  children,
}) => {
  const fontFamily = getFontFamily(font);

  return (
    <span
      className={`bangla-font-${font} ${className}`}
      style={{
        fontFamily,
        fontWeight: weight,
        fontStyle,
        fontSize: size,
        color,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export interface BanglaHeadingProps extends Omit<BanglaTextProps, 'children'> {
  /** Heading level (1-6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Text content */
  children: React.ReactNode;
}

export const BanglaHeading: React.FC<BanglaHeadingProps> = ({
  level = 1,
  font = 'anek-bangla',
  ...props
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag style={{ fontFamily: getFontFamily(font) }}>
      <BanglaText font={font} {...props} />
    </Tag>
  );
};

function getFontFamily(fontName: BanglaFontName): string {
  const fontFamilies: Record<BanglaFontName, string> = {
    'hind-siliguri': '"Hind Siliguri"',
    'anek-bangla': '"Anek Bangla"',
    'tiro-bangla': '"Tiro Bangla"',
    'bonbonia-kajla': '"Bonbonia Kajla"',
    'alinur-tatsama': '"Alinur Tatsama"',
    'alinur-borno-bikash': '"Alinur Borno Bikash"',
    'alinur-subas': '"Alinur Subas"',
    'lipishree': '"Lipishree"',
    'charukola': '"Charukola"',
    'shokuntola': '"Shokuntola"',
    'bornoporichay': '"Bornoporichay"',
    'bokul': '"Bokul"',
    'sutonnymj': '"Sutonny MJ"',
    'shurjo': '"Shurjo"',
    'srabondhara': '"Srabondhara"',
    'apona-lohit': '"Apona Lohit"',
  };

  return fontFamilies[fontName] || '"Hind Siliguri"';
}

export default { BanglaText, BanglaHeading };