import useUser from '../utils/useUser'
import Layout from '../components/Layout'

const Regions = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <Layout>Loading...</Layout>

    return (
        <Layout>
            <h1>Regions</h1>
        </Layout>
    )
}

export default Regions