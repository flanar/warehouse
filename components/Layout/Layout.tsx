import { ReactNode } from 'react'
import Head from 'next/head'

import Nav from '../Navigation'

interface Props {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'Default title' }: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <Nav />
        </header>
        {children}
    </>
)

export default Layout