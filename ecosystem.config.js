module.exports = {
  apps: [{
    name: "api-olhonocarro-production",
    script: "./server.js",
    watch: true,
    instances: 0,
    exec_mode: "cluster",
    env: {
      "NODE_ENV": "production"
    },
    env_development : {
      "NODE_ENV": "development"
    },
    max_memory_restart: "20G"
  }]
}
