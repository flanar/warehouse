
exports.seed = function(knex) {
	return knex('types').del()
		.then(function () {
			return knex('types').insert([
        		{type_name: 'Buty'},
        		{type_name: 'Koszula'},
				{type_name: 'Spodnie'},
				{type_name: 'Korale'},
      		])
    	})
}
