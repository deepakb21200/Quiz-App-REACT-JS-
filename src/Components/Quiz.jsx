import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Quiz.css"
import {  useLocation, useNavigate } from "react-router-dom";
import trivia from '../fetchapi';
import Search from './Search';
 

function Quiz() {
let  navigate = useNavigate()
 let [val ,setVal] = useState(JSON.parse(localStorage.getItem("setOfQuestions"))|| [])
  let location = useLocation()   // ye location object deta hai
 let [count, setCount] = useState(JSON.parse(localStorage.getItem("counter")) || 0)
 let correct= useRef(0)
 let incorrect = useRef(0)
 
 let [holdingQuestions, setHoldingQuestions]= useState([])
 let [totalLength, setTotallength] = useState()




function getShuffledOptions(item) {

  let options = [item.correctAnswer, ...item.incorrectAnswers];

  for (let i = options.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
return options
}

  


useEffect(()=>{
async function de(){
 
let apiquestions = JSON.parse(localStorage.getItem("APIQuestions"))

if(apiquestions){
  setTotallength(apiquestions)
    setHoldingQuestions([apiquestions[count]])

}else{

  let questions = await trivia(location.state.results[0], location.state.results[1], location.state.results[2])

  for(let i = 0; i < questions.length; i++){
    let a = getShuffledOptions(questions[i])
    questions[i] ={
      ...questions[i],
      answers:  a

    }
  }
  localStorage.setItem("APIQuestions",JSON.stringify(questions))

    setTotallength(questions)
    setHoldingQuestions([questions[count]])
}}

de()
},[])

 
  useEffect(() => {
  if(holdingQuestions.length>0){
 
     localStorage.setItem("counter",JSON.stringify(count))
    setHoldingQuestions([totalLength[count]])
  }
}, [count])




function changing(e,ids){

let obj = {
  id: ids,
  values: e.target.value
};

let a = [...val];  


let index = a.findIndex(ele => ele.id === ids);

if (index !== -1) {
  a[index] = { 
    ...a[index],       
    values: e.target.value 
  };

} else {
  a.push(obj);  
}

setVal(a)
localStorage.setItem("setOfQuestions", JSON.stringify(a))
}


 
function compare(vall){
  let ty = [...vall]
 if(ty.length >0){
   let result = totalLength


    for (let index = 0; index < result.length; index++) {

    let element = result[index]
      if(!ty[index])  continue

    if(element.correctAnswer === ty[index].values){

      correct.current = correct.current + 1
    } else{
      incorrect.current = incorrect.current + 1
    }}

   

    let acc = (correct.current / totalLength.length)*100 

    
    
  let obj = {  
    Correct: correct.current,
    InCorrect:incorrect.current,
    Accuracy :acc,
    total: totalLength.length,
    myattempts:ty.length
  }


   localStorage.setItem("showing",JSON.stringify([obj]))
 }else{
   localStorage.setItem("showing",JSON.stringify([]))
 }

   navigate("/results", {state :{results: [location.state.results[0], location.state.results[1], location.state.results[2]]}});

}

 return (
<div className=" flex items-center justify-center h-[90vh] gap-[30px]">
   {holdingQuestions.length >0 ?holdingQuestions.map((item, index) => (

      <div className="quiz-container min-h-[45vh]  " key={index}>
        <div className='flex justify-center gap-[40px] '>
          <div >Category: {item.category}</div>
          <div>Difficulty: {item.difficulty}</div>

        </div>
        <div className="question">{count+1}. {item.question}</div>
        <div className="options">
          <label ><input type="radio" name={`q${item.id}`} onChange={(e)=>changing(e,item.id)} 
          value={item.answers[0]}  
          checked={val.find(v => v.id === item.id)?.values === item.answers[0]}/> {item.answers[0]}</label>

          <label  ><input type="radio" name={`q${item.id}`} onChange={(e)=>changing(e,item.id)}
           value={item.answers[1]} 
            checked={val.find(v => v.id === item.id)?.values === item.answers[1]}/> 
            {item.answers[1]}</label>

          <label  ><input type="radio" name={`q${item.id}`} onChange={(e)=>changing(e,item.id)}
           value={item.answers[2]} 
            checked={val.find(v => v.id === item.id)?.values === item.answers[2]} />
             {item.answers[2]}</label>

          <label  ><input type="radio" name={`q${item.id}`} onChange={(e)=>changing(e,item.id)}
           value={item.answers[3]} 
           checked={val.find(v => v.id === item.id)?.values === item.answers[3]}/> {item.answers[3]}</label>
        </div>

        <div className="actions">
          <button className='btn'   onClick={()=>{
            let confirms = confirm("Do you want to see your result now?")

            if(confirms){
              compare(val)      
            }
          }}>Quit</button>
          <div className='flex gap-[10px]'>
            
            {
              val.find((ele)=>ele.id == item.id) &&
               <button className="btn" onClick={()=>{
              let new_val = val.findIndex((v)=> v.id == item.id)
              let g = [...val]
              if(new_val>=0){ 
                g.splice(new_val,1) 
              }
              setVal(g)
              localStorage.setItem("setOfQuestions", JSON.stringify(g))
            }} >Deselect</button>

            }


          {count >=1 &&  <button  className="btn cursor-pointer"  onClick={()=>{   
                if(count){
                  setCount(count-1)}
            }}>Back</button> }

 
            {
              count < totalLength.length-1 ?   <button className="btn cursor-pointer" onClick={()=>{
                if(count < totalLength.length-1){
                  setCount(count+1) 
                } 
            }}  >Next</button>:
            <button className="btn cursor-pointer" onClick={()=>{
                let confirms = confirm("Click OK to view your answers and score.")

                if(confirms){
                  compare(val)
                }
              }}>Result!</button>
            }

          </div>
        </div>

      </div>
    )) : <Search/> }

    </div>   
  ) 


}


export default Quiz



//   setVal(prev => {
    // check if id already exist
//     const exists = prev.find(item => item.id === ids);

//     if (exists) {
//         // update existing
//         return prev.map(item => 
//             item.id === ids ? { ...item, values: e.target.value } : item
//         );
//     } else {
        // add new object
//         return [...prev, obj];
//     }
// });







