import React from 'react';
import './App.css';
import { SnackbarProvider } from 'notistack';
import { Tasks } from './componensts/Tasks/Tasks';
import { TaskView } from './views/TaskView/TaskView';


function App() {
  return (
    <>
      <SnackbarProvider maxSnack={5}>
          <TaskView />
      </SnackbarProvider>
    </>
  );
}

export default App;
