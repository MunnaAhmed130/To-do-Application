import * as React from 'react';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalGasStationRounded } from '@mui/icons-material';
import { idText } from 'typescript';
import { constants } from 'zlib';




interface ITodo {
    id: number,
    text: string,
    isCompleted?: boolean
}



type ActionType =
    | { type: "ADD"; text: string }
    | { type: "REMOVE"; id: number }
    // | { type: "CHECKED"; id: number, isCompleted: boolean};

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Todos = () => {

    // let uid = ;
    // console.log(uid)
    // useEffect(() => {

    //     // localStorage.setItem()
    // }, [])

    const [isCompleted, setIsCompleted] = useState<boolean>(false);



    function reducer(state: ITodo[], action: ActionType) {
        switch (action.type) {
            case "ADD":
                return [
                    ...state,
                    {
                        id: state.length + 1,
                        text: action.text,
                        isCompleted: isCompleted
                    },
                ];
            case "REMOVE":
                return state.filter(({ id }) => id !== action.id);
            // case "CHECKED":
            //     return [
            //         ...state,
            //         {
            //             // text: action.text,
            //             isCompleted: true
            //         },
            //     ];
            // case "CHECKED":
                // return state.map(({id})=> []...state,{isCompleted: isComplete})
        }
    }



    // console.log(todo)

    const [todos, dispatch] = useReducer(reducer, []);
    const [myState, setMyState] = useState<ITodo[]>([]);

    console.log(isCompleted)
    useEffect(() => {
        const getItem = localStorage.getItem('Todo');
        if (getItem) {
            setMyState(JSON.parse(getItem));
        }

    }, [])
    useEffect(() => {
        let item: ITodo[] = todos.map((todo) => todo)
        console.log(item)
        setMyState(item);


    }, [todos])
    useEffect(() => {
        localStorage.setItem("Todo", JSON.stringify(myState));
    }, [myState])


    console.log(todos)
    // let local = localStorage.setItem("Todo", JSON.stringify([...todos]));
    console.log(myState)



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

    // const handleCheck = (id: number, isCompleted: boolean) => {
    //     dispatch({
    //         type: "CHECKED",
    //         id: id,
    //         isCompleted: true
    //     })
    // }

    // const checkboxref = useRef<HTMLInputElement>(null);

    // const handleOnClick = useCallback(() => {
    //     const node = checkboxref.current;
    //     if(node){
    //      node.focus();
    //      node.select();
    //      }
    //   }, [checkboxref]);


    // const handleCheck = (id: number) => {
    //     let updatedTodos = todos.map((todo) => {
    //         if (todo.id === id) {
    //             return {
    //                 ...todo,
    //                 isCompleted: !todo.isCompleted,
    //             }
    //         }
    //         return todo
    //     })

    // }

    const handleChange = (id: number) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isCompleted: setIsCompleted(!setIsCompleted)
                }
            }
            return todo

        })
        // setIsCompleted(true);
        console.log(updatedTodos)
        console.log(todos)
    }


    return (
        <div > {/* <Todos /> */}
            <Typography variant="h4" component="div" sx={{ mt: 4, mb: 5, fontWeight: 'medium' }} gutterBottom>
                To Do List
            </Typography>
            {/* <h1>To Do List</h1> */}
            <div style={{
                marginBottom: "2rem"
            }}>

                <input
                    type="text"
                    ref={todoRef}
                    placeholder="Add A Task"
                    style={{
                    border: "none",
                    outline: "none",
                    borderBottom: "1px solid black",
                        marginRight: "5px",
                        fontSize: "1.1rem",
                        backgroundColor: "white"
                }} />
                <Button variant="contained" onClick={onAdd}>Add</Button>

            </div>

            {/* <Box sx={{ flexGrow: 1 }}>
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
            </Box> */}
            <Box sx={{ flexGrow: 1 }}>
                {todos.length !== 0 &&
                    <div style={{
                        width: "500px",
                        margin: "auto",
                        marginTop: "7rem",
                        border: "1px solid transparent",
                        borderRadius: "5px",
                        paddingBlock: "1rem",
                        backgroundColor: "gray",
                        color: "white"
                    }}>
                        {
                            todos.map((todo: ITodo) => (

                                <div key={uuidv4()} style={{
                                    textAlign: "left",
                                    paddingLeft: "2rem",
                                    paddingBlock: ".2rem",
                                    listStyleType: "circle",
                                    width: "300px",
                                    margin: "auto",
                                    // border: "1px solid black",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <li style={{
                                        listStyleType: "none",
                                        alignItems: "center"
                                    }}
                                    >
                                        <input
                                            type="checkbox"
                                            // checked={}
                                            onChange={() => handleChange(todo.id)}
                                        // onClick={() => handleCheck(todo.isCompleted
                                        // ref={checkboxref}
                                        />

                                        {todo.text}


                                    </li>
                                    <IconButton onClick={() => onRemove(todo.id)} aria-label="delete" sx={{}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>


                            ))
                        }

                    </div>}
                {
                    !todos.length && <h4 style={{
                        fontSize: "1.2rem",
                        marginTop: "5rem",
                        display: "inline-block"
                    }}>No Unfinished Task</h4>
                }
            </Box>



        </div >
    )
}

export default Todos