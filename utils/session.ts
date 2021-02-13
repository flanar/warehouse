import { Handler, withIronSession } from 'next-iron-session'

export default function withSession(handler: Handler) {
    return withIronSession(handler, {
        password: process.env.SECRET_COOKIE_PASSWORD || 'SECRET_COOKIE_PASSWORD_MIN_32_CHARACTERS',
        cookieName: 'kateandjohnworld.pl',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production' ? true : false
        }
    })
}