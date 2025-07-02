import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  //   这段代码之所以不对，是因为它试图在渲染期间对 DOM 节点进行操作
  //   if (isPlaying) {
  //     ref.current.play(); // 渲染期间不能调用 `play()`。
  //   } else {
  //     ref.current.pause(); // 同样，调用 `pause()` 也不行。
  //   }

  //   每当你的组件渲染时，React 会先更新页面，然后再运行 useEffect 中的代码
  //   使用 useEffect 包裹副作用，把它分离到渲染逻辑的计算过程之外
  useEffect(() => {
    if (isPlaying) {
      console.log('调用 video.play()');
      ref.current.play();
    } else {
      console.log('调用 video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]); // 依赖项数组，只有当 isPlaying 发生变化时才会执行

  return <video ref={ref} src={src} loop playsInline></video>;
}

export default function Video() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '暂停' : '播放'}</button>
      <VideoPlayer isPlaying={isPlaying} src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
    </>
  );
}
