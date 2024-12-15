const { createMonolithicReleaseConfig } = require("@zhumeisong/semantic-release-config");

const srcRoot = `./`;
const pkgRoot = `./`;

module.exports = createMonolithicReleaseConfig({
  srcRoot,
  pkgRoot
});
