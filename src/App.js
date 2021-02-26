import './App.css';
import Table from './components/Table/Table'

const createData = (name, calories, fat, carbs, protein) => ({name, calories, fat, carbs, protein});
const createData2 = (name, v1, v2) => ({name, v1, v2});

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const headCells2 = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name (test)' },
    { id: 'v1', numeric: true, disablePadding: false, label: 'Value 1 (test)' },
    { id: 'v2', numeric: true, disablePadding: false, label: 'Value 2 (test)' },
];

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

const rows2 = [
  createData2('Test1', 4, 3),
  createData2('Test2', 3, 2),
  createData2('Test3', 2, 4),
  createData2('Test4', 1, 1),
];

function App() {

    return (
        <div className="App">
            <Table 
                headCells={headCells2}
                rows={rows2}
            />
        </div>
    );
}

export default App;
