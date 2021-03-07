import React from "react";
import Cell from "./Cell";

function Row(props) {

  function cellMapper(cell, index) {
    let shipsOnCol=index < props.shipsOnCols.lenght ? props.shipsOnCols[index] : 0
    let shipsOnRow=props.rowIndex < props.shipsOnRows.lenght ? props.shipsOnRows[index] : 0

    return ( < Cell key = {
        "cell" + props.rowIndex + "" + index
      }
      rowIndex = {
        props.rowIndex
      }
      colIndex = {
        index
      }
      xAngle = {
        props.xAngle
      }
      zAngle = {
        props.zAngle
      }
      cellSize = {
        props.cellSize
      }
      cellValue = {
        props.rowData[index]
      }
      actionOnCell = {
        props.actionOnCell
      }
      isInteractable = {
        !props.nonInteractable.includes(props.rowIndex+","+ index)
      }
      isInside={
        index < props.innerCols && props.isInnerRow
      }
      shipsOnRow={
        shipsOnRow
      }
      shipsOnCol={
        shipsOnCol
      }

      mapDataTranslate = {
        props.mapDataTranslate
      }

      />);
    }


    return ( < div className = "row" > {
        props.rowData.map(cellMapper)
      } <
      /div>);
    }

    export default Row;
