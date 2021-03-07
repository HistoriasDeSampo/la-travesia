import React from "react";
import Row from "./Row"

function Grid(props) {
  let cellSize = 70;
  let xAngle = 60;
  let zAngle = 45;
  let color = "rgba(0,0,0,0.2)"
  let gridStyle = {
    transformOrigin: "center",
    transform: "rotate3d(1, 0, 0, " + xAngle + "deg) rotate3d(0, 0, 1, " + zAngle + "deg)",
    border: "3px solid",
    width: (cellSize * (props.currentMap[0].length - 1)) + "px",
    height: (cellSize * (props.currentMap.length - 1)) + "px",
    backgroundImage: "linear-gradient(" + color + " 2px, transparent 1px), linear-gradient(90deg," + color + " 2px, transparent 1px)",
    backgroundSize: cellSize + "px " + cellSize + "px"
  }

  function rowMapper(row, index) {
    return ( < Row rowData = {
        row
      }
      key = {
        "row" + index
      }
      rowIndex = {
        index
      }
      xAngle = {
        xAngle
      }
      zAngle = {
        zAngle
      }
      cellSize = {
        cellSize
      }
      actionOnCell = {
        props.actionOnCell
      }
      isInnerRow={
        index < props.currentMap.length - 1
      }
      innerCols={
        props.currentMap[0].length - 1
      }

      mapDataTranslate={
        props.mapDataTranslate
      }
      nonInteractable={
        props.nonInteractable
      }

      shipsOnCols={
        props.shipsOnCols
      }
      shipsOnRows={
        props.shipsOnRows
      }


      />);
    }

    return ( <
      div className = "grid"
      style = {
        gridStyle
      } >
      {
        props.currentMap.map(rowMapper)
      } <
      /div>
    );
  }

  export default Grid;
