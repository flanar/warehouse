import { useState } from 'react'
import useSWR from 'swr'

import useUser from '../utils/useUser'

import Table from '../components/Table'
import Input from '../components/Input'
import Button from '../components/Button'

interface CreateRegionProps {
    mutate: any
}

interface EditRegionProps {
    startValue: any,
    regionId: number,
    mutate: any
}

const CreateRegion = ({ mutate }: CreateRegionProps) => {
    
    const [value, setValue] = useState('')

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    const createClickHandler = async () => {
        await fetch('/api/regions', {
            method: 'POST',
            body: JSON.stringify({ region_name: value })
        })
        mutate('/api/regions')
    }

    return (
        <div className='p-4 flex justify-start items-start'>
            <Input name='name' type='text' value={value} label='Region Name' onChange={onChangeHandler} />
            <div className='mx-2'><Button onClick={createClickHandler}>Create</Button></div>
        </div>
    )
}

const EditRegion = ({ startValue, regionId, mutate }: EditRegionProps) => {
    
    const [value, setValue] = useState(startValue)

    const onChangeHandler = (e: any) => {
        setValue(e.target.value)
    }

    const updateClickHandler = async () => {
        await fetch('/api/regions', {
            method: 'PUT',
            body: JSON.stringify({ region_id: regionId, region_name: value })
        })
        mutate('/api/regions')
    }

    const deleteClickHandler = async () => {
        await fetch('/api/regions', {
            method: 'DELETE',
            body: JSON.stringify({ region_id: regionId })
        })
        mutate('/api/regions')
    }

    return (
        <div className='p-4 flex justify-start items-start'>
            <Input name='name' type='text' value={value} label='Region Name' onChange={onChangeHandler} />
            <div className='mx-2'><Button onClick={updateClickHandler}>Update</Button></div>
            <Button onClick={deleteClickHandler}>Delete</Button>
        </div>
    )
}

const Regions = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const { data, mutate } = useSWR('/api/regions')
    
    const head = ['ID', 'Name']

    console.log(data)

    const body = data && Array.isArray(data) && data.map((item: any) => {
        return {
            data: item,
            editable: <EditRegion startValue={item.region_name} regionId={item.region_id} mutate={mutate}/>
        }
    }) || []

    return (
        <div className='p-8'>
            <h1 className='mb-4 font-bold'>Regions</h1>
            <Table
                head={head}
                body={body}
                foot={<CreateRegion mutate={mutate} />}
            />
        </div>
    )
}

export default Regions