import { routes } from './routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router';
import './App.css';

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
