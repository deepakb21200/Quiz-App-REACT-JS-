 
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import Quiz from './Components/Quiz'

import Results from "./Components/Results"
import Reviews from './Components/Reviews'

 
 

 
   
function App() {
  return (
   <>
 <Header/>

   <Routes>
    <Route  path="/" element={ <Home /> }/>
        <Route  path="/quiz" element={  <Quiz/>}/>
        <Route  path="/results" element={ <Results/> }/>
        <Route  path="/reviews" element={  <Reviews/> }/>
   </Routes> 



 

 

  
   
   </>
  )
}

export default App