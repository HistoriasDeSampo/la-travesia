import React from "react";
import Cell from "./Cell";

function Row(props) {

  function cellMapper(cell, index) {

    return ( < Cell key = {
        "cell" + props.rowIndex + "" + index
      }
      rowIndex = {
        props.rowIndex
      }
      colIndex = {
        index
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
      interactable = {
        props.isInteractable(props.currentMap[props.rowIndex][index])
      }
      mapDataTranslate = {
        props.mapDataTranslate
      }
      currentMap={
        props.currentMap
      }

      setGameState={
        props.setGameState
      }

      setCurrentMap={
        props.setCurrentMap
      }

      getCellStyleClass={
        props.getCellStyleClass
      }

      />);
    }


    return ( < div className = "row" > {
        props.rowData.map(cellMapper)
      } <
      /div>);
    }

    export default Row;
