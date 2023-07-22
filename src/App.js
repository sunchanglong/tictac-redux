import React from 'react';
import logo from './logo.svg';
import  Board  from './features/game/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board></Board>
      </header>
    </div>
  );
}

export default App;
