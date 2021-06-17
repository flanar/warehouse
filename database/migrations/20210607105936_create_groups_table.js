
exports.up = function(knex) {
    return knex.schema.createTable('groups', function(t) {
        t.increments('group_id').primary()
        t.string('group_name').unique().notNullable()
        t.timestamps()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('groups')
}
