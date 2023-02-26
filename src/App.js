import './App.css';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="w-full min-h-screen bg-[#f8f4ef] font-Montserrat">
    <div className="px-5 xl:px-32 container mx-auto">
        <Home/>
        {/* All the Routes are Defined here */}
       
      </div>
    </div>
  );
}

export default App;
