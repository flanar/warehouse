import Link from 'next/link'

const Nav = () => (
    <nav>
        <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/costumes"><a>Costumes</a></Link></li>
            <li><Link href="/regions"><a>Regions</a></Link></li>
            <li><Link href="/types"><a>Types</a></Link></li>
            <li><Link href="/members"><a>Members</a></Link></li>
            <li><Link href="/concerts"><a>Concerts</a></Link></li>
        </ul>
    </nav>
)

export default Nav
