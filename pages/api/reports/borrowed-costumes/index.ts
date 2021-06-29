import withSession from '../../../../utils/session'

import db from '../../../../db-config'
import { PaginationI } from '../../../../interfaces'

export default withSession(async (req, res) => {
    const user = req.session.get('user')
    if(!user) return res.status(400).json({ message: 'You are not authorized.' })

    try {
        switch (req.method) {
            case 'GET':
                //sort
                let sortColumn = 'costumes.member_id'
                let sortDirection = 'asc'

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
                    db.count('* as count').from('costumes').leftJoin('members', 'members.member_id', 'costumes.member_id').leftJoin('types','types.type_id', 'costumes.type_id').leftJoin('regions', 'regions.region_id', 'costumes.region_id').whereRaw('costumes.member_id IS NOT NULL').groupBy('costumes.member_id').whereRaw(search).first(),
                    db.select(db.raw('member_name || " " || member_surname as member'), db.raw('GROUP_CONCAT(types.type_name || " " || COALESCE(regions.region_name || " ", "") || costume_tag) as costumes')).from('costumes').leftJoin('members', 'members.member_id', 'costumes.member_id').leftJoin('types','types.type_id', 'costumes.type_id').leftJoin('regions', 'regions.region_id', 'costumes.region_id').whereRaw('costumes.member_id IS NOT NULL').groupBy('costumes.member_id').whereRaw(search).orderBy(sortColumn, sortDirection).offset(offset).limit(perPage)
                ])

                const pagination: PaginationI = {}
                const count = total && total.count as number || 0
                pagination.total = count
                pagination.lastPage = Math.ceil(count / perPage)
                pagination.rows = rows || []

                //response
                res.status(200).json(pagination)
                break



                // const costumes = await db.select(db.raw('member_name || " " || member_surname as member'), db.raw('GROUP_CONCAT(types.type_name || " " || COALESCE(regions.region_name || " ", "") || costume_tag) as costumes')).from('costumes').leftJoin('members', 'members.member_id', 'costumes.member_id').leftJoin('types','types.type_id', 'costumes.type_id').leftJoin('regions', 'regions.region_id', 'costumes.region_id').whereRaw('costumes.member_id IS NOT NULL').groupBy('costumes.member_id')
                // res.status(200).json(costumes)
                // break
            default:
                res.status(500).json({ statusCode: 404, message: 'Invalid operation' })
        }
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
})
