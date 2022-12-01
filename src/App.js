import React from 'react'
import './App.css'
import { Board } from './components/Board'
import { Counter } from './features/counter/Counter'

function App () {
  return (
    <h1 style={{color: "white", textAlign: "center"}}>
      Management Board
      <Board></Board>
    </h1>
  )
}

export default App
