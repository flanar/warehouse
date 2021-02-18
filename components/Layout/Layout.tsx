import { ReactNode } from 'react'
import Head from 'next/head'

import { Sidebar, Topbar } from '../Navigation'

interface Props {
    children?: ReactNode
    title?: string,
    darkMode: boolean
}

const Layout = ({ children, title = 'Kate&John', darkMode }: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='w-full h-screen flex'>
            <section className='text-white bg-teal-900 shadow-xl'>
                <Sidebar />
            </section>
            <main className='w-full overflow-x-auto bg-coolGray-100'>
                <header className='sticky top-0 bg-white shadow-lg'>
                    <Topbar darkMode={darkMode}/>
                </header>
                {children}
            </main>
        </div>
    </>
)

export default Layout