import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import fetchJson from '../../utils/fetchJson'
import useUser from '../../utils/useUser'

import Sun from './_assets/sun.svg'
import Moon from './_assets/moon.svg'

interface topbarProps {
    darkMode: boolean
}

const Topbar = ({darkMode}: topbarProps) => {
    const { user, mutateUser } = useUser()
    const [isDarkMode, setIsDarkMode] = useState(darkMode)

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

    return (
        <div>
            <ul className='h-16 flex justify-end items-center'>
                <li className='px-4 cursor-pointer' onClick={ changeMode } >{isDarkMode ? <Moon width='20px' /> : <Sun width='20px' />}</li>
                {user && user.isLoggedIn && <li className='pl-4 pr-6'><Link href='/api/auth/logout'><a onClick={logout}>Logout</a></Link></li>}
            </ul>
        </div>
    )
}

export default Topbar
