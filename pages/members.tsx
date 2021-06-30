import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetch from '../utils/fetchJson'

import useUser from '../utils/useUser'

import Table from '../components/Table'
import Pagination from '../components/Pagination'
import Formula from '../components/Formula'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'

interface CreateMemberProps {
    mutate: any
    setShow: Function
}

interface EditMemberProps {
    startValues: any
    memberId: number
    mutate: any
}

const CreateMember = ({ mutate, setShow }: CreateMemberProps) => {
    
    const [values, setValues] = useState({
        member_name: '',
        member_surname: '',
        member_gender: 0,
        group_id: ''
    })

    const [groupOptions, setGroupOptions] = useState([])

    useEffect(() => {
        (async () => {
            const groups = await fetch('/api/groups')
            setGroupOptions(groups.map((group: any) => {
                return {
                    value: group.group_id,
                    label: group.group_name
                }
            }))
        })()
    }, [])
    
    const onChangeHandler = (e: any) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
    }

    const createClickHandler = async () => {
        if(values.member_name === '' || values.member_surname === '' || values.group_id === '') {
            return
        }
        try {
            await fetch('/api/members', {
                method: 'POST',
                body: JSON.stringify(values)
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/members')
        setShow(false)
    }

    const genderOptions = [
        {
            value: 0,
            label: 'Mężczyzna'
        },
        {
            value: 1,
            label: 'Kobieta'
        }
    ]

    const onChangeGenderHandler = (value: any) => {
        setValues({
            ...values,
            member_gender: value
        })
    }

    const onChangeGroupHandler = (value: any) => {
        setValues({
            ...values,
            group_id: value
        })
    }

    return (
        <Formula>
            <Input name='member_name' type='text' value={values.member_name} label='Member Name' onChange={onChangeHandler} />
            <Input name='member_surname' type='text' value={values.member_surname} label='Member Surname' onChange={onChangeHandler} />
            <Select name='member_gender' label='Member gender' options={genderOptions} onOptionClick={onChangeGenderHandler} />
            <Select name='group_id' label='Group' options={groupOptions} onOptionClick={onChangeGroupHandler} />
            <Button type='button' onClick={createClickHandler}>Create</Button>
        </Formula>
    )
}

const EditMember = ({ startValues, memberId, mutate }: EditMemberProps) => {
    
    const [values, setValues] = useState(startValues)

    const [groupOptions, setGroupOptions] = useState([])

    useEffect(() => {
        (async () => {
            const groups = await fetch('/api/groups')
            setGroupOptions(groups.map((group: any) => {
                return {
                    value: group.group_id,
                    label: group.group_name
                }
            }))
        })()
    }, [])

    const onChangeHandler = (e: any) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
    }

    const updateClickHandler = async () => {
        try {
            await fetch('/api/members', {
                method: 'PUT',
                body: JSON.stringify({
                    member_id: memberId,
                    member_name: values.member_name,
                    member_surname: values.member_surname,
                    member_gender: values.member_gender,
                    group_id: values.group_id
                })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/members')
    }

    const deleteClickHandler = async () => {
        try {
            await fetch('/api/members', {
                method: 'DELETE',
                body: JSON.stringify({ member_id: memberId })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/members')
    }

    const genderOptions = [
        {
            value: 0,
            label: 'Mężczyzna'
        },
        {
            value: 1,
            label: 'Kobieta'
        }
    ]

    const onChangeGenderHandler = (value: any) => {
        setValues({
            ...values,
            member_gender: value
        })
    }

    const onChangeGroupHandler = (value: any) => {
        setValues({
            ...values,
            group_id: value
        })
    }

    return (
        <Formula>
            <Input name='member_name' type='text' value={values.member_name} label='Member Name' onChange={onChangeHandler} />
            <Input name='member_surname' type='text' value={values.member_surname} label='Member Surname' onChange={onChangeHandler} />
            <Select name='member_gender' options={genderOptions} defaultOption={{value: startValues.member_gender, label: startValues.member_gender_name}} onOptionClick={onChangeGenderHandler} />
            <Select name='group_id' options={groupOptions} defaultOption={{value: startValues.group_id, label: startValues.group_name}} onOptionClick={onChangeGroupHandler} />
            <div className='flex gap-2'>
                <Button type='button' onClick={updateClickHandler}>Update</Button>
                <Button type='button' onClick={deleteClickHandler}>Delete</Button>
            </div>
        </Formula>
    )
}

const Members = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const [timeoutId, setTimeoutId] = useState<number | undefined>()
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('/api/members')
    const [head, setHead] = useState([
        {
            name: 'member_name',
            label: 'Name',
            sort: '',
            search: ''
        },
        {
            name: 'member_surname',
            label: 'Surname',
            sort: '',
            search: ''
        },
        {
            name: 'member_gender',
            label: 'Gender',
            sort: '',
        },
        {
            name: 'group_name',
            label: 'Group',
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
            setUrl(`api/members?page=${page}${sortUrl}${searchUrl}`)
        }, 300) as unknown as number
        setTimeoutId(id)

        return () => clearInterval(timeoutId)
    }, [head, page])

    const { data, mutate } = useSWR(url)

    const body = data && data.rows && data.rows.map((item: any) => {
        const dataValues = {
            member_name: item.member_name,
            member_surname: item.member_surname,
            member_gender: item.member_gender_name,
            group_name: item.group_name
        }
        return {
            data: dataValues,
            editable: <EditMember startValues={item} memberId={item.member_id} mutate={mutate} />
        }
    }) || []

    const [show, setShow] = useState(false)

    return (
        <div className='p-8'>
            <h1 className='mb-4 font-bold'>Members</h1>
            <Table
                head={head}
                setHead={setHead}
                body={body}
                foot={<CreateMember mutate={mutate} setShow={setShow} />}
                show={show}
                setShow={setShow}
            />
            {data && data.lastPage > 1 && <Pagination lastPage={data && data.lastPage } currentPage={page} setCurrentPage={setPage} />}
        </div>
    )
}

export default Members