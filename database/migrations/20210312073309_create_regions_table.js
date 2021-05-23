
exports.up = function(knex) {
    return knex.schema.createTable('regions', function(t) {
        t.increments('region_id').primary()
        t.string('region_name').unique().notNullable()
        t.timestamps()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('regions')
}
