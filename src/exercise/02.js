// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorage(key, defaultValue = '') {

  function getInitialState() {
    const initialValue = window.localStorage.getItem(key) ?? defaultValue
    let parsedValue;
    try {
        parsedValue = JSON.parse(initialValue);
    } catch (e) {
        parsedValue = initialValue;
    }

    if (typeof parsedValue === "object") {
        // parsedValue is an object
        console.log('object')
        return JSON.stringify(parsedValue)
    } else if (typeof parsedValue === "number") {
        // parsedValue is a number
        console.log('number')
    } else if (typeof parsedValue === "string") {
        // parsedValue is a string
        console.log('string')
    }

    return parsedValue;

  }

  const [state, setState] = React.useState(getInitialState);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name',initialName );

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}


function App() {
  return <Greeting />
}

export default App
