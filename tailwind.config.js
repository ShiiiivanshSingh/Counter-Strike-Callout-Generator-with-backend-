// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // include all relevant paths
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fd073d",
        secondary: "#0120a8",
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to left top, #0120a8, #86009b, #c20081, #e90060, #fd073d)',
      },
    },
  },
  plugins: [],
};
