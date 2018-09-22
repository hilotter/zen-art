const env = require('./config/env-config');
module.exports = {
  presets: [["next/babel"], ["@zeit/next-typescript/babel"]],
  plugins: [["transform-define", env]]
}
