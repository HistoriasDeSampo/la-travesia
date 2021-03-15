import React from "react";
import IsoMap from "./IsoMap/IsoMap";
import * as Battleships from "./BattleshipsUtils/BattleshipsUtils.js";
import "./BattleshipsUtils/battleships.css"

function GameFrame(props){

  const [startingMap, boats]=Battleships.generateMap(props.rowData, props.colData, props.hints, props.ships);

  let [gameDone, setGameDone] = React.useState(false);

  function setGameState(state){
    if(state){
      props.notifyGameDone()
    }
    setGameDone(state);
  }

    return (
      <div className="game">

      <div>{boats.map((boat, index) => {
        return(
          <div key={"boat"+index}className="boat">
            {boat}
          </div>
        )
      })}</div>

      <
      IsoMap w = {
        startingMap[0].length
      }
      h = {
        startingMap.length
      }
      cellSize={
        props.cellSize
      }

      startingMap = {
        startingMap
      }

      mapDataTranslate = {
        Battleships.mapDataTranslate
      }


      handleActionOnCell={
        Battleships.handleActionOnCell
      }

      setGameState={
        setGameState
      }
      getCellStyleClass={
        Battleships.getCellStyleClass
      }

      isInteractable={
        Battleships.isInteractable
      }
      />


      <div className="gameDone">{gameDone? <p>Done</p> : null}</div>
      < /div >
    );
}

export default GameFrame
