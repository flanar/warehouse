import useUser from '../utils/useUser'

import Table from '../components/Table'
import Select from '../components/Select'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'

const Costumes = () => {
    const { user } = useUser({ redirectTo: '/' })
    if(!user || !user.isLoggedIn) return <div>Loading...</div>

    const options = [
        {
            value: 1,
            label: 'test1'
        },
        {
            value: 2,
            label: 'test2'
        },
        {
            value: 3,
            label: 'test3'
        },
        {
            value: 4,
            label: 'test4'
        },
        {
            value: 5,
            label: 'test5'
        },
        {
            value: 6,
            label: 'test6'
        },
        {
            value: 7,
            label: 'test7'
        }
    ]

    const user1 = {
        name: "John Smith",
        age: 20,
        email: 'john@smitch.dev',
        active: true
    }
    
    const user2 = {
        name: "John Smith",
        age: 21,
        email: 'john@smitch.dev',
        active: false
    }
    
    const user3 = {
        name: "John Smith",
        age: 22,
        email: 'john@smitch.dev',
        active: true
    }

    const head = ['Name', 'Age', 'Email', 'Active']

    const data = [
        user1, user2, user3
    ]

    const body = data.map(item => {
        const data = {
            name: item.name,
            age: item.age,
            email: item.email,
            active: item.active ? 'Active' : 'Invactive'
        }

        return {
            data: data,
            editable: <div className='p-4 flex flex-col justify-start items-start'>
                <div className='mb-2'><Input name='name' type='text' value={item.name} label='Name' /></div>
                <div className='mb-2'><Input name='name' type='number' value={item.age} label='Age' /></div>
                <Input name='name' type='text' value={item.email} label='Email' />
                <Checkbox name='active' checked={item.active} label='Active' mark />
            </div>
        }
    })

    return (
        <div className='p-8'>
            <h1 className='my-4'>Table</h1>
            <Table
                head={head}
                body={body}
            />
            <h1 className='my-4'>Select</h1>
            <Select name='select' options={options} />
            <h1 className='my-4'>Input</h1>
            <Input name='test' label='Name' type='text' placeholder='Enter your name...'/>
            <h1 className='my-4'>Checkbox</h1>
            <Checkbox name='checkbox' />
            <div className='h-8'></div>
            <Checkbox name='checkbox2' label='Label' mark />
        </div>
    )
}

export default Costumes
