import React, { useState } from 'react';
import Table from './components/Table/Table';
import "./App.css";

const App = () => {

  const [dimensions, setDimensions] = useState({}); 
  const handleChange = (e) => {
    setDimensions({...dimensions, [e.target.name]:e.target.value});
  }

  return (
    <div className='App'>
      <div className='RowCol'>
        <div>
          <label>Rows : </label>
          <input type="number" name='rows' placeholder='rows' onChange={handleChange}/>
        </div>
        <div>
          <label>Columns : </label>
          <input type="number" name='cols' placeholder='cols' onChange={handleChange}/>
        </div>
      </div>
      <Table x={parseInt(dimensions.rows)} y={parseInt(dimensions.cols)} />
    </div>
  )
}

export default App
