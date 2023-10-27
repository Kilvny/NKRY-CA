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
  future: {

    // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
    webpack5: true,   
  },

  webpack(config) {
    config.resolve.fallback = {

      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,  

      fs: false, // the solution
    };
    
    return config;
  },
};

module.exports = nextConfig;
