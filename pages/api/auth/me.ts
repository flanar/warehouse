import withSession from '../../../utils/session'

import db from '../../../db-config'

export default withSession(async (req, res) => {
    try {
        const userId = req.session.get('user')

        if(userId) {
            const user = await db.select('user_id', 'user_login', 'user_name', 'user_surname', 'user_email', 'role_id').from('users').whereRaw('user_id = ?', [userId])

            if(user[0]) {
                res.status(200).json({
                    isLoggedIn: true,
                    ...user[0]
                })
            } else {
                res.status(200).json({
                    isLoggedIn: false
                })
            }
        } else {
            res.status(200).json({
                isLoggedIn: false
            })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
