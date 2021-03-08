import React from "react";
function Cell(props){
  let cellStyle = {
    width: props.cellSize + "px",
    height: props.cellSize + "px",
  }
  let noPerspective= {
      transform: "rotate3d(0,  0, 1, -45deg) rotate3d(0,  1, 0, -60deg) translate(0px, -" + props.cellSize * 4/3  +"px) ",
      width: props.cellSize * 3 + "px",
      height: props.cellSize * 3 + "px",
      overflow: "visible",
      position: "absolute",
      pointerEvents: "none"
  }

  function handleClick(){
    props.actionOnCell(props.currentMap, props.rowIndex, props.colIndex, props.setGameState, props.setCurrentMap);
  }


  return(
    <div className={'cell ' + props.getCellStyleClass(props.currentMap, props.rowIndex, props.colIndex)} onClick={props.interactable ? handleClick: null} style={cellStyle}>
      <div className="cellContent" style={noPerspective}>
        {props.mapDataTranslate(props.cellValue)}
      </div>
    </div>
  );
}

export default Cell;
