import withSession from '../../../utils/session'

import db from '../../../db-config'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        switch (req.method) {
            case 'GET':
                const types = await db.select('type_id', 'type_name').from('types')
                res.status(200).json(types)
                break
            case 'POST':
                const payload = JSON.parse(req.body)
                await db('types').insert([
                    {type_name: payload.type_name}
                ])
                res.status(201).json({ statusCode: 201, message: 'type created' })
                break
            case 'PUT':
                const type = JSON.parse(req.body)
                await db('types').where('type_id', '=', type.type_id).update({
                    type_name: type.type_name
                })
                res.status(201).json({ statusCode: 201, message: 'type created' })
                break
            case 'DELETE':
                const typeForDelete = JSON.parse(req.body)
                await db('types').where('type_id', '=', typeForDelete.type_id).del()
                res.status(200).json({ statusCode: 200, message: 'type deleted' })
                break
            default:
                res.status(500).json({ statusCode: 404, message: 'Invalid operation' })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
