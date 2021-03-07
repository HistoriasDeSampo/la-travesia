import React from "react";
function Cell(props){
  let cellStyle = {
    width: props.cellSize + "px",
    height: props.cellSize + "px",
  }
  let noPerspective= {
      transform: "rotate3d(0,  0, 1, -" + props.zAngle + "deg) rotate3d(0,  1, 0, -" + props.xAngle + "deg) translate(0px, -" + props.cellSize * 4/3  +"px) ",
      width: props.cellSize * 3 + "px",
      height: props.cellSize * 3 + "px",
      overflow: "visible",
      position: "absolute",
      pointerEvents: "none"
  }

  function handleClick(){
    props.actionOnCell(props.rowIndex, props.colIndex);
  }
  let className = props.isInside && props.isInteractable ? 'cell interactable' : 'cell'
  className += props.cellValue == "B" ? ' ship' : ''
  className += props.cellValue == "W" ? ' sea' : ''

  return(
    <div className={className} onClick={props.isInteractable && props.isInside? handleClick: null} style={cellStyle}>
      <div className="cellContent" style={noPerspective}>
        {props.mapDataTranslate(props.cellValue)}
      </div>
    </div>
  );
}

export default Cell;
