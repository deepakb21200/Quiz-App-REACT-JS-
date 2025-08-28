import React from 'react'

function Header() {
  return (
    <header className="text-white px-[1vw] shadow-[0_4px_10px_rgba(0,0,0,0.2)] h-[10vh]  flex justify-between items-center gap-[16px]">   
  <h1 className="text-4xl font-bold tracking-[2px] uppercase m-0">🧠 Quiz Master</h1>
  <p className="mt-2 text-lg opacity-90">Test your knowledge & challenge yourself!</p>
</header>

  )
}

export default Header