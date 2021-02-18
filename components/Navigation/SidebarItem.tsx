import Link from 'next/link'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'

interface SidebarItemProps {
    pathname: string
    label: string
    icon: ReactNode
    hideLabel: boolean
}

const SidebarItem = ({ pathname, label, icon, hideLabel }: SidebarItemProps) => {
    const router = useRouter()

    return (
        <li className={['hover:bg-green-600', router.pathname === pathname && 'bg-green-600'].join(' ')}>
            <Link href={pathname}>
                <a className={['block p-4 w-full flex items-center', hideLabel && 'justify-center'].join(' ')}>
                    <div className='w-6'>{icon}</div><div className={['ml-4', hideLabel && 'hidden'].join(' ')}>{label}</div>
                </a>
            </Link>
        </li>
    )
}

export default SidebarItem
