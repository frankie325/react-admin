// 在tasksReducer函数中修改状态逻辑
// reducer函数接收当前状态和action对象，返回新的状态
// export default function tasksReducer(tasks, action) {
//   switch (action.type) {
//     case 'added':
//       return [
//         ...tasks,
//         {
//           id: action.id,
//           text: action.text,
//           done: false,
//         },
//       ];

//     case 'changed':
//       return tasks.map((t) => {
//         if (t.id === action.task.id) {
//           return action.task;
//         } else {
//           return t;
//         }
//       });

//     case 'deleted': {
//       return tasks.filter((t) => t.id !== action.id);
//     }

//     default: {
//       throw Error('未知 action：' + action.type);
//     }
//   }
// }

// useImmerReducer 让你可以通过 push 或 arr[i] = 来修改 state ：
export default function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added':
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;

    case 'changed':
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;

    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }

    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}
