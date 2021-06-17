import withSession from '../../../utils/session'

import db from '../../../db-config'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        switch (req.method) {
            case 'GET':
                const regions = await db.select('region_id', 'region_name').from('regions')
                res.status(200).json(regions)
                break
            case 'POST':
                const payload = JSON.parse(req.body)
                await db('regions').insert([
                    {region_name: payload.region_name}
                ])
                res.status(201).json({ statusCode: 201, message: 'Region created' })
                break
            case 'PUT':
                const region = JSON.parse(req.body)
                await db('regions').where('region_id', '=', region.region_id).update({
                    region_name: region.region_name
                })
                res.status(201).json({ statusCode: 201, message: 'Region created' })
                break
            case 'DELETE':
                const regionForDelete = JSON.parse(req.body)
                await db('regions').where('region_id', '=', regionForDelete.region_id).del()
                res.status(200).json({ statusCode: 200, message: 'Region deleted' })
                break
            default:
                res.status(500).json({ statusCode: 404, message: 'Invalid operation' })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
