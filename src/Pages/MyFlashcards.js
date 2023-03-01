import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MySingleFlashCard from "../Components/FlashCardList/FlashCardList";

const MyFlashCard = () => {
  const navigate = useNavigate();

  const flashcard = useSelector((state) => state.flashcard.flashcards);

  const [showAll, setShowAll] = useState(false);

  // this sets the showlimit according to the state of the Show All Button
  const showLimit = !showAll ? 6 : flashcard.length;

  return (
    <section className="flex flex-col mt-16">
      {flashcard.length > 0 ? (
        <div>
          <div className="flex flex-wrap">
            {/* This will only display 6 cards according to the problem statement */}
            {flashcard.slice(0, showLimit).map(({ card }, i) => (
              <MySingleFlashCard key={i} flashcard={card} />
            ))}
          </div>
          <div className="flex justify-end mr-10">
            <button
              className="w-16 mt-1 font-semibold text-lg text-red-600 outline-none border-none active:outline-none active:border-none"
              onClick={() => setShowAll(!showAll)}
            >
              See all
            </button>
          </div>
        </div>
      ) : (
        <div>
        <div className="flex items-center justify-center bg-white shadow-lg p-10">
          <h1 className="text-center	 font-semibold  text-lg text-slate-500  ">
          To view a flashcard, please create one.           
          </h1>
        </div>
        <div className="flex items-center justify-center bg-white shadow-lg pb-10" >   
        <button 
        onClick={() => navigate("/")}
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Create Flashcard
        </button>
        </div>
        </div>
      )}
    </section>
  );
};

export default MyFlashCard;
