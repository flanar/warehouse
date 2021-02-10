import { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../db-config'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        const users = await db.select('user_login', 'user_name', 'user_surname', 'user_email').from('users')
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message })
    }
}
