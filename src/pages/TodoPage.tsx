import TodoList from '../components/todo/TodoList'

const TodoPage = () => {
  
  return (
    <div className='flex fixed w-screen h-screen inset-0 justify-center bg-black/85'>
      <div className='flex flex-col w-full max-w-md bg-white h-screen px-2'>
         <div className='flex w-full h-auto justify-between items-center mt-4 mb-5'>
          <span className='text-2xl font-extrabold'>ToDo</span>
          <button className='text-white bg-black py-1 px-2 rounded'>+ Add ToDo</button>
          </div>
          <div className='bg-white'>
          <TodoList/>
          </div>
      </div>
    </div>
  )
}

export default TodoPage
