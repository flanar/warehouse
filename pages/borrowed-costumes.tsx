import useSWR from 'swr'

import useUser from '../utils/useUser'

import Table from '../components/Table'
import Pagination from '../components/Pagination'
import { useEffect, useState } from 'react'

interface HeadItem {
    [key: string]: string | undefined
    name: string
    label: string
    sort?: string | undefined
    search?: string | undefined
}

const Regions = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const [timeoutId, setTimeoutId] = useState<number | undefined>()
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('/api/reports/borrowed-costumes')
    const [head, setHead] = useState<HeadItem[]>([
        {
            name: 'member',
            label: 'Member',
            search: ''
        },
        {
            name: 'costumes',
            label: 'Costumes',
        }
    ])

    useEffect(() => {
        const sort = head.filter((item: any) => {
            return 'sort' in item && item.sort !== ''
        })
        const search = head.filter((item: any) => {
            return 'search' in item && item.search !== ''
        }).map((item: any) => {
            return item.name + '_search=' + item.search
        }).join('&')

        clearInterval(timeoutId)
        const id = setTimeout(() => {
            const sortUrl = sort.length > 0 ? '&' + sort[0].name + '_sort=' + sort[0].sort : ''
            const searchUrl = search !== '' ? '&' + search : ''
            setUrl(`api/reports/borrowed-costumes?page=${page}${sortUrl}${searchUrl}`)
        }, 300) as unknown as number
        setTimeoutId(id)

        return () => clearInterval(timeoutId)
    }, [head, page])

    const { data } = useSWR(url)
    
    const body = data && data.rows && data.rows.map((item: any) => {
        const dataValues = {
            member: item.member,
            costumes: item.costumes ? item.costumes.split(',').map((i: any, index: any) => {
                return <div key={index}>{i}</div>
            }) : ''
        }
        return {
            data: dataValues
        }
    }) || []

    return (
        <div className='p-8'>
            <h1 className='mb-4 font-bold'>Borrowed</h1>
            <Table
                head={head}
                setHead={setHead}
                body={body}
            />
            {data && data.lastPage > 1 && <Pagination lastPage={data && data.lastPage } currentPage={page} setCurrentPage={setPage} />}
        </div>
    )
}

export default Regions