import React, { useEffect, useState } from 'react'
import {
    Toolbar,
    Typography,
    Button,
    Paper,
    TableContainer,
    Table,
    TablePagination,
    Chip
} from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import { makeStyles } from '@material-ui/core/styles'
import TableHeader from './TableHeader'
import TableBody from './TableBody'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    title: { 
        flexGrow: 1, 
        textAlign: 'left'
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
    chip: {
      margin: theme.spacing(0.5),
    },
    filters: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        alignItems: 'center',
        padding: theme.spacing(0.5),
        margin: 0,
    },
}));

const ResponsiveTable = ({ title, columns, rows }) => {
    const classes = useStyles(); 
    const [filters, setFilters] = useState([
        {
            fieldName: "Name",
            condition: "contains",
            value: "Test"
        },
        {
            fieldName: "Value 1",
            condition: "equal",
            value: "1"
        },
    ]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        // ! TODO filter
        setFilteredRows(rows);
    }, [rows]);

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

    return (
        <div className={classes.root}>
            <Toolbar disableGutters> 
                <Typography id="tableTitle" className={classes.title} variant="h6" noWrap> 
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<FilterListIcon />}
                    onClick={() => {}}
                >
                    Filter
                </Button>
            </Toolbar>
            <Paper className={classes.paper}>
                {filters.length > 0 && (
                    <Paper component="ul" className={classes.filters}>
                        {filters.map((filter, id) => (
                            <li key={id}>
                                <Chip
                                    label={`"${filter.fieldName}" ${filter.condition} "${filter.value}"`}
                                    onDelete={() => {}}
                                    className={classes.chip}
                                />
                            </li>
                        ))}
                    </Paper>
                )}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label={title}
                    >
                        <TableHeader
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            setOrderBy={setOrderBy}
                            setOrder={setOrder}
                            rowCount={filteredRows.length}
                            columns={columns}
                        />
                        <TableBody
                            classes={classes}
                            columns={columns}
                            rows={filteredRows}
                            order={order}
                            orderBy={orderBy}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    labelRowsPerPage="" // 'Rows per page:'
                />
            </Paper>
        </div>
    );
};

export default ResponsiveTable;