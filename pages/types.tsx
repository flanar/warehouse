import useUser from '../utils/useUser'
import Layout from '../components/Layout'

const Types = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <Layout>Loading...</Layout>

    return (
        <Layout>
            <h1>Types</h1>
        </Layout>
    )
}

export default Types