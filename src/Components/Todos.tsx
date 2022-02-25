import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface Todo {
    id: number,
    text: string,
}

type ActionType =
    | { type: "ADD"; text: string }
    | { type: "REMOVE"; id: number };


const Todos = () => {
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

    // console.log(todo)
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
        <div> {/* <Todos /> */}
            <h1>To Do List</h1>
            <input type="text" ref={todoRef} />
            <button onClick={onAdd}>Add</button>
            {
                todos.map((todo) => (
                    <div>{todo.text}<button onClick={() => onRemove(todo.id)}>Remove</button></div>


                ))
            }</div>
    )
}

export default Todos