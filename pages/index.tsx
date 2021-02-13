import Layout from '../components/Layout'
import Login from '../components/Login'

const IndexPage = () => (
    <Layout>
        <h1 className='pb-5'>Welcome to warehouse application</h1>
        <Login />
    </Layout>
)

export default IndexPage