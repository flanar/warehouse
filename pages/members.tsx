import useUser from '../utils/useUser'
import Layout from '../components/Layout'

const Members = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <Layout>Loading...</Layout>

    return (
        <Layout>
            <h1>Members</h1>
        </Layout>
    )
}

export default Members