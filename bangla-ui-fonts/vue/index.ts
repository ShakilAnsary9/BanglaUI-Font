import type { Plugin } from 'vue';
import BanglaText from './BanglaText.vue';
import BanglaHeading from './BanglaHeading.vue';

export interface BanglaUI FontsPluginOptions {
  /** Load all fonts on initialization */
  loadAll?: boolean;
  /** Specific fonts to load */
  fonts?: string[];
}

export const BanglaUIFonts: Plugin = {
  install(app, options: BanglaUIFontsPluginOptions = {}) {
    const { loadAll = false, fonts = [] } = options;

    app.component('BanglaText', BanglaText);
    app.component('BanglaHeading', BanglaHeading);

    if (loadAll) {
      import('bangla-ui-fonts');
    } else if (fonts.length > 0) {
      fonts.forEach((font) => {
        import(`bangla-ui-fonts/fonts/${font}.css`);
      });
    }

    app.config.globalProperties.$banglaFonts = {
      fonts: [
        { name: 'hind-siliguri', family: '"Hind Siliguri"' },
        { name: 'anek-bangla', family: '"Anek Bangla"' },
        { name: 'tiro-bangla', family: '"Tiro Bangla"' },
        { name: 'bonbonia-kajla', family: '"Bonbonia Kajla"' },
        { name: 'alinur-tatsama', family: '"Alinur Tatsama"' },
        { name: 'alinur-borno-bikash', family: '"Alinur Borno Bikash"' },
        { name: 'alinur-subas', family: '"Alinur Subas"' },
        { name: 'lipishree', family: '"Lipishree"' },
        { name: 'charukola', family: '"Charukola"' },
        { name: 'shokuntola', family: '"Shokuntola"' },
        { name: 'bornoporichay', family: '"Bornoporichay"' },
        { name: 'bokul', family: '"Bokul"' },
        { name: 'sutonnymj', family: '"Sutonny MJ"' },
        { name: 'shurjo', family: '"Shurjo"' },
        { name: 'srabondhara', family: '"Srabondhara"' },
        { name: 'apona-lohit', family: '"Apona Lohit"' },
      ],
    };
  },
};

export default BanglaUIFonts;