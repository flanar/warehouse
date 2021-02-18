import useUser from '../utils/useUser'

const Members = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    return (
        <div>
            <h1>Members</h1>
        </div>
    )
}

export default Members