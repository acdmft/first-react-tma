/* eslint-disable react-hooks/rules-of-hooks */
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react'; 
// import { useLaunchParams } from '@telegram-apps/sdk-react'; // v. 2.0.9
// import {  backButton } from '@telegram-apps/sdk-react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
function App() {
  const [groupId, setGroupId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const launchParams = useLaunchParams();
  const launchParams = retrieveLaunchParams();
  useEffect(() => {
    const initializeComponent = async () => {
      console.log('launchParams ', launchParams);
      try {
        if (launchParams?.startParam) {
          const encodedGroupId = launchParams.startParam;
          try {
            const decodedGroupId = atob(encodedGroupId);
            console.log("Decoded Group ID:", decodedGroupId);
            setGroupId(decodedGroupId);
          } catch (error) {
            console.error("Error decoding group ID:", error);
            setError("Invalid group ID format");
          }
        } else {
          console.log("No start_param available");
          setError("No group ID provided");
        }
      } catch (error) {
        console.error("Error in initializeComponent:", error);
        setError("An error occurred while initializing the component");
      } finally {
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, [launchParams]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!groupId) {
    return <div className="p-8">Please provide a valid group ID</div>;
  }
  return (
    <>
       
      <main className="flex flex-col gap-8">
        <TaskForm groupId={groupId} />
        <TaskList groupId={groupId} />
      </main>
   
    </>
  )
}

export default App
