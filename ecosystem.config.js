module.exports = {
  apps: [
    {
      name: "auth",
      script: "services/auth/src/index.js",
      env: {
        PORT: 3000,
        CORS_ORIGINS: "*",
        MYSQL_CONN: "mysql://user:password@localhost:3306/auth_db",
        REDIS_HOST: "127.0.0.1:6379"
      }
    },
    {
      name: "catalog",
      script: "services/catalog/src/index.js",
      env: {
        PORT: 3001,
        CORS_ORIGINS: "*",
        MYSQL_CONN: "mysql://user:password@localhost:3306/catalog_db",
        REDIS_HOST: "127.0.0.1:6379"
      }
    },
    {
      name: "offers",
      script: "services/offers/src/index.js",
      env: {
        PORT: 3002,
        CORS_ORIGINS: "*",
        MYSQL_CONN: "mysql://user:password@localhost:3306/offers_db",
        REDIS_HOST: "127.0.0.1:6379"
      }
    },
    {
      name: "media",
      script: "services/media/src/index.js",
      env: {
        PORT: 3003,
        CORS_ORIGINS: "*",
        MYSQL_CONN: "mysql://user:password@localhost:3306/media_db",
        REDIS_HOST: "127.0.0.1:6379"
      }
    },
    {
      name: "notifications",
      script: "services/notifications/src/index.js",
      env: {
        PORT: 3004,
        CORS_ORIGINS: "*",
        MYSQL_CONN: "mysql://user:password@localhost:3306/notifications_db",
        REDIS_HOST: "127.0.0.1:6379"
      }
    },
    {
      name: "vehicles",
      script: "services/vehicles/src/index.js",
      env: {
        PORT: 3005,
        CORS_ORIGINS: "*",
        MYSQL_CONN: "mysql://user:password@localhost:3306/vehicles_db",
        REDIS_HOST: "127.0.0.1:6379"
      }
    }
  ]
};
