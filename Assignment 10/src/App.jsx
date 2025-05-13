import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import TaskState from './context/taskState'
import Body from './components/Body'



function App() {


  return (
    <>
      <TaskState>
        <Navbar />
        <Body/>
      </TaskState>
    </>
  )
}

export default App
