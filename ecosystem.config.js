module.exports = {
  apps: [
    {
      name: "auth",
      script: "services/auth/src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      error_file: "/root/.pm2/logs/auth-error.log",
      out_file: "/root/.pm2/logs/auth-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        PORT: 3000,
        CORS_ORIGINS: "*",
        DB_CONN: "postgresql://appuser:ChangeMe!@localhost:5432/aba_backend",
        JWT_SECRET: "TuSecretoMuySeguro",
        REDIS_HOST: "10.20.20.6",
        REDIS_PORT: 6379,
        REDIS_PASSWORD: "ChangeMe!"
      }
    },
    {
      name: "catalog",
      script: "services/catalog/src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      error_file: "/root/.pm2/logs/catalog-error.log",
      out_file: "/root/.pm2/logs/catalog-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        PORT: 3001,
        CORS_ORIGINS: "*",
        DB_CONN: "postgresql://appuser:ChangeMe!@localhost:5432/aba_backend",
        JWT_SECRET: "TuSecretoMuySeguro",
        REDIS_HOST: "10.20.20.6",
        REDIS_PORT: 6379,
        REDIS_PASSWORD: "ChangeMe!"
      }
    },
    {
      name: "offers",
      script: "services/offers/src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      error_file: "/root/.pm2/logs/offers-error.log",
      out_file: "/root/.pm2/logs/offers-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        PORT: 3002,
        CORS_ORIGINS: "*",
        DB_CONN: "postgresql://appuser:ChangeMe!@localhost:5432/aba_backend",
        JWT_SECRET: "TuSecretoMuySeguro",
        REDIS_HOST: "10.20.20.6",
        REDIS_PORT: 6379,
        REDIS_PASSWORD: "ChangeMe!"
      }
    },
    {
      name: "media",
      script: "services/media/src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      error_file: "/root/.pm2/logs/media-error.log",
      out_file: "/root/.pm2/logs/media-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        PORT: 3003,
        CORS_ORIGINS: "*",
        DB_CONN: "postgresql://appuser:ChangeMe!@localhost:5432/aba_backend",
        JWT_SECRET: "TuSecretoMuySeguro",
        REDIS_HOST: "10.20.20.6",
        REDIS_PORT: 6379,
        REDIS_PASSWORD: "ChangeMe!"
      }
    },
    {
      name: "notifications",
      script: "services/notifications/src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      error_file: "/root/.pm2/logs/notifications-error.log",
      out_file: "/root/.pm2/logs/notifications-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        PORT: 3004,
        CORS_ORIGINS: "*",
        DB_CONN: "postgresql://appuser:ChangeMe!@localhost:5432/aba_backend",
        JWT_SECRET: "TuSecretoMuySeguro",
        REDIS_HOST: "10.20.20.6",
        REDIS_PORT: 6379,
        REDIS_PASSWORD: "ChangeMe!"
      }
    },
    {
      name: "vehicles",
      script: "services/vehicles/src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      error_file: "/root/.pm2/logs/vehicles-error.log",
      out_file: "/root/.pm2/logs/vehicles-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        PORT: 3005,
        CORS_ORIGINS: "*",
        DB_CONN: "postgresql://appuser:ChangeMe!@localhost:5432/aba_backend",
        JWT_SECRET: "TuSecretoMuySeguro",
        REDIS_HOST: "10.20.20.6",
        REDIS_PORT: 6379,
        REDIS_PASSWORD: "ChangeMe!"
      }
    }
  ]
};
