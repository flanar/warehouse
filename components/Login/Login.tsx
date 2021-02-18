import { useState, SyntheticEvent } from 'react'
import Head from 'next/head'
import userUser from '../../utils/useUser'
import fetchJson from '../../utils/fetchJson'

const Login = () => {
    const { mutateUser } = userUser()
    const [error, setError] = useState(null)

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault()

        const currentTarget = e.currentTarget as typeof e.currentTarget & {
            login: { value: string };
            password: { value: string };
        }

        const body = {
            login: currentTarget.login.value,
            password: currentTarget.password.value
        }
        
        try {
            await mutateUser(
                fetchJson('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
            )
            setError(null)
        } catch (error) {
            console.error('An unexpected error happened: ', error)
            setError(error.data.message)
        }
    }

    return (
        <>
            <Head>
                <title>Kate&John</title>
            </Head>
            <div className='w-full h-screen flex justify-center items-center'>
                <form className='h-1/2 flex flex-col justify-between items-center text-white' onSubmit={submitHandler}>
                    <h1 className='my-2 text-3xl tracking-widest'>Logowanie</h1>
                    <h2 className='my-2'>Kate&John&apos;s World <span className='text-coolGray-400'>aplikacja magazynowa</span></h2>
                    <input className='my-2 px-8 py-4 w-96 block rounded-3xl bg-white bg-opacity-20 placeholder-white outline-none' type='text' name='login' placeholder='Login' />
                    <input className='my-2 px-8 py-4 w-96 block rounded-3xl bg-white bg-opacity-20 placeholder-white outline-none' type='password' name='password' placeholder='Hasło' />
                    {error && <div className='my-2 text-rose-400'>{error}</div>}
                    <button className='my-2 px-8 py-4 w-full rounded-3xl bg-green-500 hover:bg-green-600 outline-none focus:outline-none' type='submit'>Zaloguj się</button>
                </form>
            </div>
            <style jsx global>{`
                body {
                    background: #134E4A;
                }
            `}</style>
        </>
        
    )
}

export default Login