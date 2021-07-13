// useReducer: simple Counter
// http://localhost:3000/isolated/final/01.js

import * as React from 'react'

const countReducer = (state, { type, step }) => {
  const { count } = state
  switch (type) {
    case 'INCREMENT':
      return ({
        ...state,
        count: count + step
      })
    default:
      console.error(`No such action type: ${type}`)
      return state
  }
}

function Counter({initialCount = 0, step = 1}) {

  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount
  })

  const { count } = state
  const increment = () => {
    // setState({ count: count + step })
    // setState(currentState => ({count: currentState.count + step}))
    dispatch({type: 'INCREMENT', step})
  }
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
