import { useState } from 'react'
import useSWR from 'swr'
import fetch from '../utils/fetchJson'

import useUser from '../utils/useUser'

import Table from '../components/Table'
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
        <div className='p-4 flex justify-start items-start'>
            <Input name='name' type='text' value={value} label='Type Name' onChange={onChangeHandler} />
            <div className='mx-2'><Button type='button' onClick={createClickHandler}>Create</Button></div>
        </div>
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
        <div className='p-4 flex justify-start items-start'>
            <Input name='name' type='text' value={value} label='Type Name' onChange={onChangeHandler} />
            <div className='mx-2'><Button type='button' onClick={updateClickHandler}>Update</Button></div>
            <Button type='button' onClick={deleteClickHandler}>Delete</Button>
        </div>
    )
}

const Types = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const { data, mutate } = useSWR('/api/types')
    
    const head = ['Name']

    const body = data && Array.isArray(data) && data.map((item: any) => {
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
                body={body}
                foot={<CreateType mutate={mutate} setShow={setShow} />}
                show={show}
                setShow={setShow}
            />
        </div>
    )
}

export default Types