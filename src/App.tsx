import React from 'react';
import { SnackbarProvider } from 'notistack';
import { TaskView } from './views/TaskView/TaskView';

import './App.scss';

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
