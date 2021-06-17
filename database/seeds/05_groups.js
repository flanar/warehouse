
exports.seed = function(knex) {
	return knex('groups').del()
		.then(function () {
			return knex('groups').insert([
        		{group_name: 'Kapela'},
        		{group_name: 'Taneczna'},
				{group_name: 'Wokalna'},
				{group_name: 'Mieszana'},
				{group_name: 'Oldboys'},
				{group_name: 'Dinozaury'},
      		])
    	})
}
