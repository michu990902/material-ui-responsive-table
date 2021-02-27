import React from 'react'

const TableContainer = ({ children, columns, rows }) => {
    
    <div className={classes.wrapper}>
        <Toolbar disableGutters> 
            <Typography className={classes.title} variant="h6" noWrap> 
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, aliquam.
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
    </div>
};