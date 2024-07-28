const { composePlugins, withNx } = require('@nx/next');
const nextConfig = {
  nx: {
    svgr: false,
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
