/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoDownloadOutline, IoPrintOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import ReactToPrint from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import ShareModal from "../Components/Share/ShareModal";
import TabHands from "../Assets/hands-tab.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const handlePrint = () => {
  window.print();
};

const FlashcardDetails = ({ theme }) => {
  const componentRef = useRef();
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);


const cards = useSelector((state) => state.flashcard.flashcards);
const [ourCard, setOurCard] = useState({});
const [displayCard, setDisplayCard] = useState(null);
const [, setCardIndex] = useState(0); // add new state for card index
const cardData = ourCard.cards || [];

 // Function to update the currently displayed card
 const showCard = (cardid) => {
  setDisplayCard(ourCard.cards.find((card) => card.cardid === cardid));
};

  // Function to update the currently displayed card when the user clicks on the carousel arrows
  const handleCarouselChange = (currentIndex, currentDirection) => {
    setDisplayCard(cardData[currentIndex]);
  };


    // Filter the cardData array to show only the currently displayed card
 const filteredCardData = displayCard
    ? cardData.filter((card) => card.cardid === displayCard.cardid)
    : cardData;




    const renderCard = (card, selected) => {
      return (
        <div 
        ref={componentRef}  
        className="flex flex-col items-center justify-center">
        {card.cardimg ? (
          <img
            className="object-contain w-[22rem] xl:w-[20vw] h-[18rem] p-6 "
            src={card.cardimg}
            alt={card.cardimg}
          />
        ) : (
          <img
            src={TabHands}
            alt="cardimage"
            className="object-contain w-[22rem] xl:w-[20vw] h-[18rem] p-6"
          />
        )}
        <p
          className={`w-full p-6 py-5 word-break: break-all text-${
            theme === "dark" ? "white" : "slate-600"
          }`}
        >
          {card.carddescription}{" "}
        </p>
      </div>
      );
    };


  

useEffect(() => {
  if (!groupId || !cards) return;
  const temp = cards.filter((a) => a.card.groupid === groupId);
  setOurCard(temp[0].card);
}, [groupId, cards]);

useEffect(() => {
  if (ourCard.cards) {
    setCardIndex(0); // initialize index when loading cards
  }
}, [ourCard]);


  return (
    <>
      <section
 
      className="flex flex-col text-slate-700 ">
        <header className="flex ">
          <BiArrowBack
            className="text-3xl mr-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex flex-col">
            <h2
              className={`text-xl text-${theme === "dark" ? "white" : "bg-slate-600"
                } font-bold`}
            >
              {ourCard.groupname}
            </h2>
            {ourCard.groupdescription && (
              <p
                className={`word-break: break-all my-2  text-${theme === "dark" ? "white" : "bg-slate-600"
                  } `}
              >
                {ourCard.groupdescription}
              </p>
            )}
          </div>
        </header>
        <main 
        className="  xl:grid grid-rows-1  md:grid grid-cols-4  mt-6 mb-10 flex sm:flex items-center justify-center flex-col">
          <aside
            className={`col-span-1 bg-white 
              }  w-[60vw] md:w-[10rem] xl:w-[15rem] md:m-5 mr-5 px-1 py-2 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5  `}
          >
            <h1 className="p-3">Flashcards</h1>
            <hr />
            <hr className="mb-2" />

            {/* CREATING SIDE MENU */}
            {ourCard.cards &&
              ourCard.cards.map((card) => (
                <p
                  key={card.cardid}
                  className={`py-3 px-3 word-break: break-all  text-${
                    theme === "dark" ? "white" : "slate-600"
                  }  bg-${
                    theme === "dark" ? "dark" : "white"
                  }  font-medium hover:bg-slate-100 cursor-pointer ${
                    card.cardid === displayCard?.cardid ? "!text-red-500 !font-bold" : ""
                  }`}
                  onClick={() => showCard(card.cardid)}
                >
                  {card.cardname}
                </p>
              ))}
          
          </aside>

          {/*CARD IMAGE & CARD DESCRIPTION SECTION */}
          <section
          className={`col-span-2 bg-white  
        }  w-[20rem] md:w-[20rem] xl:w-[36rem] md:m-5 m-5 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5 `}
        >
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              containerClass="container mx-auto"
              draggable
              focusOnSelect={false}
              infinite
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 1,
                  partialVisibilityGutter: 40,
                },
                tablet: {
                  breakpoint: {
                    max: 1023,
                    min: 768,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                mobile: {
                  breakpoint: {
                    max: 767,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
              afterChange={(index) => handleCarouselChange()} 
              ref={componentRef}
            >
              {filteredCardData.map((card) => (
                <div key={card.cardid}>{renderCard(card)}</div>
              ))}
            </Carousel>
        </section>
        
        
          {/*BUTTONS PART- SHARE, DOWNLOAD,PRINT */}
          <aside className="col-span-1 md:flex flex-col items-center justify-centre "  >

            <button
              type="button"
              onClick={openModal}
              className={`flex items-center w-[60vw] md:w-[10rem] xl:w-[15rem] md:m-5 mr-5 px-4 py-4 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5 hover:scale-105  mt-2 py-3 px-4 xl:w-60 space-x-5  text-${theme === "dark" ? "white" : "slate-600"
            } rounded-md shadow-lg  transition-all duration-100 hover:scale-105 border-2 sm:border-none bg-white`}        >
              <RiArrowGoBackLine className="scale-x-[-1]" />
              <span className=" xl:block">Share</span>
            </button>


            {/* DOWNLOAD BUTTON*/}
            
            <button
              className={`flex items-center w-[60vw] md:w-[10rem] xl:w-[15rem] md:m-5 mr-5 px-4 py-4 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5 hover:scale-105  mt-2 py-3 px-4 xl:w-60 space-x-5  text-${theme === "dark" ? "white" : "slate-600"
                } rounded-md shadow-lg  transition-all duration-100 hover:scale-105 border-2 sm:border-none bg-white`}
                >
              <IoDownloadOutline />
              <span className=" xl:block">Download</span>
            </button>

            {/*PRINT BUTTON*/}
            
            <ReactToPrint
              trigger={() => (
                <button
                  onClick={handlePrint}
                  className={`flex items-center w-[60vw] md:w-[10rem] xl:w-[15rem] md:m-5 mr-5 px-4 py-4 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5 hover:scale-105  mt-2 py-3 px-4 xl:w-60 space-x-5  text-${theme === "dark" ? "white" : "slate-600"
                } rounded-md shadow-lg  transition-all duration-100 hover:scale-105 border-2 sm:border-none bg-white`}
                >
                  <IoPrintOutline />
                  <span className=" xl:block ">Print</span>
                </button>
              )}
              content={() => componentRef.current}
            />
          </aside>
        </main>
        <ShareModal isOpen={isOpen} closeModal={closeModal} />

      </section>
    
    </>
  );
};

export default FlashcardDetails;
