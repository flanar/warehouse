
exports.seed = function(knex) {
	return knex('regions').del()
		.then(function () {
			return knex('regions').insert([
        		{region_name: 'Kraków'},
        		{region_name: 'Rzeszów'},
				{region_name: 'Wielkopolska'},
				{region_name: 'Lachy Sądeckie'},
				{region_name: 'Hucuły'},
				{region_name: 'Żywiec'},
      		])
    	})
}
