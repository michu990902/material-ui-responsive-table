import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    TableSortLabel,
    TableRow,
    TableHead,
    TableCell
} from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ResponsiveViewSwitcher from '../ResponsiveViewSwitcher/ResponsiveViewSwitcher'
import Select from '../Select/Select'

const TableHeader = ({ classes, order, orderBy,  onRequestSort, columns, setOrder, setOrderBy }) => {
    const [selectedOrder, setSelectedOrder] = useState(0);
    const sortButtons = columns.reduce((res, curr) => [
        ...res,
        {
            id: curr.id,
            order: 'asc',
            label: curr.label,
            icon: <ArrowUpwardIcon />
        },
        {
            id: curr.id,
            order: 'desc',
            label: curr.label,
            icon: <ArrowDownwardIcon />
        },
    ], []);

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
        const nr = sortButtons.findIndex(obj => obj.id === property && obj.order !== order);
        setSelectedOrder(nr);
    };

    return (
        <TableHead>
            <TableRow>
                <ResponsiveViewSwitcher
                    fullScreen={<>
                        {columns.map(column => (
                            <TableCell
                                key={column.id}
                                align={column.type !== "string" ? 'right' : 'left'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                >
                                {column.label}
                                {orderBy === column.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </>}
                    middleScreen={<TableCell colSpan={2} align="center">
                        <Select
                            label="Sort"
                            handleChange={ev => {
                                const id = ev.target.value;
                                setSelectedOrder(id);
                                setOrder(sortButtons[id].order);
                                setOrderBy(sortButtons[id].id);
                            }}
                            value={selectedOrder}
                            values={sortButtons}
                        />
                    </TableCell>}
                    smallScreen={<TableCell align="center">
                        <Select
                            label="Sort"
                            handleChange={ev => {
                                const id = ev.target.value;
                                setSelectedOrder(id);
                                setOrder(sortButtons[id].order);
                                setOrderBy(sortButtons[id].id);
                            }}
                            value={selectedOrder}
                            values={sortButtons}
                        />
                    </TableCell>}
                />
            </TableRow>
        </TableHead>
    );
};

TableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default TableHeader;