# Material-UI Responsive Table
## PC
![Table on PC](https://raw.githubusercontent.com/michu990902/material-ui-responsive-table/master/screenshots/1.png)

## Tablet
![Table on tablet](https://raw.githubusercontent.com/michu990902/material-ui-responsive-table/master/screenshots/2.png)

## Smartphone
![Table on smartphone](https://raw.githubusercontent.com/michu990902/material-ui-responsive-table/master/screenshots/3.png)

## Filters
**Automatically generated** based on the *column data type*

![Table on smartphone](https://raw.githubusercontent.com/michu990902/material-ui-responsive-table/master/screenshots/5.png)
![Table on smartphone](https://raw.githubusercontent.com/michu990902/material-ui-responsive-table/master/screenshots/4.png)

## How to use
```javascript
import Table from './components/Table/Table'

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

const columns = [
    {
        id: 'name',
        type: 'string', //bool, number, string, date
        label: 'Name',
    },
    {
        id: 'v1',
        type: 'number',
        label: 'Value 1',
    },
    {
        id: 'v2',
        type: 'number',
        label: 'Value 2',
        mapValues: {
            1: <AccessAlarmIcon/>,
            2: <AccountCircleIcon/>,
            3: <AccountBalanceIcon/>,
            4: <AddAlertIcon/>,
            5: <AddPhotoAlternateIcon/>,
        },
    },
];

const createData = (name, v1, v2) => ({name, v1, v2});

const rows = [
  createData('Test1', 4, 3),
  createData('Test2', 3, 2),
  createData('Test3', 2, 4),
  createData('Test4', 1, 1),
];

function App() {
    return (
        <div className="App">
            <Table
                title="Table Header"
                columns={columns}
                rows={rows}
            />
        </div>
    );
}

export default App;
```