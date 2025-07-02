import { createRoot } from 'react-dom/client';
import '@/style/index.less';
import '@/style/tailwind.css';
import App from './App.tsx';
import store from './store';
console.log(store);
console.log(store.getState());
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env);

createRoot(document.getElementById('root')!).render(<App />);
