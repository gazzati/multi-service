module.exports = {
  apps: [
    {
      name: "API",
      script: "build/index.js",
      instances: 1,
      listen_timeout: 10000,
      watch: false,
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "tim",
      host: ["gazzati.site"],
      ref: "origin/master",
      repo: "https://github.com/gazzati/avia-tickets",
      key: "deploy.key",
      ref: "origin/master",
      path: "/home/projects/avia-tickets/",
      "pre-deploy-local": "",
      "post-deploy":
        "yarn install --ignore-engines && yarn build && pm2 reload ecosystem.config.js --env production && pm2 save",
      "pre-setup": ""
    }
  }
}
