import React from "react";
import IsoMap from "./IsoMap/IsoMap";
import * as Battleships from "./BattleshipsUtils/BattleshipsUtils.js";
import "./BattleshipsUtils/battleships.css"

function App() {

  const [startingMap, boats]=Battleships.generateMap([3,1,2,1,0,3], [2,1,2,1,1,3], [[0,5,"W"], [3,3,"B"]], [3, 2, 1]);

  let [gameDone, setGameDone] = React.useState(false);

    return (
      <div className="game">
      <div>{gameDone? <p>Done</p> : null}</div>
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

      startingMap = {
        startingMap
      }

      mapDataTranslate = {
        Battleships.mapDataTranslate
      }

      mapComplete={
        setGameDone
      }

      handleActionOnCell={
        Battleships.handleActionOnCell
      }

      setGameState={
        setGameDone
      }
      getCellStyleClass={
        Battleships.getCellStyleClass
      }

      isInteractable={
        Battleships.isInteractable
      }
      />

      < /div >
    );
  }

  export default App;
