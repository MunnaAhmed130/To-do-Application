import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';

interface Todo {
  id: number,
  text: string,
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };


function App() {

  const [myState, setMyState] = useState<Todo[]>();
  // console.log(myState)

  useEffect(() => {

    // localStorage.setItem()
  }, [])

  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }

  // console.log(todos)
  const [todos, dispatch] = useReducer(reducer, []);

  const todoRef = useRef<HTMLInputElement>(null);

  const onAdd = useCallback(() => {
    if (todoRef.current) {
      dispatch({
        type: "ADD",
        text: todoRef.current.value
      })
      todoRef.current.value = "";
    }
  }, [])

  const onRemove = (id: number) => {
    dispatch({
      type: "REMOVE",
      id: id
    })
  }

  return (
    <div className="App">
      {/* <Todos /> */}
      <input type="text" ref={todoRef} /> <br />
      <button onClick={onAdd}>Add</button>
      {
        todos.map((todo) => (
          <div key={todo.id}>{todo.text} <button onClick={() => onRemove(todo.id)}>Remove</button></div>

        ))
      }
    </div>
  );
}

export default App;
