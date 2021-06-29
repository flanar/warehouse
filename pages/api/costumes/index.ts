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
                let sortColumn = 'costume_id'
                let sortDirection = 'asc'
                if('costume_tag_sort' in req.query) {
                    sortColumn = 'costume_tag'
                    sortDirection = req.query['costume_tag_sort']
                } else if('region_name_sort' in req.query) {
                    sortColumn = 'region_name'
                    sortDirection = req.query['region_name_sort']
                } else if('type_name_sort' in req.query) {
                    sortColumn = 'type_name'
                    sortDirection = req.query['type_name_sort']
                } else if('costume_gender_sort' in req.query) {
                    sortColumn = 'costume_gender'
                    sortDirection = req.query['costume_gender_sort']
                }

                //filter
                const search = Object.keys(req.query).filter((item: any) => {
                    return item.endsWith('_search')
                }).map((item: any) => {
                    if(item === 'member_search') {
                        return 'member_name || " " || member_surname LIKE "%' + req.query[item] + '%"'
                    } else {
                        return item.slice(0, -7) + ' LIKE "%' + req.query[item] + '%"'
                    }
                }).join(' and ')

                //pagination
                const perPage = 20
                let page = 1
                if('page' in req.query) {
                    page = req.query['page']
                }
                const offset = (page - 1) * perPage

                //sql query
                const [total, rows] = await Promise.all([
                    db.count('* as count').from('costumes').leftJoin('regions', 'regions.region_id', 'costumes.region_id').leftJoin('types', 'types.type_id', 'costumes.type_id').leftJoin('members', 'members.member_id', 'costumes.member_id').whereRaw(search).first(),
                    db.select('costume_id', 'costume_tag', 'costumes.region_id', 'regions.region_name', 'costumes.type_id', 'types.type_name', 'costume_gender', 'costume_description', 'costumes.member_id', 'members.member_name', 'members.member_surname').from('costumes').leftJoin('regions', 'regions.region_id', 'costumes.region_id').leftJoin('types', 'types.type_id', 'costumes.type_id').leftJoin('members', 'members.member_id', 'costumes.member_id').whereRaw(search).orderBy(sortColumn, sortDirection).offset(offset).limit(perPage)
                ])

                const newCostumes = rows ? rows.map((costume: any) => {
                    return {
                        ...costume,
                        costume_gender_name: costume.costume_gender === '0' ? 'M' : costume.costume_gender === '1' ? 'K' : 'B'
                    }
                }) : []

                const pagination: PaginationI = {}
                const count = total && total.count as number || 0
                pagination.total = count
                pagination.lastPage = Math.ceil(count / perPage)
                pagination.rows = newCostumes

                //response
                res.status(200).json(pagination)
                break
            case 'POST':
                const payload = JSON.parse(req.body)
                await db('costumes').insert([{
                    costume_tag: payload.costume_tag,
                    region_id: payload.region_id === '' ? null : payload.region_id,
                    type_id: payload.type_id,
                    costume_gender: payload.costume_gender,
                    costume_description: payload.costume_description,
                    member_id: payload.member_id
                }])
                res.status(201).json({ statusCode: 201, message: 'costume created' })
                break
            case 'PUT':
                const costume = JSON.parse(req.body)
                await db('costumes').where('costume_id', '=', costume.costume_id).update({
                    costume_tag: costume.costume_tag,
                    region_id: costume.region_id === '' ? null : costume.region_id,
                    type_id: costume.type_id,
                    costume_gender: costume.costume_gender,
                    costume_description: costume.costume_description,
                    member_id: costume.member_id === '' ? null : costume.member_id
                })
                res.status(201).json({ statusCode: 201, message: 'costume updated' })
                break
            case 'DELETE':
                const costumeToDelete = JSON.parse(req.body)
                await db('costumes').where('costume_id', '=', costumeToDelete.costume_id).del()
                res.status(200).json({ statusCode: 200, message: 'costume deleted' })
                break
            default:
                res.status(500).json({ statusCode: 404, message: 'Invalid operation' })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
