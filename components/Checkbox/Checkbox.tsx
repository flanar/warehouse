import { FC, InputHTMLAttributes } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    mark?: boolean
}

const Checkbox: FC<CheckboxProps> = ({ name, label, mark, type='checkbox', ...rest }) => {
    return (
        <div className='flex items-center text-coolGray-900'>
            {label && <label className='pr-4 py-2'>{label}</label>}
            {mark ?
                <input className='appearance-none w-4 h-4 rounded-sm bg-coolGray-300 cursor-pointer outline-none marked-checkbox' id={name} type='checkbox' {...rest}/>
                :
                <input className='appearance-none w-4 h-4 rounded-full bg-coolGray-300 checked:bg-teal-700 cursor-pointer outline-none' id={name} type='checkbox' {...rest}/>
            }
        </div>
    )
}

export default Checkbox