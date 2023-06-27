import React from 'react';
import Game from './Game';
import Online from './Online';
// import CanvasEnd from './CanvasEnd';

function App()
{
  return(
  <div>
    <Game/>
    <Online/>
    {/* <CanvasEnd isWon={true}/> */}
  </div>
  );
}
export default App;