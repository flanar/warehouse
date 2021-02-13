import { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import useUser from '../../utils/useUser'
import fetchJson from '../../utils/fetchJson'

import Sun from './_assets/sun.svg'
import Moon from './_assets/moon.svg'

const Nav = () => {
    const { user, mutateUser } = useUser()
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('darkMode') === 'true') {
            if(!document.body.classList.contains('dark')) {
                document.body.classList.add('dark')
            }
            setIsDarkMode(true)
        }
    }, [])

    const changeMode = () => {
        localStorage.setItem('darkMode', (!isDarkMode).toString())
        setIsDarkMode(!isDarkMode)
        document.body.classList.toggle('dark')
    }

    const logout = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault()
        await mutateUser(fetchJson('/api/auth/logout'))
        Router.push('/')
    }

    const protectedRoutes = <>
        <li className='p-3'><Link href="/costumes"><a>Costumes</a></Link></li>
        <li className='p-3'><Link href="/regions"><a>Regions</a></Link></li>
        <li className='p-3'><Link href="/types"><a>Types</a></Link></li>
        <li className='p-3'><Link href="/members"><a>Members</a></Link></li>
        <li className='p-3'><Link href="/concerts"><a>Concerts</a></Link></li>
    </>

    return (
        <nav>
            <ul className='flex text-red-300 dark:text-blue-800'>
                <li className='p-3'><Link href="/"><a>Home</a></Link></li>
                {user && user.isLoggedIn && protectedRoutes}
                <li className='p-3 cursor-pointer' onClick={ changeMode } >{isDarkMode ? <Moon width='20px' /> : <Sun width='20px' />}</li>
                {user && user.isLoggedIn && <li className='p-3'><Link href='/api/auth/logout'><a onClick={logout}>Logout</a></Link></li>}
            </ul>
        </nav>
    )
}

export default Nav
