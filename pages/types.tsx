import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetch from '../utils/fetchJson'

import useUser from '../utils/useUser'

import Table from '../components/Table'
import Pagination from '../components/Pagination'
import Formula from '../components/Formula'
import Input from '../components/Input'
import Button from '../components/Button'

interface CreateTypeProps {
    mutate: any
    setShow: Function
}

interface EditTypeProps {
    startValue: any
    typeId: number
    mutate: any
}

const CreateType = ({ mutate, setShow }: CreateTypeProps) => {
    
    const [value, setValue] = useState('')

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    const createClickHandler = async () => {
        try {
            await fetch('/api/types', {
                method: 'POST',
                body: JSON.stringify({ type_name: value })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/types')
        setShow(false)
    }

    return (
        <Formula>
            <Input name='name' type='text' value={value} label='Type Name' onChange={onChangeHandler} />
            <Button type='button' onClick={createClickHandler}>Create</Button>
        </Formula>
    )
}

const EditType = ({ startValue, typeId, mutate }: EditTypeProps) => {
    
    const [value, setValue] = useState(startValue)

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    const updateClickHandler = async () => {
        try {
            await fetch('/api/types', {
                method: 'PUT',
                body: JSON.stringify({ type_id: typeId, type_name: value })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/types')
    }

    const deleteClickHandler = async () => {
        try {
            await fetch('/api/types', {
                method: 'DELETE',
                body: JSON.stringify({ type_id: typeId })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/types')
    }

    return (
        <Formula>
            <Input name='name' type='text' value={value} label='Type Name' onChange={onChangeHandler} />
            <div className='flex gap-2'>
                <Button type='button' onClick={updateClickHandler}>Update</Button>
                <Button type='button' onClick={deleteClickHandler}>Delete</Button>
            </div>
        </Formula>
    )
}

const Types = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const [timeoutId, setTimeoutId] = useState<number | undefined>()
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('/api/types')
    const [head, setHead] = useState([
        {
            name: 'type_name',
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
            setUrl(`api/types?page=${page}${sortUrl}${searchUrl}`)
        }, 300) as unknown as number
        setTimeoutId(id)

        return () => clearInterval(timeoutId)
    }, [head, page])

    const { data, mutate } = useSWR(url)
    
    const body = data && data.rows && data.rows.map((item: any) => {
        const dataValues = {
            type_name: item.type_name
        }
        return {
            data: dataValues,
            editable: <EditType startValue={item.type_name} typeId={item.type_id} mutate={mutate} />
        }
    }) || []

    const [show, setShow] = useState(false)

    return (
        <div className='p-8'>
            <h1 className='mb-4 font-bold'>Types</h1>
            <Table
                head={head}
                setHead={setHead}
                body={body}
                foot={<CreateType mutate={mutate} setShow={setShow} />}
                show={show}
                setShow={setShow}
            />
            {data && data.lastPage > 1 && <Pagination lastPage={data && data.lastPage } currentPage={page} setCurrentPage={setPage} />}
        </div>
    )
}

export default Types