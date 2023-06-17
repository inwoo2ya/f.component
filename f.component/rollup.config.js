const babel = require("@rollup/plugin-babel");
const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");

module.exports = {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "cjs",
    sourcemap: true,
  },

  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        [
          "@babel/preset-react",
          { runtime: "automatic", importSource: "@emotion/react" },
        ],
        "@babel/preset-typescript",
      ],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    typescript({
      exclude: [
        "node_modules",
        "example",
        "src/stories",
        ".storybook",
        "dist",
        "src/__tests__",
        "src/test-utils",
        "**/*.test.tsx",
        "**/*.test.ts",
      ],
    }),
  ],
};
