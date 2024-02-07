import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { useRoutes } from 'react-router-dom';
import router from './router';


function App() {
  const content = useRoutes(router);
  return <>{content}</>;
}

export default App;
