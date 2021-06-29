import { FC } from 'react'
import Button from '../Button'

interface PaginationI {
    lastPage: number
    currentPage: number
    setCurrentPage: Function
}

const Pagination: FC<PaginationI> = ({lastPage, currentPage, setCurrentPage}) => {
    return (
        <div className='text-white'>
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>{'<'}</Button>
            <Button disabled>{currentPage} / {lastPage}</Button>
            <Button disabled={currentPage === lastPage} onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</Button>
        </div>
    )
}

export default Pagination