import { FC, useRef, useEffect, ReactNode, RefObject } from 'react'

const useOutsideClick = (ref: RefObject<HTMLDivElement>, clickHandler: Function) => {
    const handleClickOutside = (e: Event) => {
        if(ref.current && e.target instanceof HTMLElement && !ref.current.contains(e.target))
            clickHandler()
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })
}

interface OutsideClickProps {
    clickHandler: Function
    children: ReactNode
}

const OutsideClick: FC<OutsideClickProps> = ({clickHandler, children}) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    useOutsideClick(wrapperRef, clickHandler)

    return <div ref={ wrapperRef }>{ children }</div>
}

export default OutsideClick
