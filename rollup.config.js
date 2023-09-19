export default [
  {
    input: "modules/webview/main.js",
    output: {
      file: "webview.js",
      format: "cjs",
    },
  },
  {
    input: "modules/scriptable/main.js",
    output: {
      file: "main.js",
      format: "cjs",
    },
  },
];
