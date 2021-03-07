import React from "react";
import IsoMap from "./IsoMap"

function App() {


  const startingMap = [
    [".", ".", ".", ".", ".", "W", "3"],
    [".", ".", ".", ".", ".", ".", "1"],
    [".", ".", ".", ".", ".", ".", "2"],
    [".", ".", ".", "B", ".", ".", "1"],
    [".", ".", ".", ".", ".", ".", "0"],
    [".", ".", ".", ".", ".", ".", "3"],
    ["2", "1", "2", "1", "1", "3"]
  ]

  const boats=["·", "·", "·", "· ·", "· ·", "· · ·"]

  let [gameDone, setGameDone] = React.useState(false);

  function mapComplete(state){
    console.log(state);
    setGameDone((gameDone) =>{
      return state
    })
  }

  function mapDataTranslate(mapValue) {
    let cellStyle={
      fontSize: "40px",
      fontWeight: "bold",
      color: "grey"
    }
    if (mapValue=== "B"){
      cellStyle["color"] = "#ff9900"
      return ( < div style={cellStyle}> {
          "`º´"
        } < /div>);
    }else if (mapValue=== "W"){
      cellStyle["color"] = "white"
      return ( < div style={cellStyle}> {
          "~"
        } < /div>);
    }else if (mapValue=== "."){
      cellStyle["color"] = "grey"
    }else{
      cellStyle["color"] = "#000"
      return ( < div style={cellStyle}> {
          mapValue
        } < /div>);
    }


    return ( < p style={cellStyle}> {
        mapValue
      } < /p>);
    }

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
        mapDataTranslate
      }
      mapComplete={
        mapComplete
      }
      nonInteractable = {
        ["0,5", "3,3"]
      }
      />


      < /div >
    );
  }

  export default App;
