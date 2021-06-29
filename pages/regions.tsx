import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetch from '../utils/fetchJson'

import useUser from '../utils/useUser'

import Table from '../components/Table'
import Pagination from '../components/Pagination'
import Input from '../components/Input'
import Button from '../components/Button'

interface CreateRegionProps {
    mutate: any
    setShow: Function
}

interface EditRegionProps {
    startValue: any
    regionId: number
    mutate: any
}

const CreateRegion = ({ mutate, setShow }: CreateRegionProps) => {
    
    const [value, setValue] = useState('')

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    const createClickHandler = async () => {
        try {
            await fetch('/api/regions', {
                method: 'POST',
                body: JSON.stringify({ region_name: value })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/regions')
        setShow(false)
    }

    return (
        <div className='p-4 flex justify-start items-start'>
            <Input name='name' type='text' value={value} label='Region Name' onChange={onChangeHandler} />
            <div className='mx-2'><Button type='button' onClick={createClickHandler}>Create</Button></div>
        </div>
    )
}

const EditRegion = ({ startValue, regionId, mutate }: EditRegionProps) => {
    
    const [value, setValue] = useState(startValue)

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    const updateClickHandler = async () => {
        try {
            await fetch('/api/regions', {
                method: 'PUT',
                body: JSON.stringify({ region_id: regionId, region_name: value })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/regions')
    }

    const deleteClickHandler = async () => {
        try {
            await fetch('/api/regions', {
                method: 'DELETE',
                body: JSON.stringify({ region_id: regionId })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/regions')
    }

    return (
        <div className='p-4 flex justify-start items-start'>
            <Input name='name' type='text' value={value} label='Region Name' onChange={onChangeHandler} />
            <div className='mx-2'><Button type='button' onClick={updateClickHandler}>Update</Button></div>
            <Button type='button' onClick={deleteClickHandler}>Delete</Button>
        </div>
    )
}

const Regions = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const [timeoutId, setTimeoutId] = useState<number | undefined>()
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('/api/regions')
    const [head, setHead] = useState([
        {
            name: 'region_name',
            label: 'Name',
            sort: '',
            search: ''
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
            setUrl(`api/regions?page=${page}${sortUrl}${searchUrl}`)
        }, 300) as unknown as number
        setTimeoutId(id)

        return () => clearInterval(timeoutId)
    }, [head, page])

    const { data, mutate } = useSWR(url)
    
    const body = data && data.rows && data.rows.map((item: any) => {
        const dataValues = {
            region_name: item.region_name
        }
        return {
            data: dataValues,
            editable: <EditRegion startValue={item.region_name} regionId={item.region_id} mutate={mutate} />
        }
    }) || []

    const [show, setShow] = useState(false)

    return (
        <div className='p-8'>
            <h1 className='mb-4 font-bold'>Regions</h1>
            <Table
                head={head}
                setHead={setHead}
                body={body}
                foot={<CreateRegion mutate={mutate} setShow={setShow} />}
                show={show}
                setShow={setShow}
            />
            {data && data.lastPage > 1 && <Pagination lastPage={data && data.lastPage } currentPage={page} setCurrentPage={setPage} />}
        </div>
    )
}

export default Regions