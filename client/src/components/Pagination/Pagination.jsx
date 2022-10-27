import React from 'react';

import PaginationStyles from './pagination.module.css';

export default function Pagination({ dogsPerPage, allDoggos, pagination }) {
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allDoggos / dogsPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav className={PaginationStyles['nav-pagination']}>
            <ul className={PaginationStyles['pagination-container']}>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className={PaginationStyles['bullet']} key={number}>
                            <button className={PaginationStyles['blocks']} onClick={() => pagination(number)}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}