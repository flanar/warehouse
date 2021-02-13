import useUser from '../utils/useUser'
import Layout from '../components/Layout'

const Concerts = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <Layout>Loading...</Layout>

    return (
        <Layout>
            <h1>Concerts</h1>
        </Layout>
    )
}

export default Concerts