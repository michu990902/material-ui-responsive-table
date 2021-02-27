import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Toolbar,
    IconButton,
    Typography,
    TextField
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import Select from '../Select/Select'

const useStyles = makeStyles(theme => ({
    root: {
        flexDirection: '100%',
    },
    title: {
        flexGrow: 1, 
    },
    closeBtn: {
        marginRight: -theme.spacing(1.5), 
    },
    select: {
        marginBottom: theme.spacing(2), 
    },
}));

const getConditions = {
    bool: [
        { id: "equal", label: "is equal to" },
    ],
    number: [
        { id: "equal", label: "is equal to" },
        { id: "not_equal", label: "is not equal" },
        { id: "bigger", label: "is greater than" },
        { id: "lower", label: "is less than" },
    ],
    string: [
        { id: "equal", label: "is equal to" },
        { id: "not_equal", label: "is not equal" },
        { id: "includes", label: "includes" },
        { id: "not_includes", label: "does not include" },
    ],
    date: [
        { id: "equal", label: "is equal to" },
        { id: "not_equal", label: "is not equal" },
        { id: "bigger", label: "is greater than" },
        { id: "lower", label: "is less than" },
    ],
};

const FilterDialog = ({ isOpen, addFilter, handleClose, columns }) => {
    const classes = useStyles(); 
    const [fieldName, setFieldName] = useState('name');
    const [condition, setCondition] = useState('equal');
    const [value, setValue] = useState('');
    const [conditions, setConditions] = useState(getConditions['string']);

    const handleName = ev => {
        const name = ev.target.value;
        const col = columns.find(c => c.id === name);
        setFieldName(name);
        setCondition('equal');
        setConditions(getConditions[col.type]);
        setValue('');
    };

    const handleCondition = ev => {
        setCondition(ev.target.value);
    };

    const handleOk = () => {
        const col = columns.find(c => c.id === fieldName);
        const lbl = getConditions[col.type].find(c => c.id === condition).label;
        addFilter(col.id, col.label, col.type, condition, lbl, value);
        handleClose();
    };

    return (
        <Dialog
            fullWidth
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title" disableTypography>
                <Toolbar disableGutters> 
                    <Typography id="tableTitle" className={classes.title} variant="h5" component="h2" noWrap> 
                        Add Filter
                    </Typography>
                    <IconButton className={classes.closeBtn} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </DialogTitle>
            <DialogContent>
                <form noValidate>
                    <div className={classes.select}>
                    <Select
                        name="column"
                        label="Column"
                        handleChange={handleName}
                        value={fieldName}
                        values={columns}
                    />
                    </div>
                    <div className={classes.select}>
                    <Select
                        name="condition"
                        label="Condition"
                        handleChange={handleCondition}
                        value={condition}
                        values={conditions}
                    />
                    </div>
                    <div className={classes.select}>
                        <TextField 
                            id="filter-value"
                            label="Value"
                            variant="outlined"
                            fullWidth
                            value={value}
                            onChange={ev => setValue(ev.target.value)}
                        />
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FilterDialog;