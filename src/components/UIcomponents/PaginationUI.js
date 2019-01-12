import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const PaginationUI = (props) => (
    <Pagination>
        <PaginationItem>
            <PaginationLink previous onClick={() => props.onPageChange(Math.max(props.currentPage - 1, 1))} />
        </PaginationItem>
        {pageArray(props.maxPages).map(i => (
            <PaginationItem key={i} className={(props.currentPage === i) ? 'active' : null}>
                <PaginationLink onClick={() => props.onPageChange(i)}>{i}</PaginationLink>
            </PaginationItem>
        ))}
        <PaginationItem>
            <PaginationLink next onClick={() => props.onPageChange(Math.min(props.currentPage + 1, props.maxPages))} />
        </PaginationItem>
    </Pagination>
);

const pageArray = (maxPages) => {
    let pageArray = []
    for (var i = 1; i <= maxPages; i++) {
        pageArray.push(i);
    }
    return pageArray;
}

export default PaginationUI;
