const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
// - ip : 34.64.93.95
// - domain : kdt-sw-5-2-team05.elicecoding.com
