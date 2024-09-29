'use client'

import Modal from "@/components/modal";
import { APIURL } from "@/const/const";
import { useEffect, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [todoAdd, setTodoAdd] = useState({});
  const [todoEdit, setTodoEdit] = useState({});

  const handleChangeAdd = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTodoAdd({
      ...todoAdd,
      [name]: (name == 'done') ? (e.target.checked ? true : false) : value
    })
  }

  const handleChangeEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);

    setTodoEdit({
      ...todoEdit,
      [name]: (name == 'done') ? (e.target.checked ? true : false) : value
    })
  }

  const getTodo = async () => {
    const response = await fetch(`${APIURL}/api/todo/`)
    const data = await response.json();
    setTodo(data);
  }

  const toggleAdd = async () => {
    setShowAdd(!showAdd);
  }

  const toggleEdit = async (todo) => {
    setTodoEdit(todo);
    setShowEdit(!showEdit);
  }

  const addTodo = async (e) => {
    e.preventDefault();
    const response = await fetch(`${APIURL}/api/todo/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoAdd),
    })
    toggleAdd();
    getTodo();
  }

  const editTodo = async (e) => {
    e.preventDefault();
    const response = await fetch(`${APIURL}/api/todo/${todoEdit.id}/`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoEdit),
    })
    toggleEdit();
    getTodo();
  }

  const deleteTodo = async () => {
    const response = await fetch(`${APIURL}/api/todo/${todoEdit.id}/`, {
      method: 'DELETE',
    })
    toggleEdit();
    getTodo();
  }

  useEffect(() => {
    getTodo();
  }, [])

  return (
    <>
      <div className="wrapper my-12 mx-32">
        <h4 className="text-3xl mb-2">Todo Hadana</h4>
        <h4 className="text-lg text-slate-400">Ya Pokonya Todo CRUD Hadana</h4>

        <button onClick={toggleAdd} className="my-4 bg-blue-500 text-white px-4 py-2 rounded mb-12">
          Tambah
        </button>

        <div className="grid grid-cols-4 gap-4">
          {todo.map((item, index) => {
            const date = new Date(item.date);
            const formattedDate = ` ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`


            return <div key={index} onClick={() => toggleEdit(item)} className="w-full p-8 bg-slate-800 rounded-md relative">
              <h5 className="text-slate-100 font-bold mb-1 text-xl">{item.title}</h5>
              <h6 className="text-slate-400 mb-2 text-md">{formattedDate}</h6>
              {item.done ?
                <div className="bg-green-500 px-3 py-1 inline rounded-full text-sm">
                  Selesai
                </div>
                :
                <div className="bg-red-500 px-3 py-1 inline rounded-full text-sm">
                  Belum Selesai
                </div>
              }
            </div>
          })}
        </div>
      </div>


      <Modal isOpen={showAdd} onClose={toggleAdd}>
        <h2 className="text-lg font-semibold">Tambah Todo</h2>
        <p className="mt-1">Ya pokonya tambah Todo</p>
        <form onSubmit={addTodo}>
          <input placeholder="Nama Todo" name="title" onChange={handleChangeAdd} className="border w-full mt-2 bg-slate-900 border-gray-900 rounded-lg p-2 focus:outline-none focus:ring-0 focus:ring-blue-900" required></input>

          <div className="flex items-center mt-3">
            <input name="done" onChange={handleChangeAdd} id="done-add" type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 bg-slate-900 rounded" />
            <label htmlFor="done-add" className="ml-2">Selesai</label>
          </div>

          <button type="submit" onClick={() => console.log(todoAdd)} className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </form>
      </Modal>

      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)}>
        <h2 className="text-lg font-semibold">Edit Todo</h2>
        <p className="mt-1">Ya pokonya edit Todo</p>
        <form onSubmit={editTodo}>
          <input placeholder="Nama Todo" value={todoEdit?.title ?? ''} name="title" onChange={handleChangeEdit} className="border w-full mt-2 bg-slate-900 border-gray-900 rounded-lg p-2 focus:outline-none focus:ring-0 focus:ring-blue-900" required></input>

          <div className="flex items-center mt-3">
            <input name="done" onChange={handleChangeEdit} id="done-add" type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 bg-slate-900 rounded" defaultChecked={todoEdit?.done ?? false} />
            <label htmlFor="done-add" className="ml-2">Selesai</label>
          </div>

          <div class="flex gap-5">
            <button type="submit" onClick={() => console.log(todoAdd)} className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded">
              Simpan
            </button>
            <a onClick={deleteTodo} className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded cursor-pointer text-center">
              Hapus
            </a>
          </div>
        </form>
      </Modal>
    </>
  );
}
