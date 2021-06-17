import React from "react"
import Sea from "./ships/sea.jpeg"
import B0 from "./ships/B0.png"
import B1C from "./ships/B1C.png"
import B2C from "./ships/B2C.png"
import B3C from "./ships/B3C.png"
import B1R from "./ships/B1R.png"
import B2R from "./ships/B2R.png"
import B3R from "./ships/B3R.png"

let shipsOnCols = []
let shipsOnRows = []

let ships = {
  "B0": B0,
  "B1C": B1C,
  "B2C": B2C,
  "B3C": B3C,
  "B1R": B1R,
  "B2R": B2R,
  "B3R": B3R
}

function mapDataTranslate(mapValue, currentMap) {
  let cellStyle = {
    fontSize: "40px",
    fontWeight: "bold",
    color: "grey"
  }
  if (isShip(mapValue)) {
    let type = mapValue.split(" ")[0];
    return ( < img src = {
        ships[type]
      }

      alt = {
        mapValue + " image"
      }
      />);
    }
    else if (isWater(mapValue)) {
      cellStyle["color"] = "white"

      cellStyle["backgroundImage"] = Sea
      return ( < div > < /div>);
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

      function isShip(code) {
        let codeSplitted = code.split(" ");
        return (codeSplitted[0][0] === "B");
      }

      function isWater(code) {
        let codeSplitted = code.split(" ");
        return (codeSplitted[0] === "W")
      }

      function isNumber(code) {
        let codeSplitted = code.split(" ");
        return (!isNaN(codeSplitted[0]))
      }

      function isSingle(code) {
        code = code.split(" ")[0];
        if (isShip(code)) {
          return (code[1] === "0")
        } else {
          return false;
        }
      }

      function isInteractable(code) {
        let codeSplitted = code.split(" ");
        return (codeSplitted[codeSplitted.length - 1] !== "F")
      }

      function isVertical(code) {
        code = code.split(" ")[0];
        if (isShip(code)) {
          return (code[1] === "0" || code[2] === "C")
        } else {
          return false;
        }
      }

      function isHorizontal(code) {
        code = code.split(" ")[0];
        if (isShip(code)) {
          return (code[1] === "0" || code[2] === "R")

        } else {
          return false;
        }
      }

      function updateShipsOnCols(col, amount) {
        shipsOnCols[col] = amount;
        return (shipsOnCols);
      }

      function updateShipsOnRows(row, amount) {
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
        let numCols = currentMap[0].length - 1;

        let result = true;
        for (var i = 0; i < numRows; i++) {
          let ships = 0
          let water = 0
          for (var j = 0; j < numCols; j++) {
            if (isShip(currentMap[i][j])) {
              ships += 1;
            } else if (isWater(currentMap[i][j])) {
              water += 1;
            }
          }
          updateShipsOnRows(i, ships);
          result &= parseInt(currentMap[i][numCols]) === ships && (ships + water === numRows)
        }

        for (var c = 0; c < numCols; c++) {
          let ships = 0
          let water = 0
          for (var r = 0; r < numRows; r++) {
            if (isShip(currentMap[r][c])) {
              ships += 1;
            } else if (isWater(currentMap[r][c])) {
              water += 1;
            }
          }
          updateShipsOnCols(c, ships);
          result &= parseInt(currentMap[numRows][c]) === ships && (ships + water === numCols)
        }
        result &= checkShips(currentMap)
        return (result);
      }

      function handleActionOnCell(currentMap, row, col, setGameState, setCurrentMap) {
        let newMap = setNewCell(currentMap, row, col);

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

      function getBoatCellHorizontal(map, row, col) {
        if (isInteractable(map[row][col]) && isHorizontal(map[row][col])) {
          let left, right = false;
          left = col > 0 && isShip(map[row][col - 1]);
          right = col + 1 < map[0].length && isShip(map[row][col + 1]);
          if (left && right) {
            return ("B2R");
          } else if (left && !right) {
            return ("B1R");
          } else if (!left && right) {
            return ("B3R");
          } else {
            return ("B0");
          }
        } else {
          return (map[row][col])
        }
      }

      function getBoatCellVertical(map, row, col) {
        if (isInteractable(map[row][col]) && isVertical(map[row][col])) {
          let up, down = false;
          up = row > 0 && isShip(map[row - 1][col]);
          down = row + 1 < map.length && isShip(map[row + 1][col]);
          if (up && down) {
            return ("B2C");
          } else if (up && !down) {
            return ("B1C");
          } else if (!up && down) {
            return ("B3C");
          } else {
            return ("B0");
          }
        } else {
          return (map[row][col])
        }
      }

      function setBoatCell(newMap, row, col) {

        if (isInteractable(newMap[row][col])) {
          let left, right, up, down = false;

          left = col > 0 && (isHorizontal(newMap[row][col - 1]));
          right = col + 1 < newMap[0].length && (isHorizontal(newMap[row][col + 1]));
          up = row > 0 && (isVertical(newMap[row - 1][col]));
          down = row + 1 < newMap.length && (isVertical(newMap[row + 1][col]));


          if (isHorizontal(newMap[row][col]) && !isSingle(newMap[row][col])) {
            up = false;
            down = false;
          } else if (isVertical(newMap[row][col]) && !isSingle(newMap[row][col])) {
            left = false;
            right = false;
          }

          if (left && right) {
            newMap[row][col] = "B2R";
            newMap[row][col - 1] = getBoatCellHorizontal(newMap, row, col - 1);
            newMap[row][col + 1] = getBoatCellHorizontal(newMap, row, col + 1);
          } else if (left && !right) {
            newMap[row][col] = "B1R";
            newMap[row][col - 1] = getBoatCellHorizontal(newMap, row, col - 1);
          } else if (!left && right) {
            newMap[row][col] = "B3R";
            newMap[row][col + 1] = getBoatCellHorizontal(newMap, row, col + 1);
          } else {
            if (up && down) {
              newMap[row][col] = "B2C";
              newMap[row - 1][col] = getBoatCellVertical(newMap, row - 1, col);
              newMap[row + 1][col] = getBoatCellVertical(newMap, row + 1, col);
            } else if (up && !down) {
              newMap[row][col] = "B1C";
              newMap[row - 1][col] = getBoatCellVertical(newMap, row - 1, col);
            } else if (!up && down) {
              newMap[row][col] = "B3C";
              newMap[row + 1][col] = getBoatCellVertical(newMap, row + 1, col);
            } else {
              newMap[row][col] = "B0";
            }
          }

          return newMap
        }else{
          return (newMap)
        }
      }

      function setNewCell(newMap, row, col) {
        if (newMap[row][col] === ".") {
          newMap[row][col] = "W";

        } else if (isWater(newMap[row][col])) {
          newMap = setBoatCell(newMap, row, col);
        } else {
          newMap[row][col] = ".";
          if (col > 0 && isShip(newMap[row][col - 1])) {

            setBoatCell(newMap, row, col - 1)
            if (isSingle(newMap[row][col - 1])) {
              setBoatCell(newMap, row, col - 1)
            }
          }
          if (col + 1 < newMap[0].length && isShip(newMap[row][col + 1])) {

            setBoatCell(newMap, row, col + 1)
            if (isSingle(newMap[row][col + 1])) {
              setBoatCell(newMap, row, col + 1)
            }
          }
          if (row > 0 && isShip(newMap[row - 1][col])) {
            setBoatCell(newMap, row - 1, col)
            if (isSingle(newMap[row - 1][col])) {
              setBoatCell(newMap, row - 1, col)
            }
          }
          if (row + 1 < newMap.length && isShip(newMap[row + 1][col])) {

            setBoatCell(newMap, row + 1, col)
            if (isSingle(newMap[row + 1][col])) {
              setBoatCell(newMap, row + 1, col)
            }

          }

        }
        return (newMap)
      }


      function getCellStyleClass(currentMap, row, col) {

        let className = isInteractable(currentMap[row][col]) ? 'interactable' : '';
        className += isShip(currentMap[row][col]) ? ' ship ' : ''
        className += isWater(currentMap[row][col]) ? ' sea ' : ''
        className += isNumber(currentMap[row][col]) ? ' number ' : ''
        className += row === currentMap.length - 1 ? 'left' : ''
        className += col === currentMap[0].length - 1 ? 'right' : ''
        return (className)
      }

      function repeatStringNumTimes(string, times) {
        if (times > 0)
          return string.repeat(times);
        else
          return "";
      }

      function generateMap(rowData, colData, sureCells, boatsData) {
        let map = []
        let boats = []
        for (var r = 0; r < rowData.length; r++) {
          let row = []
          for (var c = 0; c < colData.length; c++) {
            row[c] = "."
          }
          row[colData.length] = rowData[r] + " F"
          map[r] = row
        }
        map[rowData.length] = colData.map((x) => (x + " F"))

        for (var k = 0; k < sureCells.length; k++) {

          map[sureCells[k][0]][sureCells[k][1]] = sureCells[k][2] + " F"
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

      export {
        mapDataTranslate,
        checkGame,
        setNewCell,
        shipsOnCols,
        shipsOnRows,
        handleActionOnCell,
        getCellStyleClass,
        isInteractable,
        generateMap
      };
