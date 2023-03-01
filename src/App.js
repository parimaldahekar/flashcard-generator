import { createContext, useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateFlashCard from "./Pages/CreateFlashcard";
import MyFlashCards from './Pages/MyFlashcards'
import FlashCardDetails from "./Pages/FlashcardDetails";
import Home from "./Pages/Home";
import Navbar from './Components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ThemeContext =  createContext(null)

function App() {

  const [theme, setTheme] = useState("light");
  const changeTheme =()=>{
    theme === "dark" ? setTheme("light") : setTheme("dark")
  };


  return (
    <div>
    <ThemeContext.Provider value={{theme, setTheme , changeTheme}}>
    <Navbar/>
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
      <ToastContainer/>
    </div>
    </ThemeContext.Provider>
    </div>
  );
}

export default App;
