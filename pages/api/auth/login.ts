import bcrypt from 'bcrypt'
import withSession from '../../../utils/session'

import db from '../../../db-config'

export default withSession(async (req, res) => {
    try {
        const { login, password } = await req.body

        if(!login || !password) {
            return res.status(400).json({
                message: 'Login i hasło nie mogą być puste.'
            })
        }

        const user = await db.select('user_id', 'user_login', 'user_password', 'user_name', 'user_surname', 'user_email').from('users').whereRaw('user_login = ?', [login])

        if(user[0]) {
            const isPasswordValid = await bcrypt.compare(password, user[0].user_password)
            if(isPasswordValid) {
                req.session.set('user', user[0].user_id)
                await req.session.save()
                res.status(200).json(user[0].user_id)
            } else {
                res.status(401).json({
                    message: 'Nieprawidłowe hasło.'
                })
            }
        } else {
            res.status(401).json({
                message: 'Użytkownik nie istnieje.'
            })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
