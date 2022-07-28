import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
  contentBase: ["./../dist"],
  host: "0.0.0.0",
  port: 5000,
  allowCrossOrigin: true,
  headers: {
      "Access-Control-Allow-Origin": "*",
  },
};

export default {
  input: "src/main.ts",
  output: {
    file: "../dist/fold-entity-row.js",
    format: "es",
  },
  plugins: [
    nodeResolve(),
    json(),
    typescript({
        declaration: false,
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    ...(dev ? [serve(serveOptions)] : [terser()]),
  ],
};
