import React, { useState } from 'react'
import Row from '../Row/Row';
import {CSVLink} from "react-csv";
import localStyles from './localStyles.module.css';

const Table = (props) => {
  const [data, setData] = useState([]);

  const handleChangedCell = ({x,y},value) => {
    const modifiedData = Object.assign({}, data)
    if (!modifiedData[y]) modifiedData[y] = {}
    modifiedData[y][x] = value
    setData(modifiedData)
  }

  const rows = [];

  for (let y = 0; y < props.y + 1; y += 1) {
    const rowData = data[y] || {}
    rows.push(
      <Row
        handleChangedCell={handleChangedCell}
        key={y}
        y={y}
        x={props.x + 1}
        rowData={rowData}
      />,
    )
  }

  const csvReport = {
    data:Object.entries(data).map(item=>item[1]),
    filename:"spreadsheetData.csv",
  }

  return (
    <>
      <div>
        {rows}
      </div>
      <div className={localStyles.csvButton}>
        <CSVLink {...csvReport} className={localStyles.csvLink}>Generate</CSVLink>
      </div>
    </>
  )
}

export default Table;