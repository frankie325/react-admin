import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();

  return (
    <h1>
      home page
      <button
        onClick={() => {
          navigate('/examples');
        }}
      >跳转</button>
    </h1>
  );
}
