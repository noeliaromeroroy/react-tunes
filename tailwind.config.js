const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand']
      },
      colors: {
        body: '#181818',
        active: '#5c67de',
        'home-color-start': '#1B1B1B',
        'home-color-end': '#14151F'
      },
      maxWidth: {
        custom: '52rem'
      },
      backgroundPosition: {
        'left-20px': '20px center'
      },
      backgroundImage: {
        'home-gradient':
          'bg-[linear-gradient(rgba(10,_10,_10,_0.2),_rgba(10,_10,_10,_0.2)),_linear-gradient(132deg,_#1b1b1b_-3%,#14151f_99%)] bg-cover,_cover bg-50%_50%,_50%_50% bg-blend-normal',
        search: "url('/public/images/search.png')"
      }
    }
  },
  plugins: []
});
