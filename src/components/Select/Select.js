import React from 'react'

import { 
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    ListItemIcon
} from '@material-ui/core'

const StyledSelect = ({ name, value, handleChange, label, values}) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel id="select-outlined-label">{label}</InputLabel>
            <Select
                labelId="select-outlined-label"
                id="select-outlined"
                value={value}
                onChange={handleChange}
                label={label}
                inputProps={{
                    name,
                    id: 'select-outlined-label',
                }}
                SelectDisplayProps={{ style: { 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}}
            >
                {values.map((item, id) => <MenuItem key={id} value={id}>
                        {item.icon && (
                            <ListItemIcon style={{minWidth: 40}}>
                                {item.icon}
                            </ListItemIcon>
                        )}
                    {item.label}
                </MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default StyledSelect;