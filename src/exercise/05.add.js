// useImperativeHandle: scroll to top/bottom
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'

function MyInput() {
  const inputRef = React.useRef()
  console.log('inputRef', inputRef, inputRef.current)
  const focusInput = () => inputRef.current.focus()

  React.useEffect(() => {
    console.log('mounted and painted')
    console.log('input from useEffect', inputRef.current)
  })

  return (
    <div>
      <button onClick={focusInput}>Focus on the input</button>
      <input ref={inputRef} />
    </div>
  )
}

function App() {
  return (
    <div className="messaging-app">
      <h2>Try imperative focus with ref</h2>
      <p/>
      <MyInput />
    </div>
  )
}

export default App
