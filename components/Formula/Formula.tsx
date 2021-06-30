import { FC, ReactNode } from 'react'

interface FormulaI {
    children?: ReactNode
}

const Formula: FC<FormulaI> = ({ children }) => {
    return (
        <div className='p-4 min-h-150 flex flex-col justify-start items-start gap-2'>{ children }</div>
    )
}

export default Formula