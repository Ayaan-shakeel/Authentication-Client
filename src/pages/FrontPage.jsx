import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
const FrontPage = () => {
    const navigate=useNavigate()

    const logOut=async(req,res)=>{
navigate("/")
res.send("log out succesfully")
    }
  return (
     <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-800 to-slate-950 text-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full rounded-3xl border border-white/10 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-md sm:p-8 md:p-10"
        >
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Welcome to our Simple Authentication Page
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-200 sm:text-base md:text-lg">
            You are successfully logged in. Click the button below if you want to securely log out.
          </p>

          <div className="mt-8">
            <button
              onClick={logOut}
              className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto sm:px-10 sm:text-base"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FrontPage