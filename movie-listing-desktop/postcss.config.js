module.exports = {
    plugins: [
      require('autoprefixer'),
      require('@fullhuman/postcss-purgecss')({
        content: [
          './**/*.html',
          './**/*.jsx'
        ]
      }),
      require('cssnano')({
        preset: 'default'
      }),
    ],
  }