import { useEffect, useState } from 'react'
import Link from 'next/link'

import Sun from './_assets/sun.svg'
import Moon from './_assets/moon.svg'

const Nav = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('darkMode') === 'true') {
            document.body.classList.toggle('dark')
            setIsDarkMode(true)
        }
    }, [])

    const changeMode = () => {
        localStorage.setItem('darkMode', (!isDarkMode).toString())
        setIsDarkMode(!isDarkMode)
        document.body.classList.toggle('dark')
    }

    return (
        <nav>
            <ul>
                <li className='text-red-300 dark:text-blue-800'><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/costumes"><a>Costumes</a></Link></li>
                <li><Link href="/regions"><a>Regions</a></Link></li>
                <li><Link href="/types"><a>Types</a></Link></li>
                <li><Link href="/members"><a>Members</a></Link></li>
                <li><Link href="/concerts"><a>Concerts</a></Link></li>
                <li className='cursor-pointer' onClick={ changeMode } >{isDarkMode ? <Moon width='20px' /> : <Sun width='20px' />}</li>
            </ul>
        </nav>
    )
}

export default Nav
