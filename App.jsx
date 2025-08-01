
import { useState, useEffect } from 'react'
// import './App.css'
import Navbar from './assets/components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {


   const [todo, setTodo] = useState("")
   const [todos, setTodos] = useState([])
   const [showFinished, setshowFinished] = useState(true)

   useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse (localStorage.getItem("todos"))
    setTodos(todos)
    saveToLS()
    }
   },[])

  const saveToLS = (params)=> {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }

  const handleEdit = (e,id)=> {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id!== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete= (e,id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
    saveToLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);

  let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };
  return (
    <>
    <Navbar/>
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-50 min-h-[80vh] md:w-[35%]">
         <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
          <div className="addTodo my-5 flex flex-col">
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input onChange={handleChange} 
            value={todo} type="text"
            placeholder="Enter a task ..."
            className="w-full rounded-full px-5 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-violet-300" />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md '>Save</button>
          </div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> show Finished
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex md:w-1/2 justify-between my-3 bg-white p-3 rounded-lg shadow w-full "}>
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}
              id=""/>  
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 text-white flex-xs px-4 py-1 rounded-md mx-1'>Edit</button>
                <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 text-white text-xs px-4 py-1  rounded-md mx-1'>Delete</button>
              </div>
            </div>
            })}
          </div>
        </div>
    </>
      
  )
}

export default App
