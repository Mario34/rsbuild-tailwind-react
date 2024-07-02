export default {
  rules: [
    {
      test: /\.css$/,
      use: ['postcss-loader'],
      type: 'css',
    },
  ],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
