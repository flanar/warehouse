import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
}

const Input: FC<InputProps> = ({ name, label, ...rest }) => {
    return (
        <div className='text-white'>
            {label && <label className='px-4 py-2 rounded-l-md bg-teal-700' htmlFor={name}>{label}</label>}
            <input className={`px-4 py-2 max-w-full leading-none rounded${label ? '-r' : ''}-lg bg-coolGray-400 focus:shadow-inner focus:bg-coolGray-500 outline-none`} id={name} {...rest}/>
        </div>
    )
}

export default Input