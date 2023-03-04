import React from 'react'
import { Routes, Route } from "react-router-dom";
import CreateFlashCard from "./Pages/CreateFlashcard";
import MyFlashCards from './Pages/MyFlashcards'
import FlashCardDetails from "./Pages/FlashcardDetails";
import Home from "./Pages/Home";
import Navbar from './Components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
    {/* The Navbar component is rendered here */}
    <Navbar/>
   {/* The Home component is rendered here, along with some defined routes*/}
    <div className="w-full min-h-screen bg-[#f8f4ef] font-Montserrat">
      <div className="px-5 xl:px-32 container mx-auto">
        <Home/>
        {/* All the Routes are Defined here */}
        <Routes>
          <Route path="/" element={<CreateFlashCard/>} />
          <Route path="/myflashcard" element={<MyFlashCards/>} />
          <Route
            path="/flashcarddetails/:groupId"
            element={<FlashCardDetails />}
          />
        </Routes>
      </div>

    {/* The ToastContainer component is rendered here */}
      <ToastContainer/>
    </div>
  
    
    </div>
  );
}

export default App;
