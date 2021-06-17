import withSession from '../../../utils/session'

import db from '../../../db-config'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        switch (req.method) {
            case 'GET':
                const types = await db.select('member_id', 'member_name', 'member_surname', 'member_gender', 'members.group_id', 'group_name').from('members').leftJoin('groups', 'members.group_id', 'groups.group_id')
                const newTypes = types.map((type: any) => {
                    return {
                        ...type,
                        member_gender_name: type.member_gender === '0' ? 'Mężczyzna' : 'Kobieta'
                    }
                })
                res.status(200).json(newTypes)
                break
            case 'POST':
                const payload = JSON.parse(req.body)
                await db('members').insert([{
                    member_name: payload.member_name,
                    member_surname: payload.member_surname,
                    member_gender: payload.member_gender,
                    group_id: payload.group_id
                }])
                res.status(201).json({ statusCode: 201, message: 'member created' })
                break
            case 'PUT':
                const member = JSON.parse(req.body)
                await db('members').where('member_id', '=', member.member_id).update({
                    member_name: member.member_name,
                    member_surname: member.member_surname,
                    member_gender: member.member_gender,
                    group_id: member.group_id
                })
                res.status(201).json({ statusCode: 201, message: 'member updated' })
                break
            case 'DELETE':
                const memberToDelete = JSON.parse(req.body)
                await db('members').where('member_id', '=', memberToDelete.member_id).del()
                res.status(200).json({ statusCode: 200, message: 'member deleted' })
                break
            default:
                res.status(500).json({ statusCode: 404, message: 'Invalid operation' })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
