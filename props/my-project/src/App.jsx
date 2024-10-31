
import { useState ,useCallback, useEffect,useRef} from 'react'
import './App.css'

function App() {
const [length,setLength] = useState(8);
const [numallowed,setNumallowed] = useState(false);
const [charAllowed,setCharAllowed] = useState(false);
const [password,setPassword] = useState("");
//useref hook 
const passwordRef = useRef(null)
const passwordgenerator = useCallback(()=>{
let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numallowed)  str += "0123456789"
if(charAllowed) str += "!@#$%&^*(){}"
 for (let i=1;i<=length;i++){
  let char = Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char)
 }
 setPassword(pass)

},[length,numallowed ,charAllowed, setPassword])
useEffect(()=>{
passwordgenerator();
},[length,numallowed,charAllowed,passwordgenerator])
//function to copy password to clipboard
 const copyPasswordtoclipboard =useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,3);
  window.navigator.clipboard.writeText(password)
 },[password])

  return(
  
  
<>
<div className='w-50 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
 <h1 className='text-white text-center my-3'>Password Generator</h1>
  <div className='flex shadow rouded-lg overflow-hidden mb-4'>
    <input type='text' value ={password} className='outline-none w-full py-1 px-3' placeholder='Password'
    readOnly ref={passwordRef}
    />
    <button onClick={copyPasswordtoclipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
  </div>
  <div className='flex text-sm gap-x-2'>
<div className='flex items-center gap-x-1'>
  <input type ="range" min={6} max={100} value={length} className='cursor-pointer'
  onChange={(e)=>{setLength(e.target.value)}}/>
  <label>length:{length}</label>
</div>
<div className='flex items-center gap-x-1'>
  <input type="checkbox" defaultChecked={numallowed}
  id="numberInput" onChange={()=>{
    setNumallowed((prev)=>!prev);
  }}/>
  <label>Numbers</label>
</div>
<div className='flex items-center gap-x-1'>
<input type="checkbox" defaultChecked={numallowed}
  id="numberInput" onChange={()=>{
    setCharAllowed((prev)=>!prev); //so we get here inside setnumallowed a callback and also access to the previos value of it
  }}/>
  <label>Characters</label>
</div>
  </div>
</div>
</>
  )
}

export default App
