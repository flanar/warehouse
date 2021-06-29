import withSession from '../../../utils/session'

import db from '../../../db-config'
import { PaginationI } from '../../../interfaces'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        switch (req.method) {
            case 'GET':
                //sort
                let sortColumn = 'member_id'
                let sortDirection = 'asc'
                if('member_name_sort' in req.query) {
                    sortColumn = 'member_name'
                    sortDirection = req.query['member_name_sort']
                } else if('member_surname_sort' in req.query) {
                    sortColumn = 'member_surname'
                    sortDirection = req.query['member_surname_sort']
                } else if('member_gender_sort' in req.query) {
                    sortColumn = 'member_gender'
                    sortDirection = req.query['member_gender_sort']
                } else if('group_name_sort' in req.query) {
                    sortColumn = 'group_name'
                    sortDirection = req.query['group_name_sort']
                }

                //filter
                const search = Object.keys(req.query).filter((item: any) => {
                    return item.endsWith('_search')
                }).map((item: any) => {
                    return item.slice(0, -7) + ' LIKE "%' + req.query[item] + '%"'
                }).join(' and ')

                //pagination
                let perPage = 20
                let page = 1
                if('page' in req.query) {
                    page = req.query['page']
                } else {
                    perPage = 1000
                }
                const offset = (page - 1) * perPage

                //sql query
                const [total, rows] = await Promise.all([
                    db.count('* as count').from('members').leftJoin('groups', 'members.group_id', 'groups.group_id').whereRaw(search).first(),
                    db.select('member_id', 'member_name', 'member_surname', 'member_gender', 'members.group_id', 'group_name').from('members').leftJoin('groups', 'members.group_id', 'groups.group_id').whereRaw(search).orderBy(sortColumn, sortDirection).offset(offset).limit(perPage)
                ])

                const newTypes = rows ? rows.map((type: any) => {
                    return {
                        ...type,
                        member_gender_name: type.member_gender === '0' ? 'Mężczyzna' : 'Kobieta'
                    }
                }) : []

                const pagination: PaginationI = {}
                const count = total && total.count as number || 0
                pagination.total = count
                pagination.lastPage = Math.ceil(count / perPage)
                pagination.rows = newTypes

                //response
                res.status(200).json(pagination)
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
