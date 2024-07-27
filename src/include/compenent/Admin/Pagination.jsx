import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent (props) {
    const [active, setActive] = useState(1);

    const handlePageClick = (pageNumber) => {
        setActive(pageNumber);
        props.index(pageNumber)
    };

    const items = [];
    for (let number = 1; number <= props.pages; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => handlePageClick(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <Pagination size="sm">{items}</Pagination>
        </div>
    );
};

export default PaginationComponent;
