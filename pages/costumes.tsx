import useUser from '../utils/useUser'

const Costumes = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    return (
        <div>
            <h1>Costumes</h1>
        </div>
    )
}

export default Costumes