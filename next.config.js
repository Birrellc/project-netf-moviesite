const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
]); // pass modules that need to be transpiled
// this fixes exporting issue from stripe/firestore package
// https://lightrun.com/answers/stripe-stripe-firebase-extensions-firestore-stripe-payments-v004-has-error--syntaxerror-unexpected-token-export

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['rb.gy', 'image.tmdb.org'],
  },
});
