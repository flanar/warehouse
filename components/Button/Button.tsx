import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
}

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <button className='px-4 py-2 bg-teal-700 rounded hover:bg-teal-800 disabled:bg-teal-600 outline-none focus:outline-none' {...rest}>{ children }</button>
    )
}

export default Button