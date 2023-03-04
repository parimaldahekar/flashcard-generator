import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-daisyui";
import { IoMdClose } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import Facebook from "../../Assets/facebook-icon.svg";
import Linkedin from "../../Assets/linkedin-icon.svg";
import Whatsapp from "../../Assets/whatsapp-icon.svg";
import Twitter from "../../Assets/twitter-icon.svg";
import Mail from "../../Assets/mail-icon.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";

const ShareModal = ({ isOpen, closeModal }) => {
  const INPUT_LINK = `http://www.almabetter.com/`;
  const [isCopied, setIsCopied] = useState(false);

  // this useEffect is to set the status to default, after copying the Link
  useEffect(() => {
    isCopied &&
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
  }, [isCopied]);

  return (
    <Modal open={isOpen} onClickBackdrop={closeModal} className="bg-white">
    
      <Button
        size="sm"
        shape="circle"
        className="absolute right-2 top-2 bg-white border-none text-slate-700 text-2xl font-bold"
        onClick={() => {
          setIsCopied(false);
          closeModal();
        }}
      >
        ✕
      </Button>
      <Modal.Header className="font-bold">Share</Modal.Header>
        
      <Modal.Body>
      {/* This div contains the link and the copy button */}
        <div className="m-5 flex flex-col">
          <IoMdClose
            onClick={closeModal}
            className="absolute text-slate-500 right-3 top-3 text-2xl cursor-pointer"
          />

          <div className="flex items-center space-x-3">
            <p className="flex items-center flex-1 border-2 p-2 text-xs text-slate-500 border-slate-300 rounded-md border-dashed">
              Link:
              <span className="mx-2 font-semibold text-xs overflow-x-hidden text-black">
                https://flashcard-generator-pd.netlify.app/
              </span>
            </p>

      {/* This component is used to copy the link to clipboard */}
            <CopyToClipboard text={INPUT_LINK} onCopy={() => setIsCopied(true)}>
              <TbCopy className="text-xl text-slate-500 scale-x-[-1] cursor-pointer w-5"/>
            </CopyToClipboard>

            <BsShare className="text-xl text-slate-500 cursor-pointer w-5" />
          </div>

      {/* This message is displayed when the link has been copied */}
          <h2 className="p-2 h-5 ml-3 text-sm text-red-500 font-semibold">
            {isCopied && "Link copied to clipboard"}
          </h2>

      {/* This div contains social media share buttons */}
      <div className="mt-6  flex items-center space-x-10 justify-center ">
      {/* Facebook Share Button */}
      <FacebookShareButton url="https://www.facebook.com/">
        <img
          src={Facebook}
          alt="Facebook"
          className="w-20 sm:w-7  bg-slate-100 rounded-lg cursor-pointer"
        />
      </FacebookShareButton>
    
      {/* LinkedIn Share Button */}
      <LinkedinShareButton url="https://www.linkedin.com/">
        <img
          src={Linkedin}
          alt="Linkedin"
          className="w-20 sm:w-7 bg-slate-100 rounded-lg cursor-pointer"
        />
      </LinkedinShareButton>
    
      {/* Whatsapp Share Button */}
      <WhatsappShareButton url="https://web.whatsapp.com/">
        <img
          src={Whatsapp}
          alt="Whatsapp"
          className="w-20 sm:w-7 bg-slate-100 rounded-lg cursor-pointer"
        />
      </WhatsappShareButton>
    
      {/* Twitter Share Button */}
      <TwitterShareButton url="https://twitter.com/">
        <img
          src={Twitter}
          alt="Twitter"
          className="w-20 sm:w-7  bg-slate-100 rounded-lg cursor-pointer"
        />
      </TwitterShareButton>
    
      {/* Email Share Button */}
      <EmailShareButton url="https://gmail.com/">
        <img
          src={Mail}
          alt="Mail"
          className="w-20 sm:w-7  bg-slate-100 rounded-lg cursor-pointer"
        />
      </EmailShareButton>
    </div>
    
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ShareModal;
