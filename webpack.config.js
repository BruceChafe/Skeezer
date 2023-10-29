const path = require('path');

module.exports = {
  entry: './docs/scripts/scripts.js', // Entry point for your client-side code
  output: {
    path: path.resolve(__dirname, 'docs/dist'), // Output directory for bundled files
    filename: 'bundle.js', // Name of the bundled file
  },
};
