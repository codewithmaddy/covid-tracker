import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <div>
          <h1>Covid Tracker</h1>
          <h6>a initiave by cwm</h6>
        </div>
          <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="option 2">option 2</MenuItem>
            <MenuItem value="option 3">option 3</MenuItem>
            <MenuItem value="option 4">option 4</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
