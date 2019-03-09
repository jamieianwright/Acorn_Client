import React from 'react';
import { Button } from 'reactstrap';


const SortableColumnHeading = (props) => (
    <th className="align-middle">
        <div className=" d-inline-flex align-items-center">
            <Button color='link' className="pl-0"
                disabled={props.columnHeaderId === props.currentOrderBy ? true : false}
                onClick={() => props.setOrderBy(props.columnHeaderId)}>
                {props.columnHeaderName}
            </Button>
            {props.columnHeaderId === props.currentOrderBy
                ? <i className={(!props.asc) ? 'fas fa-arrow-down' : 'fas fa-arrow-up'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => props.toggleAsc(props.asc)}></i>
                : null
            }
        </div>
    </th>
)

export default SortableColumnHeading;
