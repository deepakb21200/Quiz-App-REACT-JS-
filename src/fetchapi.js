 export  default async function trivia(category,num,level){
   




try{

        let res = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${num}&difficulty=${level}`)


        // console.log(res);
        let a = await res.json()
        // console.log(a);
        return a 

        
        
        
}

catch{
    console.log("server error issue");
    
}



}


  // console.log(range);

  // console.log(flag);


// async function roks(){
//     try{
//         // let res = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${num}&difficulty=${level}`)

//           let res = await fetch(`https://the-trivia-api.com/api/questions?categories=science&limit=10&difficulty=medium`)


//         // console.log(res);
//         let a =  await res.json()

//         // console.log(a);
        
        
// }

// catch{
//     console.log("server error issue");
    
// }
// }

// roks()