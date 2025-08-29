import React, { useEffect, useState } from 'react'
import "./Review.css"

function Reviews() {
    let [review,setReview] = useState([])
  
    let [checking2, setChecking2] = useState([])

    useEffect(()=>{
let g = JSON.parse(localStorage.getItem("APIQuestions"))

let h = JSON.parse(localStorage.getItem("setOfQuestions"))|| []
 
setChecking2([...h])
setReview(g)

}

,[])


 
    function answerChecker(obj){
let t = checking2.find((ele)=> ele.id == obj.id)

if(t){
   
  
  for (let index = 0; index < checking2.length; index++) {

    if(checking2[index].values == obj.correctAnswer){
      return <div className='correct-note'>✅ Your answer: {obj.correctAnswer}  (Correct) </div>
    }}
 return<div className='text-red-500'>❌ Your answer: {t.values} (Not Correct) </div> 
}else{
  return <div className='text-blue-600'>⏳ Your answer: Not Attempted </div>
}

  }
  return (
  
    review.length > 0 &&
     <div className="review-container">
  <h1 className="review-heading">Check Your Answers</h1>
  <div className="review-list">
    {review.length > 0 && (
      review.map((item, index) => (
        <div key={index} className="review-card font-bold">
          <h2 className="question">
            {index + 1}. {item.question}
          </h2>

          <div className="options">
            {item.answers.map((opt, i) => (
              <div key={i} className={`option ${opt == item.correctAnswer ? 'correct ' : ''}`}>
                {`${opt} `}</div>))} </div>

          <p className="correct-note">
            ✅ Correct Answer: <span>{ item.correctAnswer}</span>
          </p>

            {answerChecker(item)}
          
        </div>
        )) ) }
  </div>
</div>


  )
}

export default Reviews

        