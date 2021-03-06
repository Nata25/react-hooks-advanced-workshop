// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useSafeDispatch (dispatch) {
  const isAlive = React.useRef(false)

  React.useEffect(() => {
    isAlive.current = true
    return () => isAlive.current = false
  }, [])

  return React.useCallback((args) => {
    console.log('args', args)
    if (isAlive.current) dispatch(args)
  }, [dispatch])

}

function useAsync (action) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    data: null,
    error: null,
    ...action
  })

  const safeDispatch = useSafeDispatch(dispatch)

  const run = React.useCallback((asyncCallback) => {
    if (!asyncCallback) return

    safeDispatch({type: 'pending'})

    asyncCallback.then(
      data => {
        safeDispatch({type: 'resolved', data})
      },
      error => {
        safeDispatch({type: 'rejected', error})
      },
    )
  }, [safeDispatch])

  return {
    ...state,
    run
  }
}

function PokemonInfo({pokemonName}) {
  // const isComponentAlive = React.useRef(true)

  const {data, status, error, run } = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  })
  
  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    run(fetchPokemon(pokemonName))
    // return () => {
    //   console.log('unmount')
    //   // isComponentAlive.current = false
    //   cancel()
    // }
  }, [pokemonName, run])

  if (status === 'idle' || !pokemonName) {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={data} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
