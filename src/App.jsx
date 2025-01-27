/* eslint-disable react-hooks/rules-of-hooks */
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
// import { useState, useEffect } from 'react'; 
// import { useLaunchParams } from '@telegram-apps/sdk-react';
import {  backButton } from '@telegram-apps/sdk-react';
function App() {
  const groupId = 'fake group id'
  const windowInfo = window.location.href;
  backButton.mount();
  return (
    <>
       <main className="flex flex-col gap-8">
        <p>windowInfo = {windowInfo}</p>
        <TaskForm groupId={groupId} />
        <TaskList groupId={groupId} />
      </main>
    </>
  )
}

export default App
