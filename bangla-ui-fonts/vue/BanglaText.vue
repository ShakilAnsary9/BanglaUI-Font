<template>
  <span :class="fontClass" :style="textStyle">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  font?: string;
  weight?: number | string;
  style?: 'normal' | 'italic';
  size?: string;
  color?: string;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  font: 'hind-siliguri',
  weight: 400,
  style: 'normal',
});

const fontFamilies: Record<string, string> = {
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

const fontClass = computed(() => `bangla-font-${props.font}`);

const textStyle = computed(() => ({
  fontFamily: fontFamilies[props.font] || '"Hind Siliguri"',
  fontWeight: props.weight,
  fontStyle: props.style,
  fontSize: props.size,
  color: props.color,
}));
</script>