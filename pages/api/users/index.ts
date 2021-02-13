import withSession from '../../../utils/session'

import db from '../../../db-config'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        const users = await db.select('user_login', 'user_name', 'user_surname', 'user_email').from('users')
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
