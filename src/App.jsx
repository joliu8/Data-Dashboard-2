import { useState } from 'react'
import './App.css'
import Header from "./components/Header.jsx"
import List from "./components/List.jsx"

function App() {


  return (
    <div className='page'>
      <Header />

      <List/>

    </div>
  )
}

export default App
