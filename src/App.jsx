import { Route, Routes } from 'react-router-dom';
import { routes } from './routes/routes';

/** Renders the route table from `src/routes/routes.jsx`. */
export default function App() {
  return (
    <Routes>
      {routes.map(({ element, children }, index) => (
        <Route key={index} element={element}>
          {children.map(({ path, element: pageElement }) => (
            <Route key={path} path={path} element={pageElement} />
          ))}
        </Route>
      ))}
    </Routes>
  );
}
