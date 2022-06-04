const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/v1/payouts", {
      target: "https://api.razorpay.com",
      changeOrigin: true,
    })
  );
};
