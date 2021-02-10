
exports.seed = function(knex) {
	return knex('users').del()
		.then(function () {
			return knex('users').insert([
        		{user_login: 'admin', user_name: 'admin', user_surname: 'admin', user_email: 'admin@test.com'},
        		{user_login: 'test', user_name: 'test', user_surname: 'test', user_email: 'test@test.com'}
      		])
    	})
}
