import withSession from '../../../../utils/session'

import db from '../../../../db-config'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        switch (req.method) {
            case 'GET':
                const costumes = await db.select(db.raw('member_name || " " || member_surname as member'), db.raw('GROUP_CONCAT(types.type_name || " " || regions.region_name || " " || costume_tag) as costumes')).from('costumes').leftJoin('members', 'members.member_id', 'costumes.member_id').leftJoin('types','types.type_id', 'costumes.type_id').leftJoin('regions', 'regions.region_id', 'costumes.region_id').whereRaw('costumes.member_id IS NOT NULL').groupBy('costumes.member_id')
                res.status(200).json(costumes)
                break
            default:
                res.status(500).json({ statusCode: 404, message: 'Invalid operation' })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
