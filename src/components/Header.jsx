import React from 'react'
import { FaBuilding } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Header = ({setIsAuthOpen}) => {

  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 z-50 w-full flex flex-row items-center justify-between lg:justify-evenly bg-gray-50 px-4.5 py-3 border-b border-gray-300">
        {/* left side  */}
        <div className="flex flex-row cursor-pointer gap-2">
          {/* logo */}
          <div className="flex items-center justify-center w-12 h-12 bg-black rounded-md px-1.5">
            <FaBuilding color="yellow" size={28} />
          </div>

          {/* tile and details */}
          <div>
            {/* title */}
            <nav className="flex flex-row items-center gap-3">
              {/* app name */}
              <h1 className="flex text-black font-bold text-[20px]">
                Shramik <span className="text-blue-700">Setu</span>
              </h1>
              {/* description */}
              <div className="border border-blue-400 rounded-md bg-blue-300/35 px-1.5 py-1">
                <h1 className="text-blue-500 font-normal text-[10px]">
                  National Portal
                </h1>
              </div>
            </nav>
            {/* description */}
            <p className="text-[11px] text-gray-500">
              Daily wage labor attendance, direct wages and compliance system
            </p>
          </div>
        </div>
        {/* Right Side  */}
        <div className="flex flex-row gap-4 items-center justify-center">
          {/* Home Icon */}
          <button onClick={()=> navigate("/")} className="flex items-center gap-1.5 cursor-pointer">
            <MdOutlineHome size={24} color="#475569" />
            <h1 className="text-[#475569] text-sm">Home</h1>
          </button>
          {/* Signup/register */}
          <button onClick={() => setIsAuthOpen(true)} className="flex gap-1.5 items-center bg-blue-600/75 rounded-xl px-2 py-1 cursor-pointer">
            <p className="text-sm">🔑</p>
            <p className="text-white font-bold text-[12px]">
              Sign In / Register
            </p>
          </button>
        </div>
      </header>
  )
}

export default Header