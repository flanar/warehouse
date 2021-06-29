import { FC, ReactNode } from 'react'
import Row, { Obj } from './Row'
import Input from '../Input'

interface BodyItem {
    [key: string]: object | ReactNode
    data: Obj
    editable?: ReactNode
}

interface HeadItem {
    [key: string]: string | undefined
    name: string
    label: string
    sort?: string | undefined
    search?: string | undefined
}

interface TableProps {
    head: Array<HeadItem>
    setHead: Function
    body: Array<BodyItem>
    foot?: ReactNode
    show?: boolean
    setShow?: Function
}

const Table: FC<TableProps> = ({head, setHead, body, foot, show, setShow}) => {
    const onChangeHandler = (e: any) => {
        const index = head.findIndex((item: any) => {
            return item.name === e.target.id
        })
        const newHead = [...head]
        newHead[index] = {
            ...newHead[index],
            search: e.target.value
        }
        setHead(newHead)
    }

    const clickHeadHandler = (index: number) => {
        if(!('sort' in head[index])) {
            return
        }
        let sort = ''
        if(head[index].sort === '') {
            sort = 'asc'
        } else if(head[index].sort === 'asc') {
            sort = 'desc'
        }

        const newHead = [...head.map((item: any) => {
            if('sort' in item) {
                return {
                    ...item,
                    sort: ''
                }
            } else {
                return {
                    ...item
                }
            }
        })]
        newHead[index] = {
            ...newHead[index],
            sort: sort
        }
        setHead(newHead)
    }

    const thead = <div className={`grid grid-cols-${head.length} bg-teal-800 text-center`}>
        {head.map((item: HeadItem, index: number) => <div key={item.name} className='px-6 py-3 border border-coolGray-100' onClick={() => clickHeadHandler(index)}>{item.label + ('sort' in head[index] && head[index].sort === 'asc' ? ' asc' : head[index].sort === 'desc' ? ' desc' : '')}</div>)}
    </div>

    const searchBar = <div className={`grid grid-cols-${head.length} bg-teal-800 text-center`}>
        {head.map((item: HeadItem) => <div key={item.name} className='px-6 py-3 border border-coolGray-100'>
            {'search' in item ? <Input name={item.name} type='text' value={item.search} onChange={onChangeHandler} /> : ''}
        </div>)}
    </div>

    const tbody = <div className='text-center'>
        {body.map((item, index) => <Row
            key={index}
            items={item.data}
            headLength={head.length}
            editable={item.editable}
        />)}
    </div>

    const tfoot = foot && <div>
        <div className='px-6 py-3 bg-teal-800 hover:opacity-80 border border-coolGray-100 cursor-pointer' onClick={() => setShow && setShow(!show)}>{show ? '-' : '+'}</div>
        { show && <div>{foot && foot}</div> }
    </div>

    return (
        <div className='text-white'>
            {thead}
            {searchBar}
            {tbody}
            {tfoot}
        </div>
    )
}

export default Table