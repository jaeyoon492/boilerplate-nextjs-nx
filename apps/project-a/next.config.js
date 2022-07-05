// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    swcMinify: true,
    compiler: {
        experimental: {
            styledComponents: true,
            swcFileReading: false,
            reactRoot: true,
        },
    },

    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
};

module.exports = withNx(nextConfig);
