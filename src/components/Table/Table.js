import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper
} from '@material-ui/core'
// TODO: filter, header
// import FilterListIcon from '@material-ui/icons/FilterList'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ResponsiveViewSwitcher from '../ResponsiveViewSwitcher/ResponsiveViewSwitcher'
import Select from '../Select/Select'


const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => (order === 'desc'
? (a, b) => descendingComparator(a, b, orderBy)
: (a, b) => -descendingComparator(a, b, orderBy));

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const mapValue = (val, map) => map ? map[val] : val;

function EnhancedTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, setOrder, setOrderBy }) {
    const [selectedOrder, setSelectedOrder] = useState(0);
    const sortButtons = headCells.reduce((res, curr) => [
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
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                {headCell.label}
                                {orderBy === headCell.id ? (
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
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 300,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableCell:{
        borderWidth: 0,
        verticalAlign: 'top',
    },
}));

const splitData = (arr, splitSize) => {
    let ss = splitSize+1;
    let tmp = [];
    for(let i = 0; i < arr.length; i++) {
        if(ss > 1){
            let pos = tmp.length-1;
            if (pos < 0) pos = 0;
            tmp[pos] = [...(tmp[pos]||[]), arr[i]];
            ss--;
        }else{
            tmp.push([arr[i]])
            ss = splitSize;
        }
    }
    return tmp;
};

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function EnhancedTable({headCells, rows}) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const splitHeadCells = splitData(headCells, 2);

    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    setOrderBy={setOrderBy}
                    setOrder={setOrder}
                    rowCount={rows.length}
                    headCells={headCells}
                />
                <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {

                    return (
                        <StyledTableRow
                            tabIndex={-1}
                            key={row.name}
                        >
                            <ResponsiveViewSwitcher
                                fullScreen={
                                    <>
                                        {headCells.map((cell, cellId) => <TableCell align={cellId ? 'right' : 'left'} key={`${index}-${cell.id}`}>{mapValue(row[cell.id], cell.mapValues)}</TableCell>)}
                                    </>
                                }
                                middleScreen={
                                    <TableCell padding="none">
                                        <Table size="small">
                                            <colgroup>
                                                <col width="25%" />
                                                <col width="25%" />
                                                <col width="25%" />
                                                <col width="25%" />
                                            </colgroup>
                                            <TableBody>
                                                {splitHeadCells.map(cell => (
                                                    <TableRow key={`${index}-${cell[0].id}`}>
                                                        <TableCell variant="head" className={classes.tableCell}>
                                                            {cell[0].label}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} align="right">
                                                            {mapValue(row[cell[0].id], cell[0].mapValues)}
                                                        </TableCell>
                                                        <TableCell variant="head" className={classes.tableCell}>
                                                            {cell[1] ? cell[1].label : null}
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} align="right">
                                                            {mapValue(cell[1] ? row[cell[1].id] : null, cell[1] ? row[cell[1].id].mapValues : null)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                }
                                smallScreen={
                                    <TableCell padding="none">
                                        <Table size="small">
                                            <TableBody>
                                                {headCells.map(cell => (
                                                    <TableRow key={`${index}-${cell.id}`}>
                                                        <TableCell variant="head" className={classes.tableCell}>
                                                            {cell.label}
                                                        </TableCell>
                                                        <TableCell align="right" className={classes.tableCell}>
                                                            {mapValue(row[cell.id], cell.mapValues)}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                }
                            />
                        </StyledTableRow>
                    );
                    })}
                {emptyRows > 0 && (
                    <TableRow>
                        <TableCell colSpan={headCells.length} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage="" // 'Rows per page:'
            />
        </Paper>
        </div>
    );
}