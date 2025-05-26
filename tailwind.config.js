/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '390px',   // Màn hình từ 390px
        'sm': '480px',   // Màn hình từ 480px (vừa lớn hơn sm mặc định)
        'md': '640px',   // Màn hình từ 640px (giống kích thước nhỏ cho tablet)
        'lg': '768px',   // Màn hình từ 768px (dùng cho màn hình tablet trở lên)
        'xl': '1024px',  // Màn hình từ 1024px (dùng cho màn hình laptop)
        '2xl': '1280px', // Màn hình từ 1280px (dành cho màn hình lớn hơn)
      },
    },
  },
  plugins: [],
}

