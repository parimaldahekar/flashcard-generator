import React from "react";
import { useNavigate } from "react-router-dom";
import DemoImg from "../../Assets/gray.jpg";

const FlashCardList = ({ flashcard }) => {
  const navigate = useNavigate();

  return (
    <div
      key={flashcard.groupid}
      className="p-4 m-6 mx-auto flex flex-col space-y-3 items-center justify-center bg-white rounded-md text-black w-[23rem] h-[13rem] relative border-2 border-slate-200"
    >
      {/* Render an image for the flashcard group if available, otherwise render a default image */}
      <div className="absolute -top-9">
        {flashcard.groupimg ? (
          <img
            className="rounded-full w-16 h-16 object-cover aspect-square"
            src={flashcard.groupimg}
            alt={flashcard.groupname}
          />
        ) : (
          <img
            className="rounded-full w-16 h-16 object-cover aspect-square"
            src={DemoImg}
            alt={flashcard.groupname}
          />
        )}
      </div>
      {/* Render the flashcard group name */}
      <h2 className="font-bold text-lg">{flashcard.groupname}</h2>

      {/* Render the flashcard group description with a line-clamp effect to limit the number of lines displayed */}
      <p className="text-center font-medium text-sm text-slate-600 line-clamp-2">
        {flashcard.groupdescription}
      </p>

      {/* Render the number of cards in the flashcard group */}
      <p className="font-medium text-sm text-slate-700">
        {flashcard.cards ? flashcard.cards.length : 0} Cards
      </p>

      {/* Provide a button to navigate to the details page for the flashcard group */}
      <button
        onClick={() => navigate(`/flashcarddetails/${flashcard.groupid}`)}
        className="py-1 px-16 text-red-600 font-bold rounded-sm border-red-600 ring-2 ring-red-600"
      >
        View Cards
      </button>
    </div>
  );
};

export default FlashCardList;

