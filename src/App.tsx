import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Todos from './Components/Todos';
// import Todos from './Components/Todos';


function App() {


  return (
    <div className="App">
      <Todos />
    </div>
  );
}

export default App;
