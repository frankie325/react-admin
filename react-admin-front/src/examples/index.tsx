// import Game from './game.tsx';
// import Profile from './props.tsx';
// import Count from './count.tsx';
// import Task from './reducer/index.jsx';
// import Page from './context/index.jsx';
import Video from './effect/vedioPlay.jsx';
import Chat from './effect/chat.jsx';
import Counter from "./counterSlice";
import PostList from "./posts/postList.tsx";

export default function Example() {
  return (
    <>
      {/* <Game /> */}
      {/* <Profile /> */}
      {/* <Count /> */}
      {/* <Task /> */}
      {/* <Page /> */}
      {/* <Video /> */}
      <h1>Here is some examples</h1>
      <Chat />
      <Counter />
      <PostList />
    </>
  );
}
