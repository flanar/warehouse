import { SWRConfig } from 'swr'
import fetch from '../utils/fetchJson'

import type { AppProps } from 'next/app'

import '../styles/global.css'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <SWRConfig
            value= {{
                fetcher: fetch,
                onError: err => {
                    console.error(err)
                }
            }}
        >
            <Component {...pageProps} />
        </SWRConfig>
    )
}

export default App