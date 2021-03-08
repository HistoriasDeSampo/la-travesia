let shipsOnCols = []
let shipsOnRows = []

function mapDataTranslate(mapValue, currentMap) {
  let cellStyle = {
    fontSize: "40px",
    fontWeight: "bold",
    color: "grey"
  }
  if (isShip(mapValue)) {
    cellStyle["color"] = "#ff9900"
    return ( < div style = {
        cellStyle
      } > {
        "`º´"
      } < /div>);
  }
  else if (isWater(mapValue)) {
    cellStyle["color"] = "white"
    return ( < div style = {
        cellStyle
      } > {
        "~"
      } < /div>);
    }
    else if (mapValue === ".") {
      cellStyle["color"] = "grey"
    } else {
      cellStyle["color"] = "#000"
      return ( < div style = {
          cellStyle
        } > {
          mapValue.replace(" F", "")
        } < /div>);
    }
}

function isShip(code){
  let codeSplitted = code.split(" ");
  return (codeSplitted[0] === "B");
}

function isWater(code){
  let codeSplitted = code.split(" ");
  return (codeSplitted[0] === "W")
}

function isNumber(code){
  let codeSplitted = code.split(" ");
  return (!isNaN(codeSplitted[0]))
}

function isInteractable(code){
  let codeSplitted = code.split(" ");
  return (codeSplitted[codeSplitted.length - 1] !== "F")
}

function updateShipsOnCols(col, amount){
  shipsOnCols[col] = amount;
  return (shipsOnCols);
}
function updateShipsOnRows(row, amount){
  shipsOnRows[row] = amount;
  return (shipsOnRows);
}

function checkShips(currentMap) {
  let numRows = currentMap.length - 1;
  let numCols = currentMap[0].length;

  let result = true;
  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      let arround = false;
      if (isShip(currentMap[i][j])) {
        if (0 < i - 1 && 0 < j - 1) {
          arround = arround || isShip(currentMap[i - 1][j - 1])
        }
        if (0 < i - 1 && j + 1 < numCols) {
          arround = arround || isShip(currentMap[i - 1][j + 1])
        }
        if (i + 1 < numRows && 0 < j - 1) {
          arround = arround || isShip(currentMap[i + 1][j - 1])
        }
        if (i + 1 < numRows && j + 1 < numCols) {
          arround = arround || isShip(currentMap[i + 1][j + 1])
        }
        result &= !arround

      }

    }
  }
  return (result)
}

function checkGame(currentMap) {
  let numRows = currentMap.length - 1;
  let numCols = currentMap[0].length -1;

  let result = true;
  for (var i = 0; i < numRows; i++) {
    let ships = 0
    let water = 0
    for (var j = 0; j < numCols; j++) {
      if (isShip(currentMap[i][j])){
        ships += 1;
      }else if(isWater(currentMap[i][j])){
        water += 1;
      }
    }
    updateShipsOnRows(i, ships);
    result &= parseInt(currentMap[i][numCols])=== ships && (ships + water=== numRows)
  }

  for (var c = 0; c < numCols; c++) {
    let ships = 0
    let water = 0
    for (var r = 0; r < numRows; r++) {
      if (isShip(currentMap[r][c])){
        ships += 1;
      }else if(isWater(currentMap[r][c])){
        water += 1;
      }
    }
    updateShipsOnCols(c, ships);
    result &= parseInt(currentMap[numRows][c])=== ships && (ships + water=== numCols)
  }
  result &= checkShips(currentMap)
  return(result);
}

function handleActionOnCell(currentMap, row, col, setGameState, setCurrentMap){
  let newMap =  setNewCell(currentMap,row, col);

  setGameState(checkGame(currentMap));

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

function setNewCell(newMap, row, col) {
  if (newMap[row][col] === ".") {
    newMap[row][col] = "W";
  } else if (isWater(newMap[row][col])) {
    newMap[row][col] = "B";
  } else {
    newMap[row][col] = ".";
  }
  return (newMap)
}


function getCellStyleClass(currentMap, row, col){

  let className = isInteractable(currentMap[row][col]) ? 'interactable' : '';
  className += isShip(currentMap[row][col]) ? ' ship ' : ''
  className += isWater(currentMap[row][col]) ? ' sea ' : ''
  className += isNumber(currentMap[row][col]) ? ' number ' : ''
  className += row === currentMap.length -1 ? 'left' : ''
  className += col === currentMap[0].length -1 ? 'right' : ''
  return (className)
}

function repeatStringNumTimes(string, times) {
  if (times > 0)
    return string.repeat(times);
  else
    return "";
}

function generateMap(rowData, colData, sureCells, boatsData){
  let map = []
  let boats = []
  for (var i = 0; i < rowData.length; i++) {
    let row = []
    for (var j = 0; j< colData.length; j++) {
      row[j] = "."
    }
    row[colData.length] =  rowData[i] + " F"
    map[i] = row
  }
  map[rowData.length] = colData.map((x) => (x + " F"))

  for (var i = 0; i < sureCells.length; i++) {

    map[sureCells[i][0]][sureCells[i][1]] = sureCells[i][2] + " F"
  }

  for (var i = 0; i < boatsData.length; i++) {
    for (var j = 0; j < boatsData[i]; j++) {
      let str = "· ";
      str = repeatStringNumTimes(str, i)
      boats.push(str + "·")
    }
  }
  return [map, boats];
}

export {mapDataTranslate, checkGame, setNewCell, shipsOnCols, shipsOnRows, handleActionOnCell, getCellStyleClass, isInteractable, generateMap};
