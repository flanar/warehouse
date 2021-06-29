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
                let sortColumn = 'region_id'
                let sortDirection = 'asc'
                if('region_name_sort' in req.query) {
                    sortColumn = 'region_name'
                    sortDirection = req.query['region_name_sort']
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
                    db.count('* as count').from('regions').whereRaw(search).first(),
                    db.select('region_id', 'region_name').from('regions').whereRaw(search).orderBy(sortColumn, sortDirection).offset(offset).limit(perPage)
                ])

                const pagination: PaginationI = {}
                const count = total && total.count as number || 0
                pagination.total = count
                pagination.lastPage = Math.ceil(count / perPage)
                pagination.rows = rows || []

                //response
                res.status(200).json(pagination)
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
