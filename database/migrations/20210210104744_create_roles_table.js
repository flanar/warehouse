
exports.up = function(knex) {
    return knex.schema.createTable('roles', function(t) {
        t.increments('role_id').primary()
        t.string('role_name').unique().notNullable()
        t.timestamps()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
}
