module.exports = {
  apps: [
    {
      name: "ABA-auth",
      cwd: "/home/deploy/ABA-backend/services/auth",
      script: "server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "ABA-vehicles",
      cwd: "/home/deploy/ABA-backend/services/vehicles",
      script: "server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "ABA-catalog",
      cwd: "/home/deploy/ABA-backend/services/catalog",
      script: "server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "ABA-offers",
      cwd: "/home/deploy/ABA-backend/services/offers",
      script: "server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "ABA-media",
      cwd: "/home/deploy/ABA-backend/services/media",
      script: "server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production"
      }
    },
    {
      name: "ABA-notifications",
      cwd: "/home/deploy/ABA-backend/services/notifications",
      script: "server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
