const whitelists = require("./whitelists");
const { withSentryConfig } = require("@sentry/nextjs");

const liveNet = {
  NEXT_PUBLIC_PROVIDER_URL: "https://polygon-rpc.com",
  NEXT_PUBLIC_TOKEN_ADDRESS: "0x229b1b6c23ff8953d663c4cbb519717e323a0a84",
  NEXT_PUBLIC_PAIR_ADDRESS: "0xa022ae9cfadefd62d70b510c27dc3d5db67ca43b",

  // Staking
  NEXT_PUBLIC_TIERED_STAKING_ADDRESS:
    "0x89787d87102A38851B02dDE390C3BdAa51575E25",

  // Owner:
  // IDO_ADDER:
  LEVEL_MANAGER_ADDRESS: "0x917Bf2B2943d53fd3C93259B78B88954229748Af",
  TREASURY: "0xa03f03170CD2F86239ea9fc57A0276573c2A708D",
};

const testNet = {
  NEXT_PUBLIC_PROVIDER_URL: "https://data-seed-prebsc-1-s1.binance.org:8545",
  // https://testnet.bscscan.com/address/ #contracts
  NEXT_PUBLIC_TOKEN_ADDRESS: "",
  NEXT_PUBLIC_PAIR_ADDRESS: "",

  // Staking
  NEXT_PUBLIC_STAKING_ADDRESS: "",
  NEXT_PUBLIC_STAKING_TPAD_ADDRESS: "",

  // Tiered staking
  LEVEL_MANAGER_ADDRESS: "",
  NEXT_PUBLIC_TIERED_STAKING_ADDRESS: "",
};

const networkConfig =
  process.env.NEXT_PUBLIC_NETWORK === "live" ? liveNet : testNet;

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const moduleExports = {
  outputFileTracing: false,
  webpack: (config) => {
    if (process.env.NODE_ENV !== "development") {
      return config;
    }
    const newConfig = {
      ...config,
      // To use together with "npx relative-deps watch" for live reload on linked package build
      snapshot: {
        managedPaths: [],
        immutablePaths: [],
      },
      watchOptions: {
        aggregateTimeout: 5,
        ignored: ["**/.git/**", "**/.next/**", "**/.#*"],
      },
    };

    return newConfig;
  },
  env: {
    ...networkConfig,
  },
  async redirects() {
    const whitelistRedirects = Object.keys(whitelists).map((id) => ({
      source: `/whitelist/${id}`,
      destination: whitelists[id],
      permanent: true,
    }));

    return [...whitelistRedirects];
  },
};

// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
module.exports = moduleExports;
