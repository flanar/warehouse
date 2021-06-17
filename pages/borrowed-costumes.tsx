import useSWR from 'swr'

import useUser from '../utils/useUser'

import Table from '../components/Table'

const Regions = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const { data } = useSWR('/api/reports/borrowed-costumes')
    
    const head = ['Member', 'Costumes']

    const body = data && Array.isArray(data) && data.map((item: any) => {
        const dataValues = {
            member: item.member,
            costumes: item.costumes.split(',').map((i: any) => {
                return <div>{i}</div>
            })
        }
        return {
            data: dataValues
        }
    }) || []

    return (
        <div className='p-8'>
            <h1 className='mb-4 font-bold'>Regions</h1>
            <Table
                head={head}
                body={body}
            />
        </div>
    )
}

export default Regions