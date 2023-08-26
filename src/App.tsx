import React from 'react';
import './App.css';
import { SnackbarProvider } from 'notistack';
import { Tasks } from './componensts/Tasks/Tasks';

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={5}>
        <Tasks />
      </SnackbarProvider>
    </>
  );
}

export default App;
