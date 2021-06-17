
exports.up = function(knex) {
    return knex.schema.createTable('types', function(t) {
        t.increments('type_id').primary()
        t.string('type_name').unique().notNullable()
        t.timestamps()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('types')
}
