import React from "react";
import GameFrame from "./GameFrame";
import * as Battleships from "./BattleshipsUtils/BattleshipsUtils.js";
import "./app.css"
import Content from "../content.json";


function App() {

  let [activeSections, setActiveSections] = React.useState(0);

  function getSectionClass(i){
    if (i == activeSections){
      return ("section show");
    }else if(i < activeSections){
      return ("section");
    }else{
      return ("section hide");
    }
  }

  function paragraphMapper(text){
    return (<p> {text} </p>);
  }

  function sectionMapper(section, index){
    return(
    <div className={getSectionClass(index)}>
      {section.p.map(paragraphMapper)}
      {section.hasOwnProperty("game")?
      <GameFrame
            rowData={section.game.rowData}
            colData={section.game.colData}
            hints={section.game.hints}
            ships={section.game.ships}
            cellSize={section.game.cellSize}
            notifyGameDone={
              () => {
                setActiveSections(index + 1);
              }
            }
      /> :null}
      </div>
);
  }



return(
  <div className="content">
  {Content.map(sectionMapper)}
      </div>
);

  }

  export default App;
