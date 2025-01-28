// tailwind.config.js
export const content = ['./index.html', './src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    screens: {
      'laptop': '800px',
      'desktop': '1920px',
    },
    colors: {
      primary: '#1e3a8a', // Customize as per your design
      secondary: '#fbbf24',
    },
  },
};
export const plugins = [];
