# Bangla UI Fonts

A collection of beautiful Bengali (Bangla) fonts for web projects with full TypeScript, React, Vue, and SCSS support.

## Installation

```bash
npm install bangla-ui-fonts
```

## Usage

### CSS (Basic)

```css
/* Import all fonts */
@import 'bangla-ui-fonts';

/* Import specific fonts */
@import 'bangla-ui-fonts/fonts/hind-siliguri.css';
@import 'bangla-ui-fonts/fonts/anek-bangla.css';
```

```javascript
// In JavaScript/TypeScript
import 'bangla-ui-fonts';
```

### SCSS/Sass

```scss
// Import everything with variables and mixins
@use 'bangla-ui-fonts/scss' as *;

// Use variables
.my-text {
  font-family: $bangla-font-hind-siliguri;
}

// Use mixins
.heading {
  @include bangla-heading('anek-bangla', 700);
}

.body-text {
  @include bangla-body('hind-siliguri', 16px, 400);
}

// Use utility classes
.font-hind-siliguri { font-family: "Hind Siliguri"; }
.font-anek-bangla { font-family: "Anek Bangla"; }
```

### React

```tsx
import { BanglaText, BanglaHeading } from 'bangla-ui-fonts/react';
import { BanglaFontProvider, useBanglaFonts } from 'bangla-ui-fonts/react';

// Basic usage
function App() {
  return (
    <div>
      <BanglaText font="hind-siliguri" size="18px">
        আমার সোনার বাংলা
      </BanglaText>
      
      <BanglaHeading level={1} font="anek-bangla">
        বাংলা শিরোনাম
      </BanglaHeading>
    </div>
  );
}

// With provider
function AppWithProvider() {
  return (
    <BanglaFontProvider loadAll>
      <MyComponent />
    </BanglaFontProvider>
  );
}

// With hook
function MyComponent() {
  const { isLoaded, loadFont } = useBanglaFonts({ loadAll: true });
  
  if (!isLoaded) return <div>Loading...</div>;
  
  return <BanglaText font="hind-siliguri">আমার সোনার বাংলা</BanglaText>;
}
```

### Vue

```vue
<script setup>
import { BanglaUIFonts } from 'bangla-ui-fonts/vue';

export default {
  plugins: [
    BanglaUIFonts({ loadAll: true })
  ]
}
</script>

<template>
  <BanglaText font="hind-siliguri" :weight="400">
    আমার সোনার বাংলা
  </BanglaText>
  
  <BanglaHeading :level="1" font="anek-bangla">
    বাংলা শিরোনাম
  </BanglaHeading>
</template>
```

### TypeScript

```typescript
import type { BanglaFontName, FontInfo } from 'bangla-ui-fonts';

const myFont: BanglaFontName = 'hind-siliguri';

const fontInfo: FontInfo = {
  name: 'Hind Siliguri',
  nativeName: 'হিন্দ শিলিগুরি',
  fontFamily: 'Hind Siliguri',
  cssFile: 'hind-siliguri.css',
  className: 'hind-siliguri'
};
```

## Available Fonts

| Font Name | Font Family |
|-----------|-------------|
| Hind Siliguri | `"Hind Siliguri"` |
| Anek Bangla | `"Anek Bangla"` |
| Tiro Bangla | `"Tiro Bangla"` |
| Bonbonia Kajla | `"Bonbonia Kajla"` |
| Alinur Tatsama | `"Alinur Tatsama"` |
| Alinur Borno Bikash | `"Alinur Borno Bikash"` |
| Alinur Subas | `"Alinur Subas"` |
| Lipishree | `"Lipishree"` |
| Charukola | `"Charukola"` |
| Shokuntola | `"Shokuntola"` |
| Bornoporichay | `"Bornoporichay"` |
| Bokul | `"Bokul"` |
| SutonnyMJ | `"Sutonny MJ"` |
| Shurjo | `"Shurjo"` |
| Srabondhara | `"Srabondhara"` |
| Apona Lohit | `"Apona Lohit"` |

## React API

### Components

- `<BanglaText>` - Render Bengali text with specified font
- `<BanglaHeading>` - Render Bengali headings (h1-h6)
- `<BanglaFontProvider>` - Preload fonts with loading/error states

### Hooks

- `useBanglaFonts()` - Load fonts programmatically

## Vue API

### Plugin Options

```typescript
{
  loadAll: boolean,  // Load all fonts on init
  fonts: string[]    // Load specific fonts
}
```

### Components

- `<BanglaText>` - Bengali text component
- `<BanglaHeading>` - Bengali heading component

## License

SIL Open Font License (OFL-1.1) - See individual font licenses for details.

## Credits

Fonts from [BanglaUI Font](https://github.com/ShakilAnsary9/BanglaUI-Font)