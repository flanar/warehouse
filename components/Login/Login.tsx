import { useState, SyntheticEvent } from 'react'
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
            <form onSubmit={submitHandler}>
                <input className='bg-gray-200' type='text' name='login' placeholder='login' />
                <input className='bg-gray-200' type='password' name='password' placeholder='password' />
                <button type='submit'>Login</button>
            </form>
            {error && <div>{error}</div>}
        </>
    )
}

export default Login