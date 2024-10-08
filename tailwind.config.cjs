/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',   
    
  ],
  theme: {    
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
     '2xl': 32,
     '4xl': 64,
    },
    colors: {
      write: '#ffffff',      
      yelow: '#FFFF00',
      gost: '#F8F8FF',
      orange: '#FFA500',
      green:{
        300: '#bef264',
        500: '#228b22',
      },
      cyan: {
        900: '#2e3668',
        700: '#435b94',
        600: '#5980C1',
        300: '#ADD8E6',
      },
      red:{
        900: '#e42129',
        600: '#f34336',
        500: '#ef4444',
        400: '#f87171'
      }    
    },
  extend: {
    fontFamily: {
      sans : 'Inter, sans-serif' 
    },
  },
  plugins: [],
}
}