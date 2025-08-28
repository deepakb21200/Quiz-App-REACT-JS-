import React, {useEffect, useRef, useState } from 'react'
import  {useNavigate}  from 'react-router-dom';
import "./Home.css"
import { categorys } from './categories.js';

function Home() {
  let [range, setRange] =   useState(5)
  let category = useRef("")
  let choice = useRef("")
  let bg = useRef()
  let  navigate = useNavigate()

  useEffect(()=>{
  if(localStorage.getItem("setOfQuestions")&&localStorage.getItem("counter")){
    localStorage.clear()
  }
},[])


 


async function submithandler(e){
  e.preventDefault()

  if(!choice){
  alert("select difficulty level")
  return}
  

 localStorage.setItem("setOfQuestions",JSON.stringify([]))

 localStorage.setItem("counter",JSON.stringify(0))
 
 navigate("/quiz", { state: {  results:[category.current, range, choice.current]} });

}


function bgcolors(q){
  let a= Array.from(bg.current.querySelectorAll("button"))
  for (let index = 0; index < a.length; index++) {
    let element = a[index];
    element.classList.remove("addColor")    
  }
  Array.from(bg.current.querySelectorAll("button"))[q].classList.add("addColor")
}


  return (
    <div className='h-[90vh]  flex justify-center items-center'>
     <div className="cardhome">
             <div className=" px-[20px] py-[18px]  ">

          <h3>Quiz Setup</h3>
        </div>
        <div className="p-[22px]">
       <form onSubmit={submithandler}>
           
            <div className="field ">
              <label htmlFor="category">Category</label>
             <select id="category" className="select" required value={category}
             onChange={(e) => category.current = e.target.value}>
               <option value="" disabled>Select a category</option>


              {
                categorys.map((e,index)=>{
                  return (
                  <option value={e.value} key={index}>{e.label}</option>
                  )
                })
              }

               </select>


            </div>

            <div className="field">
              <label>Difficulty</label>
             <div className="choices" ref={bg}>
  <button type="button" className="chip " onClick={() => {  choice.current = "easy"; bgcolors(0); }}>Easy</button>
  <button type="button" className="chip" onClick={() => {  choice.current = "medium";  bgcolors(1);}}>Medium</button>
  <button type="button" className="chip" onClick={() => { choice.current = "hard";  bgcolors(2); }}>Hard</button>
</div>

 
            </div>

        
            <div className="field">
              <label htmlFor="qcount">Number of Questions</label>
            <input className="!p-0 !m-0"  type="range" min={5} max={50} value={range} 
            onChange={(e) => setRange(Number(e.target.value))} />
              <div className="text-[#9ca3af]">• Min 5 • Max 50</div>
              <p>Total number of questions: {range}</p>

            </div>

             

            <div className="flex justify-center mt-[16px]">
             <button type="submit" className='justify-center gap-2 px-4 py-3 rounded-[12px] no-underline

              text-[#e5e7eb] font-medium border border-[#1f2937] bg-transparent hover:border-[#8b5cf6]'>
              Start Quiz</button>

            </div>
           
          </form>
        </div>
      </div>
      </div>
  )
}

export default Home