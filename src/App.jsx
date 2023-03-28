import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState ('')
  const [updatingInput, setUpdatingInput] = useState ('')
  const [data, setData] = useState ([])
  const [count, setCount] = useState (1)
  const [updating, setUpdating] = useState (false)
  const inputRef = useRef()

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data") || '[]')
    setData(storedData)
    const lastId = JSON.parse(localStorage.getItem("id"))
    setCount(lastId === null ? 1 : lastId + 1)
  }, [])

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  const handleSaveBtn = () => {
    const timestamp = Date.now()
    const newData = { text: inputText, id: count, timestamp }
    const updateData = [...data, newData]
    setData(updateData)
    localStorage.setItem("data", JSON.stringify(updateData))
    setInputText('')
    inputRef.current.focus()
    localStorage.setItem("id", JSON.stringify(count))
    setCount(count + 1)
    console.log()
  }

  const handleDeleteBtn = (id) => {
    const updateData = data.filter((el) => el.id !== id)
    setData(updateData)
    localStorage.setItem("data", JSON.stringify(updateData))
  }

  const handleUpdateBtn = () => {
    setUpdating(true)
  }

  const handleUpdatingInput = (event) => {
    setUpdatingInput(event.target.value)
  }

  const handleUpdadeTextBtn = (id) => {

  }

  return (
    <div>
      <input ref={inputRef} value={inputText} onChange={handleInputChange}/>
      <button onClick={handleSaveBtn}>Save</button>
      <ul>
        {data.map((arr, index) => (
          <li key={index}>
            <p>({arr.text.length}) - {arr.text}</p>
            <p style={{fontSize: '12px', color: 'gray', margin: '10px 0px'}}>Posted at {new Date(arr.timestamp).toUTCString()}</p>
            <button onClick={() => handleDeleteBtn(arr.id)}>Delete</button>
            <button onClick={handleUpdateBtn}>Update</button> <br/>
            {updating &&  <input value={updatingInput} onChange={handleUpdatingInput}/>}
            {updating &&  <button onClick={() => handleUpdadeTextBtn(arr.id)}>Update Text</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
