import Layout from '../components/Layout'
import Login from '../components/Login'
import useUser from '../utils/useUser'

const IndexPage = () => {
    const { user } = useUser()
    if(!user || !user.isLoggedIn) return  <Login />

    return (
        <Layout>
            <h1 className='pb-5'>Welcome to warehouse application</h1>
        </Layout>

    )
}

export default IndexPage