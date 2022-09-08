import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {    
    const randomId = Number(Math.floor(Math.random() * 1000000));
    const newCreatedTask: Task = {
      id: randomId,
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newCreatedTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    let taskToBeChangedIndex = 0;
    for (let index = 0; index < tasks.length; index++) {
      if(tasks[index].id === id) {
        taskToBeChangedIndex = index;
      }      
    }
    console.log("index ====== " + taskToBeChangedIndex);
    const tasksCopy = [...tasks];    
    let result = 
    (tasksCopy[taskToBeChangedIndex].isComplete === false) ? true : false;
    tasksCopy[taskToBeChangedIndex].isComplete = result;
    setTasks(tasksCopy);
  }

  function handleRemoveTask(id: number) {
    let taskToBeRemovedIndex = 0;
    for (let index = 0; index < tasks.length; index++) {
      if(tasks[index].id === id) {
        taskToBeRemovedIndex = index;
      }      
    }
    console.log("index ====== " + taskToBeRemovedIndex);
    const tasksCopy = [...tasks];
    tasksCopy.splice(taskToBeRemovedIndex, 1);
    setTasks(tasksCopy);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}