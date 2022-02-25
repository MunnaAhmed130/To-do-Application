import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';



interface Todo {
    id: number,
    text: string,
}

type ActionType =
    | { type: "ADD"; text: string }
    | { type: "REMOVE"; id: number };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
        if (todoRef.current?.value.length) {
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
            <Typography variant="h4" component="div" sx={{ mt: 4, mb: 5, fontWeight: 'medium' }} gutterBottom>
                To Do List
            </Typography>
            {/* <h1>To Do List</h1> */}
            <div style={{
                marginBottom: "2rem"
            }}>

                <input type="text" ref={todoRef} style={{
                    border: "none",
                    outline: "none",
                    borderBottom: "1px solid black",
                    marginRight: "5px"
                }} />
                <Button variant="contained" onClick={onAdd}>Add</Button>

            </div>


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>

                    {
                        todos.map((todo) => (
                            <Grid item xs={4}>
                                <Item key={todo.id}> <Typography  >
                                    {todo.text}
                                </Typography>

                                    <Button onClick={() => onRemove(todo.id)} size="small">Remove</Button>
                                </Item>
                            </Grid>
                        ))
                    }


                </Grid>



            </Box>


        </div >
    )
}

export default Todos