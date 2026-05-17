export type BanglaFontName =
  | 'hind-siliguri'
  | 'anek-bangla'
  | 'tiro-bangla'
  | 'bonbonia-kajla'
  | 'alinur-tatsama'
  | 'alinur-borno-bikash'
  | 'alinur-subas'
  | 'lipishree'
  | 'charukola'
  | 'shokuntola'
  | 'bornoporichay'
  | 'bokul'
  | 'sutonnymj'
  | 'shurjo'
  | 'srabondhara'
  | 'apona-lohit';

export interface FontInfo {
  name: string;
  nativeName: string;
  fontFamily: string;
  cssFile: string;
  className: BanglaFontName;
}

export const fonts: FontInfo[];

export const fontFamilies: Record<BanglaFontName, string>;

declare const _default: {
  fonts: FontInfo[];
  fontFamilies: Record<BanglaFontName, string>;
};

export default _default;