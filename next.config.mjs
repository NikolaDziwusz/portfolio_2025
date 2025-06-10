/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['jspdf']
  },
  env: {
    // Only include NEXT_PUBLIC_ prefixed variables for client access
    // Server-only variables should not be listed here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure build-time environment variables are handled correctly
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure client-side bundles don't include server-only modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  }
}

export default nextConfig
