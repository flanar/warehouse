import useUser from '../utils/useUser'

const Types = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    return (
        <div>
            <h1>Types</h1>
        </div>
    )
}

export default Types