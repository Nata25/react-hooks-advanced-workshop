// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()

function useCount () {
  const context = React.useContext(CountContext)
  React.useDebugValue(context[0])
  if (!context) {
    throw new Error(`useCount must be used within CountProvider`)
  }
  return context
}

function CountProvider ({children}) {
  const value = React.useState(0)
  return (
    <div className="context">
      <CountContext.Provider value={value} children={children} />
    </div>
  )
}

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
