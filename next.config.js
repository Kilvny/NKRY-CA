/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/nkry-ca",
        destination: "/nkry-ca/dashboard",
        permanent: true,
      },
      {
        source: "/workers-manager",
        destination: "/workers-manager/dashboard",
        permanent: true,
      },
      {
        source: "/nkry-ca/customer-service",
        destination: "/nkry-ca/customer-service/invoices",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
