import { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import '../styles/global.css'
import fetch from '../utils/fetchJson'
import useUser from '../utils/useUser'

import Layout from '../components/Layout'

const App = ({ Component, pageProps }: AppProps) => {
    const { user } = useUser()

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('darkMode') === 'true') {
            if(!document.body.classList.contains('dark')) {
                document.body.classList.add('dark')
            }
            setDarkMode(true)
        }
    }, [])

    if(!user) {
        return <div>Loading...</div>
    }else if(user && !user.isLoggedIn) {
        return <Component {...pageProps} />

    } else {
        return (
            <SWRConfig
                value= {{
                    fetcher: fetch,
                    onError: err => {
                        console.error(err)
                    }
                }}
            >
                <Layout darkMode={darkMode}>
                    <Component {...pageProps} />
                </Layout>
            </SWRConfig>
        )
    }
}

export default App