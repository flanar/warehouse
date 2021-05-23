import { FC, ReactNode, useState } from 'react'
import Row, { Obj } from './Row'

interface BodyItem {
    [key: string]: object | ReactNode
    data: Obj
    editable?: ReactNode
}

interface TableProps {
    head: Array<string>
    body: Array<BodyItem>
    foot: ReactNode
}

const Table: FC<TableProps> = ({head, body, foot}) => {
    const thead = <div className={`grid grid-cols-${head.length} bg-teal-800 text-center`}>
        {head.map(item => <div key={item} className='px-6 py-3 border border-coolGray-100'>{item}</div>)}
    </div>

    const tbody = <div className='text-center'>
        {body.map((item, index) => <Row
            key={index}
            items={item.data}
            headLength={head.length}
            editable={item.editable}
        />)}
    </div>

    const [show, setShow] = useState(false)

    const tfoot = <div>
        <div className='px-6 py-3 bg-teal-800 hover:opacity-80 border border-coolGray-100 cursor-pointer' onClick={() => setShow(!show)}>{show ? '-' : '+'}</div>
        { show && <div>{foot}</div> }
    </div>

    return (
        <div className='text-white'>
            {thead}
            {tbody}
            {tfoot}
        </div>
    )
}

export default Table