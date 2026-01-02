
/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  
  theme: {
    extend: {
              
      listStyleType:{
        checkmark:`url("/src/assets/images/check.webp")`,
        
      },

      fontFamily:{
        poppins : ["Poppins"],
        noto:["Noto Sans", "serif"],
        inter:["Inter"]

      }
    },
  },
  plugins: [],
}

