
exports.seed = function(knex) {
	return knex('users').del()
		.then(function () {
			return knex('users').insert([
        		{user_login: 'admin', user_password: '$2b$12$NCwhp6rDHYkZ5awpcKZEW.vOH1nofvstjL7udp7V1enp.avOZlmU6', user_name: 'admin', user_surname: 'admin', user_email: 'piotrsuchorab93@gmail.com'},
        		{user_login: 'kate', user_password: '$2b$12$x/iW6W92qBlH2kivXp0ECuWq5OcbAzQN/KX/QwgaW3Gk2xKyjX2fK', user_name: 'Kasia', user_surname: 'Kalińska', user_email: 'kalinska.kasia@zpit.pw.edu.pl'},
				{user_login: 'john', user_password: '$2b$12$QItPYBqLf20dAwesASUxdutL8Wqaq9M1BKqWZ2V33kV1dntogkyXW', user_name: 'Janusz', user_surname: 'Kaspryk', user_email: 'janusz.kaspryk@zpit.pw.edu.pl'}
      		])
    	})
}
