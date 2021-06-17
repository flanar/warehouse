import { useState } from 'react'
import useSWR from 'swr'
import fetch from '../utils/fetchJson'

import useUser from '../utils/useUser'

import Table from '../components/Table'
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

    const { data, mutate } = useSWR('/api/regions')
    
    const head = ['Name']

    const body = data && Array.isArray(data) && data.map((item: any) => {
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
                body={body}
                foot={<CreateRegion mutate={mutate} setShow={setShow} />}
                show={show}
                setShow={setShow}
            />
        </div>
    )
}

export default Regions