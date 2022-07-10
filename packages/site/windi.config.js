// @ts-check
import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
import forms from 'windicss/plugin/forms';
// import typography from 'windicss/plugin/typography'; // causes occasional call stack size exceeded build bug
// import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
  safelist: ['space-x-3'],
  theme: {
    extend: {
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       'line-height': 1.5,
      //       p: {
      //         'margin-top': '0',
      //       },
      //     },
      //   },
      //   lg: {
      //     css: {
      //       p: {
      //         'margin-top': '0',
      //       },
      //     },
      //   },
      // },
      colors: {
        primary: colors.purple,
      }
    }
  },
  plugins: [
    forms,
    // typography,
    // aspectRatio,
  ]
});
