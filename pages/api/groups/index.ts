import withSession from '../../../utils/session'

import db from '../../../db-config'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        switch (req.method) {
            case 'GET':
                const types = await db.select('group_id', 'group_name').from('groups')
                res.status(200).json(types)
                break
            default:
                res.status(500).json({ statusCode: 404, message: 'Invalid operation' })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
