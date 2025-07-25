import { useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todo'

function App() {

  return (
    <>
      <div> 
        <h1 className="text-3xl font-bold underline">
          Learn Redux Toolkit
          <AddTodo />
          <Todos />
        </h1>
      </div>
    </>
  )
}

export default App
