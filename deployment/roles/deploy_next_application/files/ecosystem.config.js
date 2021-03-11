const path = `${__dirname}`

let config = {
    apps: [
        {
            name: 'web',
            script: `yarn start`,
            interpreter: '/bin/bash',
            cwd: `${path}/`,
            instances: '1',
            exec_mode: 'cluster',
            max_memory_restart: '256M',
        }
    ]
}

module.exports = config
