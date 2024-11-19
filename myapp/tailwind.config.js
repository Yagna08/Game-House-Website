/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bs-1': '0px 0px 8px #888',
        'bs-1-hover': '0px 0px 15px #888',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        'half':'0.3px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      fontSize: {
        '5rem': ['5rem', {
          lineHeight: '5rem'
        }]
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '3': 'repeat(3, 6rem)',
      },
      margin: {
        'own': '3rem auto',
        'btn': '2rem auto'
      },
      padding: {
        'own': '1rem 0',
        'btn': '0.5rem 1rem'
      },
      colors: {
        'GREEN': "#538d4e",
        'YELLOW': "#b59f3b",
        'GREY': "#3a3a3c",
        'BLACK':"#121213",
      },
    },
    plugins: [],
  }
}
