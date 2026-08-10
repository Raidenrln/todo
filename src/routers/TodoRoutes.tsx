import { Route, Routes, useLocation } from "react-router-dom"
import TodoItem from "../pages/TodoPage"
import ViewDetails from "../components/todo/ViewDetails";

const TodoRoutes = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<TodoItem/>}></Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/:id" element={<ViewDetails/>}></Route>
        </Routes>
      )}
    </>
  )
}

export default TodoRoutes
