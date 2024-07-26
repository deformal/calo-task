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
        UPLASH_APPLICATION_ID: '637382',
        UPLASH_ACCESS_KEY: 'mT7cPGLbbA49efXQZNrdsq86EUavMq2j-nCDFXQS_pU',
        UPLASH_SECRET_KEY: 'ROhN7C8cJ2xNE-SQMnfbT0sgufaxgzGpMb3UgvqhVfY',
      },
    },
  ],
};
