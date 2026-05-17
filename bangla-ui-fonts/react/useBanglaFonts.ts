import { useEffect, useState } from 'react';
import type { BanglaFontName } from '../index.d';

export interface UseBanglaFontOptions {
  /** Fonts to load - defaults to all fonts */
  fonts?: BanglaFontName[];
  /** Whether to load all fonts */
  loadAll?: boolean;
}

export interface UseBanglaFontReturn {
  /** Whether fonts are loaded */
  isLoaded: boolean;
  /** Error if any */
  error: Error | null;
  /** Load a specific font */
  loadFont: (font: BanglaFontName) => void;
  /** Load multiple fonts */
  loadFonts: (fonts: BanglaFontName[]) => void;
}

/**
 * Hook to load Bangla UI fonts
 * @param options - Configuration options
 * @returns Font loading state and controls
 */
export function useBanglaFonts(options: UseBanglaFontOptions = {}): UseBanglaFontReturn {
  const { fonts, loadAll = true } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        if (loadAll) {
          await import('bangla-ui-fonts');
        } else if (fonts && fonts.length > 0) {
          for (const font of fonts) {
            await import(`bangla-ui-fonts/fonts/${font}.css`);
          }
        }
        setIsLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load fonts'));
      }
    };

    loadFonts();
  }, [fonts, loadAll]);

  const loadFont = async (font: BanglaFontName) => {
    try {
      await import(`bangla-ui-fonts/fonts/${font}.css`);
    } catch (err) {
      throw new Error(`Failed to load font: ${font}`);
    }
  };

  const loadFonts = async (fontList: BanglaFontName[]) => {
    try {
      await Promise.all(fontList.map((font) => import(`bangla-ui-fonts/fonts/${font}.css`)));
    } catch (err) {
      throw new Error(`Failed to load fonts: ${fontList.join(', ')}`);
    }
  };

  return { isLoaded, error, loadFont, loadFonts };
}

export default useBanglaFonts;