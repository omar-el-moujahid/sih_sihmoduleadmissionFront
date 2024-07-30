import React from 'react'
import { Pagination, Table } from 'react-bootstrap'
import Cards from './cards'
import MyTable from './Table'

function Performances(props) {
    return (
        <div>
            <Cards></Cards>
            <MyTable/>
        </div>
    )
}

export default Performances