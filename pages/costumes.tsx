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

interface CreateCostumeProps {
    mutate: any
    setShow: Function
}

interface EditCostumeProps {
    startValues: any
    costumeId: number
    mutate: any
}

const CreateCostume = ({ mutate, setShow }: CreateCostumeProps) => {
    
    const [values, setValues] = useState({
        costume_tag: '',
        region_id: '',
        type_id: '',
        costume_gender: '',
        costume_description: '',
        member_id: null
    })

    const [regionOptions, setRegionOptions] = useState([])
    const [typeOptions, setTypeOptions] = useState([])
    const [memberOptions, setMemberOptions] = useState([])

    const fetchRegions = async () => {
        const regions = await fetch('/api/regions')
        setRegionOptions(regions.rows.map((region: any) => {
            return {
                value: region.region_id,
                label: region.region_name
            }
        }))
    }

    const fetchTypes = async () => {
        const types = await fetch('/api/types')
        setTypeOptions(types.rows.map((type: any) => {
            return {
                value: type.type_id,
                label: type.type_name
            }
        }))
    }

    const fetchMembers = async () => {
        const members = await fetch('/api/members')
        setMemberOptions(members.rows.map((member: any) => {
            return {
                value: member.member_id,
                label: member.member_name + ' ' + member.member_surname
            }
        }))
    }

    useEffect(() => {
        fetchRegions()
        fetchTypes()
        fetchMembers()
    }, [])
    
    const onChangeHandler = (e: any) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
    }

    const createClickHandler = async () => {
        if(values.costume_tag === '' || values.type_id === '' || values.costume_gender === '') {
            return
        }
        try {
            await fetch('/api/costumes', {
                method: 'POST',
                body: JSON.stringify(values)
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/costumes')
        setShow(false)
    }

    const genderOptions = [
        {
            value: 0,
            label: 'M'
        },
        {
            value: 1,
            label: 'K'
        },
        {
            value: 2,
            label: 'B'
        }
    ]

    const onChangeSelectHandler = (key: string, value: any) => {
        setValues({
            ...values,
            [key]: value
        })
    }

    return (
        <Formula>
            <Input name='costume_tag' type='text' value={values.costume_tag} label='Costume Tag' onChange={onChangeHandler} />
            <Select name='region_id' label='Region' options={regionOptions} onOptionClick={(value: any) => onChangeSelectHandler('region_id', value)} />
            <Select name='type_id' label='Type' options={typeOptions} onOptionClick={(value: any) => onChangeSelectHandler('type_id', value)} />
            <Select name='costutme_gender' label='Gender' options={genderOptions} onOptionClick={(value: any) => onChangeSelectHandler('costume_gender', value)} />
            <Input name='costume_description' type='text' value={values.costume_description} label='Costume Description' onChange={onChangeHandler} />
            <Select name='member_id' label='Member' options={memberOptions} onOptionClick={(value: any) => onChangeSelectHandler('member_id', value)} />
            <Button type='button' onClick={createClickHandler}>Create</Button>
        </Formula>
    )
}

const EditCostume = ({ startValues, costumeId, mutate }: EditCostumeProps) => {
    
    const [values, setValues] = useState(startValues)

    const [regionOptions, setRegionOptions] = useState([])
    const [typeOptions, setTypeOptions] = useState([])
    const [memberOptions, setMemberOptions] = useState([])

    const fetchRegions = async () => {
        const regions = await fetch('/api/regions')
        const prepareRegions = regions.rows.map((region: any) => {
            return {
                value: region.region_id,
                label: region.region_name
            }
        })
        prepareRegions.unshift({
            value: '',
            label: '--'
        })
        setRegionOptions(prepareRegions)
    }

    const fetchTypes = async () => {
        const types = await fetch('/api/types')
        setTypeOptions(types.rows.map((type: any) => {
            return {
                value: type.type_id,
                label: type.type_name
            }
        }))
    }

    const fetchMembers = async () => {
        const members = await fetch('/api/members')
        const prepareMembers = members.rows.map((member: any) => {
            return {
                value: member.member_id,
                label: member.member_name + ' ' + member.member_surname
            }
        })
        prepareMembers.unshift({
            value: '',
            label: '--'
        })
        setMemberOptions(prepareMembers)
    }

    useEffect(() => {
        fetchRegions()
        fetchTypes()
        fetchMembers()
    }, [])

    const onChangeHandler = (e: any) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
    }

    const updateClickHandler = async () => {
        try {
            await fetch('/api/costumes', {
                method: 'PUT',
                body: JSON.stringify({
                    costume_id: values.costume_id,
                    costume_tag: values.costume_tag,
                    region_id: values.region_id,
                    type_id: values.type_id,
                    costume_gender: values.costume_gender,
                    costume_description: values.costume_description,
                    member_id: values.member_id
                })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/costumes')
    }

    const deleteClickHandler = async () => {
        try {
            await fetch('/api/costumes', {
                method: 'DELETE',
                body: JSON.stringify({ costume_id: costumeId })
            })
        } catch (err) {
            console.error(err)
        }
        mutate('/api/costumes')
    }

    const genderOptions = [
        {
            value: 0,
            label: 'M'
        },
        {
            value: 1,
            label: 'K'
        },
        {
            value: 2,
            label: 'B'
        }
    ]

    const onChangeSelectHandler = (key: string, value: any) => {
        setValues({
            ...values,
            [key]: value
        })
    }

    return (
        <Formula>
            <Input name='costume_tag' type='text' value={values.costume_tag} label='Costume Tag' onChange={onChangeHandler} />
            <Select name='region_id' label='Region' options={regionOptions} defaultOption={{value: startValues.region_id === null ? '' : startValues.region_id, label: startValues.region_id === null ? '--' : startValues.region_name}} onOptionClick={(value: any) => onChangeSelectHandler('region_id', value)} />
            <Select name='type_id' label='Type' options={typeOptions} defaultOption={{value: startValues.type_id, label: startValues.type_name}} onOptionClick={(value: any) => onChangeSelectHandler('type_id', value)} />
            <Select name='costume_gender' label='Gender' options={genderOptions} defaultOption={{value: startValues.costume_gender, label: startValues.costume_gender_name}} onOptionClick={(value: any) => onChangeSelectHandler('costume_gender', value)} />
            <Input name='costume_description' type='text' value={values.costume_description} label='Costume Description' onChange={onChangeHandler} />
            <Select name='member_id' label='Member' options={memberOptions} defaultOption={{value: startValues.member_id === null ? '' : startValues.member_id, label: startValues.member_id === null ? '--' : startValues.member_name + ' ' + startValues.member_surname}} onOptionClick={(value: any) => onChangeSelectHandler('member_id', value)} />
            <div className='flex gap-2'>
                <Button type='button' onClick={updateClickHandler}>Update</Button>
                <Button type='button' onClick={deleteClickHandler}>Delete</Button>
            </div>
        </Formula>
    )
}

const Costumes = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const [timeoutId, setTimeoutId] = useState<number | undefined>()
    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('/api/costumes')
    const [head, setHead] = useState([
        {
            name: 'costume_tag',
            label: 'Tag',
            sort: '',
            search: ''
        },
        {
            name: 'region_name',
            label: 'Region',
            sort: '',
            search: ''
        },
        {
            name: 'type_name',
            label: 'Type',
            sort: '',
            search: ''
        },
        {
            name: 'costume_gender',
            label: 'Gender',
            sort: '',
        },
        {
            name: 'costume_description',
            label: 'Description',
            search: ''
        },
        {
            name: 'member',
            label: 'Member',
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
            setUrl(`api/costumes?page=${page}${sortUrl}${searchUrl}`)
        }, 300) as unknown as number
        setTimeoutId(id)

        return () => clearInterval(timeoutId)
    }, [head, page])

    const { data, mutate } = useSWR(url)
    
    const body = data && data.rows && data.rows.map((item: any) => {
        const dataValues = {
            costume_tag: item.costume_tag,
            region_name: item.region_id ? item.region_name : '',
            type_name: item.type_name,
            costume_gender_name: item.costume_gender_name,
            costume_description: item.costume_description,
            member: item.member_id ? item.member_name + ' ' + item.member_surname : ''
        }
        return {
            data: dataValues,
            editable: <EditCostume startValues={item} costumeId={item.costume_id} mutate={mutate} />
        }
    }) || []

    const [show, setShow] = useState(false)

    return (
        <div className='p-8'>
            <h1 className='mb-4 font-bold'>Costumes</h1>
            <Table
                head={head}
                setHead={setHead}
                body={body}
                foot={<CreateCostume mutate={mutate} setShow={setShow} />}
                show={show}
                setShow={setShow}
            />
            {data && data.lastPage > 1 && <Pagination lastPage={data && data.lastPage } currentPage={page} setCurrentPage={setPage} />}
        </div>
    )
}

export default Costumes