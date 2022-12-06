import React from 'react'
import './App.css'
import { Board } from './components/Board'
import { Counter } from './features/counter/Counter'
import styled from 'styled-components';
// import "./databaseSetup";

const Container = styled.div``;

function App () {
  return (
    <Container>
      <h1 style={{color: "white", textAlign: "center"}}>
        Management Board
      </h1>
      <Board></Board>
    </Container>
  )
}

export default App
