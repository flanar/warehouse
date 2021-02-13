import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

interface useUserInterface {
    redirectTo?: string
    redirectIfFound?: boolean
}

export default function useUser({redirectTo = undefined, redirectIfFound = false}: useUserInterface = {}) {
    const { data: user, mutate: mutateUser } = useSWR('/api/auth/me')

    useEffect(() => {
        if(!redirectTo || !user) return

        if(
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo)
        }
    }, [user, redirectTo, redirectIfFound])

    return { user, mutateUser }
}