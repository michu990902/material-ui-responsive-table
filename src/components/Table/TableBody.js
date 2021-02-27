import React from 'react'
import {
    Table,
    TableRow,
    TableBody,
    TableCell
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ResponsiveViewSwitcher from '../ResponsiveViewSwitcher/ResponsiveViewSwitcher'
import { splitData } from '../../utils/splitData'
import { stableSort, getComparator, descendingComparator } from '../../utils/sort'

const mapValue = (val, map) => map ? map[val] : val;

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const ResponsiveTableBody = ({columns, rows, order, orderBy, page, rowsPerPage, classes}) => {
    const splitColumns = splitData(columns, 2);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
                <StyledTableRow
                    tabIndex={-1}
                    key={row.name}
                >
                    <ResponsiveViewSwitcher
                        fullScreen={
                            <>
                                {columns.map((cell, cellId) => (
                                    <TableCell align={cellId ? 'right' : 'left'} key={`${index}-${cell.id}`}>
                                        {mapValue(row[cell.id], cell.mapValues)}
                                    </TableCell>
                                ))}
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
                                        {splitColumns.map(cell => (
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
                                                    {mapValue(cell[1] ? row[cell[1].id] : null, cell[1] ? cell[1].mapValues : null)}
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
                                        {columns.map(cell => (
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
            ))}
            {emptyRows > 0 && (
                <TableRow>
                    <TableCell colSpan={columns.length} />
                </TableRow>
            )}
        </TableBody>
    );
}

export default ResponsiveTableBody;