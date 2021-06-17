import useUser from '../utils/useUser'

const Concerts = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    return (
        <h1 className='p-8 font-bold'>Coming soon!</h1>
    )
}

export default Concerts