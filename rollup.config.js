import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: "modules/webview/main.js",
    output: {
      file: "webview.js",
      format: "cjs",
    },
    plugins: [typescript()]
  },
  {
    input: "modules/demo/main.js",
    output: {
      file: "html.js",
      format: "cjs",
    },
    plugins: [typescript()]
  },
  {
    input: "modules/scriptable/main.js",
    output: {
      file: "main.js",
      format: "cjs",
    },
  },
  
];
