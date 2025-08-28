 export  default async function trivia(category,num,level){
  try{
        let res = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${num}&difficulty=${level}`)
 
        let a = await res.json()
        return a         
}
  catch{
    console.log("server error issue");
    
}}


 