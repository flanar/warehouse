
exports.up = function(knex) {
    return knex.schema.createTable('members', function(t) {
        t.increments('member_id').primary()
        t.string('member_name').notNullable()
        t.string('member_surname').notNullable()
        t.enu('member_gender', [0, 1]).notNullable() // 0 - male, 1 - female
        t.integer('group_id').unsigned()
        t.foreign('group_id').references('groups.group_id')
        t.timestamps()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('members')
}
