module.exports = {
    apps: [{
        name: 'PersonalLibraryApi',
        script: 'src/index.ts',
        interpreter: 'ts-node',
        args: ['--no-daemon'],
        watch: [
            'src'
        ],
        ignore_watch: [
            "node_modules",
            "tests"
        ],
        env: {
            NODE_ENV: 'production'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],

    deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};
