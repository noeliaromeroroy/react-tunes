const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand'],
      },
      colors: {
        body: '#181818',
        'home-color-start': '#1B1B1B',
        'home-color-end': '#14151F',
      },
      maxWidth: {
        custom: '52rem',
      },
      backgroundPosition: {
        'left-20px': '20px center',
      },
      backgroundImage: {
        'home-gradient':
          'linear-gradient(0deg, rgba(10, 10, 10, 0.20) 0%, rgba(10, 10, 10, 0.20) 100%), linear-gradient(155deg, #1B1B1B 0%, #14151F 100%)',
        search: `url('/public/images/search.png')`,
      },
    },
  },
  plugins: [],
});
