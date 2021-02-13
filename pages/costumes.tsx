import useUser from '../utils/useUser'
import Layout from '../components/Layout'

const Costumes = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <Layout>Loading...</Layout>

    return (
        <Layout>
            <h1>Costumes</h1>
        </Layout>
    )
}

export default Costumes