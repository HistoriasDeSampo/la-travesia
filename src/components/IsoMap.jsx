import React from "react";
import Grid from "./Grid"


function IsoMap(props) {
  const startingMap = props.startingMap
  const [currentMap, setCurrentMap] = React.useState(startingMap);
  let numRows = currentMap[0].length - 1;
  let numCols = currentMap.length - 1;
  let shipsOnCols = [];
  let shipsOnRows = [];


  function isShip(code){
    return (code === "B");
  }

  function setNewCell(newMap, row, col) {
    if(newMap[row][col] === "."){
      newMap[row][col] = "W";
    }else if(newMap[row][col] === "W"){
      newMap[row][col] = "B";
    }else{
      newMap[row][col] = ".";
    }

    return (newMap)
  }

  function checkShips(){
    let result = true;
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        let arround = false;
        if(isShip(currentMap[i][j])){
          if(0 < i-1 && 0 < j-1){
            arround = arround || isShip(currentMap[i-1][j-1])
          }
          if(0 < i-1 && j+1 < numCols){
            arround = arround || isShip(currentMap[i-1][j+1])
          }
          if(i+1 < numRows && 0 < j-1){
            arround = arround || isShip(currentMap[i+1][j-1])
          }
          if(i+1 < numRows && j+1 < numCols){
            arround = arround || isShip(currentMap[i+1][j+1])
          }
          result &= !arround

        }

      }
    }
    return (result)
  }

  function checkGame() {
    let result = true;
    for (var i = 0; i < numRows; i++) {
      let ships = 0
      let water = 0
      for (var j = 0; j < numCols; j++) {
        if (currentMap[i][j]=== "B"){
          ships += 1;
        }else if(currentMap[i][j]=== "W"){
          water += 1;
        }
      }
      shipsOnCols[i] = ships
      result &= currentMap[i][numCols -1]=== ships && (ships + water=== numRows)
    }


    for (var r = 0; r < numCols - 1; r++) {
      let ships = 0
      let water = 0
      for (var c = 0; c < numRows; c++) {
        if (currentMap[r][c]=== "B"){
          ships += 1;
        }else if(currentMap[r][c]=== "W"){
          water += 1;
        }
      }
      shipsOnCols[c] = ships
      result &= (currentMap[numCols - 1][c]=== ships) && (ships + water=== numCols)
    }

    result &= checkShips()
    return(result);
  }

  function handleActionOnCell(row, col) {
    let newMap = currentMap;

    newMap = setNewCell(newMap,row, col);

    props.mapComplete(checkGame);

    setCurrentMap((oldMap) => {
      return (oldMap.map((thisRow, rowIndex) => {
        return (thisRow.map((thisCell, colIndex) => {
          if (thisCell !== newMap[rowIndex][colIndex]) {
            return (newMap[row][col])
          } else {
            return (thisCell)
          }

        }));
      }));
    })
  }


  return ( <
    div className = "wrapper" >
    <
    Grid w = {
      props.w
    }
    h = {
      props.h
    }
    currentMap = {
      currentMap
    }
    actionOnCell = {
      handleActionOnCell
    }
    mapDataTranslate={
      props.mapDataTranslate
    }
    nonInteractable={
      props.nonInteractable
    }
    shipsOnCols={
      shipsOnCols
    }
    shipsOnRows={
      shipsOnRows
    }

    /> < /
    div >
  )


}

export default IsoMap;
