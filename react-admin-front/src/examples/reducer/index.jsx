import { useReducer } from 'react';
import tasksReducer from './tasksReducer';
import TaskList from './taskList.jsx';
import AddTask from './addTask.jsx';
import { useImmerReducer } from 'use-immer';

let nextId = 3;
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false },
];

export default function Task() {
  // 使用 reducer 整合状态逻辑
  // 传入一个reducer函数和初始状态
  // 返回一个有状态的值和一个设置该状态的函数
  // const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  // 使用 Immer 简化 reducer 
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    // "派发" 用户操作给 tasksReducer函数
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </>
  );
}
