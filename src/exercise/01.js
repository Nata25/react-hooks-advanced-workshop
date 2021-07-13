// useReducer: simple Counter
// http://localhost:3000/isolated/final/01.js

import * as React from 'react'

const countReducer = (state, update) => {
  let stateUpdated
  if (typeof update === 'function') {
    stateUpdated = update(state)
  } else stateUpdated = update
  return {
    ...state,
    ...stateUpdated
  }
}

function Counter({initialCount = 0, step = 1}) {

  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount
  })

  const { count } = state
  const increment = () => {
    // setState({ count: count + step })
    setState(currentState => ({count: currentState.count + step}))
  }
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
