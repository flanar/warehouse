import useUser from '../utils/useUser'

const Concerts = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    return (
        <h1>Concerts</h1>
    )
}

export default Concerts