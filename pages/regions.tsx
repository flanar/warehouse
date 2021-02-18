import useUser from '../utils/useUser'

const Regions = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    return (
        <div>
            <h1>Regions</h1>
        </div>
    )
}

export default Regions