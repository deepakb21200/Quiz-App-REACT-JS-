import React, {useState} from 'react'
import "./Results.css"
import { useLocation, useNavigate } from 'react-router-dom';


function Results() {
let [show] =useState(JSON.parse(localStorage.getItem("showing")) || [])
let location = useLocation()
let navigate = useNavigate()

  return (

     <div className='mx-auto flex flex-col items-center  mt-[24px] w-[50%] h-[80vh] '>
        <div className="card mb-[30px] border-red-400 border-[4px] w-[50%]">
          <div className="border-b-[#1f2937] px-[20px] py-[18px]"><h3>Breakdown</h3></div>
          <div className="p-[22px]">
            <div className="stat"><span>Total questions</span><strong className='text-white'>
              {show.length > 0 ? show[0].total : 0}</strong>
              </div>

            <div className="stat"><span>Correct</span><strong className='text-[#10b981]'>
              {show.length > 0 ? show[0].Correct : 0}</strong>
              </div>

            <div className="stat"><span>Incorrect</span><strong className='text-[#ef4444]'>
              
              {show.length > 0 ? show[0].InCorrect : 0}

              </strong></div>


                 <div className="stat"><span>Attempted quesitons</span><strong>
                  {show.length > 0 ? show[0].myattempts : 0}
                  </strong></div>


                 <div className="stat"><span>Unattempted quesitons</span>
                 <strong> {show.length > 0 ? show[0].total - show[0].myattempts: 0}
                  </strong></div>
            <div className="stat"><span>Accuracy</span><strong>{show.length > 0 ? show[0].Accuracy.toFixed(2) : 0}%</strong></div>
            
          </div>
        </div>

        <div className="card w-[50%]">
          <div className=" px-[20px] py-[18px] border-b-[#1f2937]"><h3>Results</h3></div>
      
          <div className='p-[22px]'>
            <div className="score text-center">{show.length > 0 ? show[0].Correct + " / " + show[0].total : 0}</div>
        
            <div className='actions mt-[6px] flex gap-[30px]'>
              <button className="px-6 py-2 rounded-2xl font-medium shadow-md transition duration-300 
             bg-red-600 text-white hover:bg-red-700 cursor-pointer"  onClick={()=>{
                  localStorage.removeItem("APIQuestions")
                  localStorage.setItem("setOfQuestions",JSON.stringify([]))
                  localStorage.setItem("counter",JSON.stringify(0))

              navigate("/quiz",  {state :{results: [location.state.results[0], location.state.results[1], location.state.results[2]]}})
              }}>Play Again</button>


               <button className="px-6 py-2 rounded-2xl font-medium shadow-md transition duration-300 
             bg-green-600 text-white hover:bg-green-700"  onClick={()=>navigate("/")}>Home</button>

              <button className="px-6 py-2 rounded-2xl font-medium shadow-md transition duration-300 
             border border-blue-500 text-white hover:bg-blue-50 hover:text-blue-700  cursor-pointer"
               onClick={()=>navigate("/reviews")}>Review</button>

            </div>
          </div>
        </div>
      </div>
  )
}

export default Results