import React, {useEffect,useState,useRef,useCallback,useMemo} from "react";
import { useSelector } from "react-redux";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoDownloadOutline, IoPrintOutline } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import ReactToPrint from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import ShareModal from "../Components/Share/ShareModal";
import defaultImg from "../Assets/default-img.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Function to print the current window
const handlePrint = () => {
  window.print();
};

// Function to download a PDF of the current card using html2canvas and jsPDF libraries
const renderCard = (card) => {
  const downloadPDF = () => {
    const cardElement = document.getElementById(`card-${card.cardid}`);
    // Use html2canvas to create a canvas element of the card
    html2canvas(cardElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save(`card-${card.cardid}.pdf`);
    });
  };

  return (
    // Render the card element with its ID based on the card ID
    <div
      className="flex flex-col items-center justify-center"
      key={card.cardid}
      id={`card-${card.cardid}`}
    >
      {/* If the card image exists, render it with a specified size and padding. 
          If it does not exist, render a default image. */}
      {card.cardimg ? (
        <img
          className="object-contain w-72 xl:w-1/2 h-52 p-6"
          src={card.cardimg}
          alt={card.cardimg}
        />
      ) : (
        <img
          src={defaultImg}
          alt="cardimage"
          className="object-contain w-72 xl:w-1/2 h-52 p-6"
        />
      )}
      {/* Render the card description with a specified style */}
      <p className={`w-full p-6 py-5 break-all text-slate-600`}>
        {card.carddescription}
      </p>
      {/* Render a download button with a specified style, which triggers the downloadPDF function on click */}
      <button
        className={`flex items-center md:m-5 mb-4 px-4 py-4 h-fit rounded-md border-2  space-x-5  text-slate-600
        } rounded-md shadow-lg  transition-all duration-100 hover:scale-105 border-2 sm:border-none bg-white`}
        onClick={downloadPDF}
      >
        {/* Render an icon inside the button using a third-party library */}
        <IoDownloadOutline />
      </button>
    </div>
  );
};

const FlashcardDetails = () => {
  const { groupId } = useParams();
  const componentRef = useRef();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const cards = useSelector((state) => state.flashcard.flashcards);
  const [ourCard, setOurCard] = useState({});
  const [displayCard, setDisplayCard] = useState(null);
  const [, setCardIndex] = useState(0);
  const cardData = useMemo(() => ourCard.cards || [], [ourCard]);

  // Declare a function showCard that sets the displayCard state variable to the card object with the given cardid
  const showCard = useCallback(
    (cardid) => {
      setDisplayCard(ourCard.cards.find((card) => card.cardid === cardid));
    },
    [ourCard]
  );

  // Declare a function handleCarouselChange that sets the displayCard state variable to the card object at the given index in the cardData array
  const handleCarouselChange = useCallback(
    (currentIndex) => {
      setDisplayCard(cardData[currentIndex]);
    },
    [cardData]
  );

  // Use useMemo hook to filter the cardData array based on the displayCard state variable
  const filteredCardData = useMemo(
    () =>
      displayCard
        ? cardData.filter((card) => card.cardid === displayCard.cardid)
        : cardData,
    [cardData, displayCard]
  );

  // Use useEffect hook to update ourCard and setCardIndex state variables when the groupId or cards props change
  useEffect(() => {
    if (!groupId || !cards) return;
    const temp = cards.filter((a) => a.card.groupid === groupId);
    setOurCard(temp[0].card);
    setCardIndex(0);
  }, [groupId, cards]);

  return (
    <>
      {/* A section with a flex layout and a text color of slate-700 */}
      <section className="flex flex-col text-slate-700">
        {/* A header section */}
        <header className="flex">
          {/* A back arrow icon which has a click event that goes back one page */}
          <BiArrowBack
            className="text-3xl mr-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex flex-col">
            <h2 className={`text-xl font-bold text-bg-slate-600`}>
              {ourCard.groupname}
            </h2>
            {ourCard.groupdescription && (
              <p className={`word-break: break-all my-2  text-bg-slate-600"`}>
                {ourCard.groupdescription}
              </p>
            )}
          </div>
        </header>
        {/* The main section */}
        <main className="xl:grid grid-rows-1 md:grid grid-cols-4 mt-6 mb-10 flex sm:flex items-center justify-center flex-col">
          <aside
            className={`col-span-1 bg-white w-[60vw] md:w-[10rem] xl:w-[15rem] md:m-5 mr-5 px-1 py-2 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5`}
          >
            <h1 className="p-3">Flashcards</h1>
            <hr />
            <hr className="mb-2" />
            {/* If there are flashcards, display them */}
            {ourCard.cards &&
              ourCard.cards.map((card) => (
                <p
                  key={card.cardid}
                  className={`py-3 px-3 word-break: break-all text-slate-600 bg-white font-medium hover:bg-slate-100 cursor-pointer ${
                    card.cardid === displayCard?.cardid
                      ? "!text-red-500 !font-bold"
                      : ""
                  }`}
                  onClick={() => showCard(card.cardid)}
                >
                  {card.cardname}
                </p>
              ))}
          </aside>

          
          {/* Renders a carousel section for displaying filtered card data */}

          <section
            className={`col-span-2 bg-white  z-0
        }  w-[20rem] md:w-[20rem] lg:w-[27rem] xl:w-[30rem] 2xl:w-[36rem] md:m-5 m-5 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5 `}
          >
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={200}
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


           {/* Renders a share section*/}
          <aside className="col-span-1 md:flex flex-col ">
            <button
              type="button"
              onClick={openModal}
              className={`flex items-center justify-centre w-[40vw] md:w-[10rem] xl:w-[10rem] md:m-5 mr-5 px-4 py-4 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5 hover:scale-105  mt-2 py-3 px-4 xl:w-60 space-x-5  text-slate-600
            } rounded-md shadow-lg  transition-all duration-100 hover:scale-105 border-2 sm:border-none bg-white`}
            >
              <RiArrowGoBackLine className="scale-x-[-1]" />
              <span className=" xl:block">Share</span>
            </button>
            
           {/* Renders a print section for displaying filtered card data */}
            <ReactToPrint
              trigger={() => (
                <button
                  onClick={handlePrint}
                  className={`flex items-center justify-centre flex  sm:w-[10rem] w-[40vw] md:w-[10rem] xl:w-[10rem] md:m-5 mr-5 px-4 py-4 h-fit rounded-md border-2 sm:w-[83vw] sm:mx-5 hover:scale-105  mt-2 py-3 px-4 xl:w-60 space-x-5  text-slate-600"
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
        <ShareModal
          classNamme={`z-1`}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </section>
    </>
  );
};

export default FlashcardDetails;
