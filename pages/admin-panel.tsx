import Router from 'next/router'
import useUser from '../utils/useUser'

const AdminPanel = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>
    if(user.role_id !== 1) Router.push('/')

    return (
        <div>
            <h1>admin panel</h1>
        </div>
    )
}

export default AdminPanel