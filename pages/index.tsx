import Login from '../components/Login'
import useUser from '../utils/useUser'

const IndexPage = () => {
    const { user } = useUser()
    if(!user || !user.isLoggedIn) return  <Login />

    return (
        <div className='flex justify-center'>
            <h1 className='mt-24 p-4 text-center text-3xl'>Witaj w Kate&John's World aplikacji magazynowej.</h1>
        </div>

    )
}

export default IndexPage