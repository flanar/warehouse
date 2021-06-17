
exports.seed = function(knex) {
	return knex('roles').del()
		.then(function () {
			return knex('roles').insert([
        		{role_name: 'superadmin'},
        		{role_name: 'admin'},
				{role_name: 'user'},
      		])
    	})
}
