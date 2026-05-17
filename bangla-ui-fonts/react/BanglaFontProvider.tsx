import React, { createContext, useContext, useEffect, useState } from 'react';
import type { BanglaFontName } from '../index.d';

interface BanglaFontContextValue {
  loadedFonts: Set<BanglaFontName>;
  loadFont: (font: BanglaFontName) => Promise<void>;
  loadAllFonts: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const BanglaFontContext = createContext<BanglaFontContextValue | null>(null);

export interface BanglaFontProviderProps {
  /** Fonts to preload */
  fonts?: BanglaFontName[];
  /** Load all fonts on mount */
  loadAll?: boolean;
  /** Show loading state */
  showLoading?: boolean;
  /** Loading indicator component */
  loadingComponent?: React.ReactNode;
  /** Error display component */
  errorComponent?: ((error: Error) => React.ReactNode) | null;
  /** Children */
  children: React.ReactNode;
}

export const BanglaFontProvider: React.FC<BanglaFontProviderProps> = ({
  fonts = [],
  loadAll = false,
  showLoading = false,
  loadingComponent = null,
  errorComponent = null,
  children,
}) => {
  const [loadedFonts, setLoadedFonts] = useState<Set<BanglaFontName>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        setIsLoading(true);
        if (loadAll) {
          await import('bangla-ui-fonts');
          setLoadedFonts(new Set([
            'hind-siliguri',
            'anek-bangla',
            'tiro-bangla',
            'bonbonia-kajla',
            'alinur-tatsama',
            'alinur-borno-bikash',
            'alinur-subas',
            'lipishree',
            'charukola',
            'shokuntola',
            'bornoporichay',
            'bokul',
            'sutonnymj',
            'shurjo',
            'srabondhara',
            'apona-lohit',
          ] as BanglaFontName[]));
        } else if (fonts.length > 0) {
          for (const font of fonts) {
            await import(`bangla-ui-fonts/fonts/${font}.css`);
            setLoadedFonts((prev) => new Set([...prev, font]));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load fonts'));
      } finally {
        setIsLoading(false);
      }
    };

    loadFonts();
  }, [fonts, loadAll]);

  const loadFont = async (font: BanglaFontName) => {
    if (loadedFonts.has(font)) return;

    try {
      await import(`bangla-ui-fonts/fonts/${font}.css`);
      setLoadedFonts((prev) => new Set([...prev, font]));
    } catch (err) {
      throw new Error(`Failed to load font: ${font}`);
    }
  };

  const loadAllFonts = async () => {
    try {
      setIsLoading(true);
      await import('bangla-ui-fonts');
      setLoadedFonts(new Set([
        'hind-siliguri',
        'anek-bangla',
        'tiro-bangla',
        'bonbonia-kajla',
        'alinur-tatsama',
        'alinur-borno-bikash',
        'alinur-subas',
        'lipishree',
        'charukola',
        'shokuntola',
        'bornoporichay',
        'bokul',
        'sutonnymj',
        'shurjo',
        'srabondhara',
        'apona-lohit',
      ] as BanglaFontName[]));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load all fonts'));
    } finally {
      setIsLoading(false);
    }
  };

  if (showLoading && isLoading) {
    return <>{loadingComponent}</>;
  }

  if (error && errorComponent) {
    return <>{errorComponent(error)}</>;
  }

  return (
    <BanglaFontContext.Provider value={{ loadedFonts, loadFont, loadAllFonts, isLoading, error }}>
      {children}
    </BanglaFontContext.Provider>
  );
};

export function useBanglaFontContext(): BanglaFontContextValue {
  const context = useContext(BanglaFontContext);
  if (!context) {
    throw new Error('useBanglaFontContext must be used within BanglaFontProvider');
  }
  return context;
}

export default BanglaFontProvider;