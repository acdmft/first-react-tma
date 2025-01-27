/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import TaskItem from './TaskItem';

export default function TaskList({ groupId }) {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const q = query(
        collection(db, 'tasks'),
        where('groupId', '==', groupId)
      );
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const taskList = [];
        querySnapshot.forEach((doc) => {
          taskList.push({ id: doc.id, ...doc.data() });
        });
        setTasks(taskList);
      });
  
      return () => unsubscribe();
    }, [groupId]);
  
    return (
        <>
        <p>Tasks:</p>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
        </>
    );
  }