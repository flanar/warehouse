import { useEffect, useState } from 'react'
import SidebarItem from './SidebarItem'

import useUser from '../../utils/useUser'
import useWindowDimensions from '../../utils/useWindowDimensions'

import Hamburger from './_assets/hamburger.svg'
import Home from './_assets/home.svg'
import ShoppingBag from './_assets/shoppingBag.svg'
import Truck from './_assets/truck.svg'
import Bookmark from './_assets/bookmark.svg'
import UserGroup from './_assets/userGroup.svg'
import Ticket from './_assets/ticket.svg'

const Sidebar = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const { width } = useWindowDimensions()
    const [hideLabel, setHideLabel] = useState(false)

    useEffect(() => {
        if( width < 1080) {
            setHideLabel(true)
        } else if(localStorage.getItem('sidebarMenuHide') === 'true') {
            setHideLabel(true)
        } else {
            setHideLabel(false)
        }
    }, [width])

    const setHideLabelHandler = (state: boolean) => {
        setHideLabel(state)
        localStorage.setItem('sidebarMenuHide', state.toString())
    }

    return (
        <nav className={['transition-all', hideLabel ? 'w-16' : 'w-52 md:w-72'].join(' ')}>
            <div className={['mb-4 h-16 flex items-center text-xl font-bold', hideLabel ? 'px-0 justify-center' : 'px-8 justify-between'].join(' ')}>
                {!hideLabel && <span className='dark:text-green-600'>K&J</span>}<Hamburger className='w-5 cursor-pointer' onClick={() => { setHideLabelHandler(!hideLabel) }} />
            </div>
            <ul className='flex flex-col'>
                <SidebarItem pathname='/' label='Home' icon={<Home />} hideLabel={hideLabel} />
                <SidebarItem pathname='/costumes' label='Costumes' icon={<ShoppingBag />} hideLabel={hideLabel} />
                <SidebarItem pathname='/borrowed-costumes' label='Borrowed' icon={<ShoppingBag />} hideLabel={hideLabel} />
                <SidebarItem pathname='/regions' label='Regions' icon={<Truck />} hideLabel={hideLabel} />
                <SidebarItem pathname='/types' label='Types' icon={<Bookmark />} hideLabel={hideLabel} />
                <SidebarItem pathname='/members' label='Members' icon={<UserGroup />} hideLabel={hideLabel} />
                <SidebarItem pathname='/concerts' label='Concerts' icon={<Ticket />} hideLabel={hideLabel} />
                {user.role_id === 1 && <SidebarItem pathname='/admin-panel' label='Admin Panel' icon={<Home />} hideLabel={hideLabel} />}
            </ul>
        </nav>
    )
}

export default Sidebar
