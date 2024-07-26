module.exports = {
  apps: [
    {
      name: 'calo-task',
      watch: true,
      instances: 4,
      exec_mode: 'cluster',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
