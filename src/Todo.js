
import React, { useEffect, useState } from "react";

function Todo() {

  const [todo,setTodo]=useState("");
  const [todos,setTodos]=useState([]);
  const [isEdit,setisEdit]=useState(0);

  useEffect(()=>{},[todos]);
  const handleSubmit=(e)=>
  {
    e.preventDefault();
    if(isEdit)
    {
      const editTodo=todos.find((item)=>item.id===isEdit);
      const updatedTodo=todos.map((item)=>item.id===editTodo.id?(item={id:item.id,todo}):{id:item.id,todo:item.todo})
      setTodos(updatedTodo);
      setisEdit(0);
      setTodo("")
      return;
    }

    if(todo!=="")
    {
    console.log(todos);
     setTodos([{id:`${todo}-${Date.now()}`,todo,isComplete:false},...todos])
    }
   
    setTodo("");
  }

  const handleTick=(id)=>
  {
    const newList=todos.map((item)=>
    {
      if(item.id===id)
      {
        const updatedItem={...item,isComplete:!item.isComplete};
        return updatedItem;
      }
      return item;
    });
    setTodo(newList);
  }

  const handleDelete=(id)=>
  {
    const deleteTodos=todos.filter((item)=>item.id!==id);
    setTodos([...deleteTodos]);
  }

  const handleEdit=(id)=>
  {
    const editTodo=todos.find((item)=>item.id===id);
    setTodo(editTodo.todo);
    setisEdit(id);
  }

  return (
    <div className="App">
    <h1> add your task</h1>
    <form onSubmit={handleSubmit}>
    <input value={todo} onChange={(e)=>
    {
      setTodo(e.target.value);
    }}  type="text">

    </input>
    <button type="submit" >{isEdit?"Edit":"Add"}</button>
    </form>
    <div>
      <ul>
      { 
        todos.map((x)=>(
        <li key={x.id}>
        <p>{x.todo}</p>
        <button onClick={()=>handleDelete(x.id)}>delete</button>
        <button onClick={()=>handleEdit(x.id)}>edit</button>
        <button onClick={()=>handleTick(x.id)}>check</button>
        </li>))
      }
      </ul>
    </div>
    
    </div>
  );
}

export default Todo;
