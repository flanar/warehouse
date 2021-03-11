import { ReactNode, useState } from "react"

export interface Obj {
    [key: string]: string | number
}

interface RowProps {
    items: Obj
    headLength: number
    editable?: ReactNode
}

const Row = ({ items, headLength, editable }: RowProps) => {
    const [show, setShow] = useState(false)

    return (
        <div className='bg-coolGray-400 odd:bg-coolGray-500 hover:bg-coolGray-700 border border-coolGray-100'>
            <div className={`grid grid-cols-${headLength} cursor-pointer`} onClick={() => setShow(!show)}>
                {Object.keys(items).map((key, index) => <div key={index} className='px-6 py-3'>
                    {items[key]}
                </div>)}
            </div>
            {show && <div className='bg-coolGray-100'>{editable}</div>}
        </div>
    )
}

export default Row