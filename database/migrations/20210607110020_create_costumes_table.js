
exports.up = function(knex) {
    return knex.schema.createTable('costumes', function(t) {
        t.increments('costume_id').primary()
        t.string('costume_tag').notNullable()
        t.integer('region_id').unsigned()
        t.foreign('region_id').references('regions.region_id')
        t.integer('type_id').unsigned()
        t.foreign('type_id').references('types.type_id')
        t.enu('costume_gender', [0, 1, 2]).notNullable() // 0 - male, 1 - female, 2 - bisexual
        t.unique(['costume_tag', 'region_id', 'type_id', 'costume_gender'])
        t.string('costume_description')
        t.integer('member_id').unsigned()
        t.foreign('member_id').references('members.member_id')
        t.timestamps()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('costumes')
}
