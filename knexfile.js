module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./database/dev.sqlite3"
        },
        migrations: {
            directory: './database/migrations',
            tableName: 'migrations'
        },
        seeds: {
            directory: './database/seeds'
        },
        useNullAsDefault: true
    },
    production: {
        client: "sqlite3",
        connection: {
            filename: "./database/dev.sqlite3"
        },
        migrations: {
            directory: './database/migrations',
            tableName: 'migrations'
        },
        seeds: {
            directory: './database/seeds'
        },
        useNullAsDefault: true
    }
}
