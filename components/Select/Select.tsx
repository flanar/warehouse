import { FC, InputHTMLAttributes, useState } from 'react'

interface Option {
    value: number | string
    label: string
}

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    options: Array<Option>
}

const Select: FC<SelectProps> = ({ name, label, options, ...rest }) => {
    const [selectedValue, setSelectedValue] = useState<string | number>(options?.[0].value)
    const [selectedLabel, setSelectedLabel] = useState<string>(options?.[0].label)
    const [show, setShow] = useState(false)

    const clickHandler = (option: { value: string | number; label: string }) => {
        setSelectedValue(option.value)
        setSelectedLabel(option.label)
        setShow(false)
    }

    return (
        <>
            <div className='relative text-white w-72 text-center cursor-pointer'>
                <div className={`px-4 py-2 ${show ? 'rounded-t-lg' : 'rounded-lg'} bg-teal-900`} onClick={() => setShow(!show)}>{selectedLabel}</div>
                <div className={`absolute w-72 ${show ? 'h-48 transition-all' : 'h-0'} rounded-b-lg overflow-y-auto scrollbar-thin scrollbar-thumb-teal-800 scrollbar-track-teal-700 scrollbar-thumb-rounded`}>
                    {options.map(option => <div key={option.value} 
                        className='px-4 py-2 bg-teal-700 hover:bg-teal-800'
                        onClick={() => clickHandler(option)}
                    >
                        {option.label}
                    </div>)}
                </div>
            </div>
            <input type='hidden' value={selectedValue} {...rest} />
        </>
    )
}

export default Select
