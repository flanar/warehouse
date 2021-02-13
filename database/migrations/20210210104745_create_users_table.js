
exports.up = function(knex) {
    return knex.schema.createTable('users', function(t) {
        t.increments('user_id').primary()
        t.string('user_login').unique().notNullable()
        t.string('user_password').notNullable()
        t.string('user_name').notNullable()
        t.string('user_surname').notNullable()
        t.string('user_email').unique().notNullable()
        t.timestamps()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
}
