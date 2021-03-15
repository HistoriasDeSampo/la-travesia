import React from "react";
import Grid from "./Grid";
import "./isoMap.css"


function IsoMap(props) {
  const startingMap = props.startingMap
  const [currentMap, setCurrentMap] = React.useState(startingMap);


  return ( <
    div className = "wrapper" >
    <
    Grid w = {
      props.w
    }
    h = {
      props.h
    }

    cellSize={
      props.cellSize
    }
    currentMap = {
      currentMap
    }
    actionOnCell = {
      props.handleActionOnCell
    }
    mapDataTranslate={
      props.mapDataTranslate
    }
    nonInteractable={
      props.nonInteractable
    }

    setGameState={
      props.setGameState
    }

    setCurrentMap={
      setCurrentMap
    }
    getCellStyleClass={
      props.getCellStyleClass
    }

    isInteractable={
      props.isInteractable
    }

    /> < /
    div >
  )


}

export default IsoMap;
