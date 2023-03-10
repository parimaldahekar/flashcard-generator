import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FlashCardSchema from "../Components/Validation/FlashCardSchema";
import { nanoid } from "nanoid";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setFlashCard } from "../State/reducers";
import { toast } from "react-toastify";

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const filePicker = useRef(null);
  const filePickerForCard = useRef(null);
  const inputRef = useRef([]);
  inputRef.current = [];
  const [groupImg, setGroupImg] = useState("");
  const [cardImg, setCardImg] = useState([]);

  // Function to add a new input element to the inputRef array
  const addRef = (item) => {
    if (item && !inputRef.current.includes(item)) {
      inputRef.current.push(item);
    }
  };
  // Function to add the new flashcard to the store and reset the form and state variables
  const addFlashCard = (values, actions) => {
    dispatch(setFlashCard(values));
    actions.resetForm();
    setGroupImg("");
    setCardImg("");
    toast.success("Flashcard created successfully");
  };

  // Function to handle the removal of an image from the cardImg state variable
  const handleImage = (index) => {
    const values = Object.values(cardImg);
    if (index > 0) setCardImg(values);
  };

  return (
    <Formik
      initialValues={{
        groupid: nanoid(),
        groupname: "",
        groupdescription: "",
        groupimg: null,
        cards: [
          {
            cardid: nanoid(),
            cardname: "",
            carddescription: "",
            cardimg: "",
          },
        ],
        createOn: new Date(Date.now()).toLocaleString(),
      }}
      validationSchema={FlashCardSchema}
      onSubmit={addFlashCard}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form
          className={`w-full space-y-5 text-slate-600
            } font-medium`}
        >
          {/* form section to create a group */}
          <div
            className={`flex flex-col px-10 py-4 bg-white
              } shadow-sm shadow-white space-y-4 rounded-md border-2 `}
          >
            <div className={`flex flex-col sm:flex-row  lg:space-x-10 pt-3`}>
              <div className={`flex flex-col relative`}>
                <h2>Create Group {"*"}</h2>

                {/*FEATURE TO SHOW THE SELECTED GROUP IMAGE */}
                {values.groupimg ? (
                  <div className="flex items-center space-x-3  my-5">
                    <div className="w-full min-w-[100px] min-h-[100px] bg-gray-200 max-w-[100px] max-h-[100px]  overflow-hidden  flex rounded-full shadow-md hover:ring-2 hover:-translate-y-1 transition-all ease-in-out duration-300 hover:ring-slate-500 hover:shadow-2xl">
                      <img
                        className="object-cover"
                        src={values.groupimg}
                        alt="groupimg"
                      />
                    </div>

                    {/* ICON TO DELETE THE SELECTED IMAGE */}
                    <label
                      onClick={() => {
                        setFieldValue(`groupimg`, "");
                        setGroupImg("");
                      }}
                    ><button>
                    <AiOutlineDelete color="#7F8487" size={"1.5rem"} />
                    </button>
                    </label>
                  </div>
                ) : (
                  ""
                )}
                
                <Field
                  type="text"
                  name="groupname"
                  className={`border-slate-400 h-11 rounded-md p-2 lg:w-72 md:w-72   bg-gray-50 border  text-gray-900 text-sm `}
                />
                <ErrorMessage
                  component={"div"}
                  className=" text-sm text-red-600"
                  name="groupname"
                />
              </div>

              {/*BUTTON TO UPLOAD IMAGE FOR GROUP */}
              {groupImg ? (
                ""
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    filePicker.current.click();
                  }}
                  className={`flex items-center justify-center px-5 py-2 my-3 h-10 md:mt-6 lg:my-6 item-center md:ml-2 sm:ml-2 sm:mt-6 bg-white border-2 border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-md space-x-2 `}
                >
                  <UploadOutlined className={`flex items-center`} />
                  <span className={`text-sm sm:text-base sm:text-center`}>
                    Upload Image
                  </span>
                  <input
                    type="file"
                    ref={filePicker}
                    value={groupImg}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);

                      reader.onload = () => {
                        setFieldValue("groupimg", reader.result);
                        setGroupImg(reader.result);
                      };
                    }}
                    hidden
                  />
                </button>
              )}
            </div>

            {/* GROUP DESCRIPTION*/}
            <div className="flex flex-col w-full sm:w-[70%]">
              <h2 className="mb-2">Add Description</h2>
              <Field
                as="textarea"
                name="groupdescription"
                rows={3}
                placeholder="Describe the roles, responsibilities, skills required for the job and help candidate understand the role better"
                className="resize-none  border-slate-400 h-16 rounsded-md focus:h-24 p-2 lg:w-auto md:w-72 transition-all ease-in-out bg-gray-50 border duration-500  text-gray-900 text-sm "
              />
              <ErrorMessage
                component={"div"}
                className="text-sm text-red-500"
                name="groupdescription"
              />
            </div>
          </div>

          {/* CARDS SECTION  */}
          <div
            className={`flex flex-col p-1 bg-white 
        } shadow-sm shadow-white space-y-4 rounded-md `}
          >
            {/* FieldArray component from Formik which will create Dynamic Form for the custom input */}
            <FieldArray name="cards">
              {(arrayHelper) => {
                const cards = values.cards;
                return (
                  <>
                    {cards && cards.length > 0
                      ? cards.map((card, index) => (
                        <div
                          className={`flex flex-col px-10 py-3 bg-white
                      } shadow-sm shadow-white space-y-4 rounded-md `}
                          key={index}
                        >
                          <div
                            className={`flex flex-col sm:flex-col md:flex-row lg:space-x-10 pt-3`}
                          >
                            <div className={`flex flex-col relative mb-5`}>
                              <h2>Enter Term {"*"}</h2>
                              {/* INPUT FIELD TO CARDS TERM */}
                              <Field
                                type="text"
                                name={`cards.${index}.cardname`}
                                innerRef={addRef}
                                className={`border-slate-400 h-11 rounded-md p-2 lg:w-72 md:w-52 md:mr-2 bg-gray-50 border  text-gray-900 text-sm `}
                              />{" "}
                              <ErrorMessage
                                component={"div"}
                                className="text-sm text-red-500 mb-2"
                                name={`cards.${index}.cardname`}
                              />
                            </div>
                            <div className={`flex flex-col relative mb-5`}>
                              <h2>Enter Definition {"*"}</h2>
                              {/*INPUT FIELD TO CARD DESCRIPTION */}
                              <Field
                                as="textarea"
                                name={`cards.${index}.carddescription`}
                                className="border-slate-400 h-11 rounded-md p-2 lg:w-72 md:w-52 md:mr-2 bg-gray-50 border  text-gray-900 text-sm "
                              />{" "}
                              <ErrorMessage
                                component={"div"}
                                className="text-sm text-red-500"
                                name={`cards.${index}.carddescription`}
                              />
                            </div>

                            {/* BUTTON TO SELECT THE IMAGE FOR CARDS */}
                            <div className="flex">
                              {cardImg && cardImg[index] ? (
                                <div className="md:flex ">
                                  <div
                                    className={`w-full relative min-w-[150px]   max-w-[200px] max-h-[250px]  flex hover:border-slate-400 `}
                                  >
                                    <label className="mt-0">
                                      <img
                                        src={values.cards[index].cardimg}
                                        alt=""
                                        className="w-28 h-28 object-contain"
                                      />
                                    </label>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              {cardImg && cardImg[index] ? (
                                ""
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    filePickerForCard?.current?.click();
                                  }}
                                  name={`cards[${index}].cardimg`}
                                  className={` p-1 md:mt-7 md:h-9 bg-white border-2 border-blue-600 active:border-slate-300 text-blue-700 font-semibold rounded-md space-x-2 w-auto sm:w-42  `}
                                >
                                  <span>Select Image</span>
                                  <input
                                    type="file"
                                    name={`cards[${index}].cardimg`}
                                    ref={filePickerForCard}
                                    value={cardImg[index]}
                                    onChange={(e) => {
                                      const file1 = e.target.files[0];
                                      const readerForCardImg =
                                        new FileReader();
                                      readerForCardImg.readAsDataURL(file1);
                                      readerForCardImg.onload = () => {
                                        setFieldValue(
                                          `cards.${index}.cardimg`,
                                          readerForCardImg.result
                                        );
                                        setCardImg((prev) => ({
                                          ...prev,
                                          [index]: readerForCardImg.result,
                                        }));
                                      };
                                    }}
                                    hidden
                                  />
                                </button>
                              )}

                              <div className="flex items-centre md:mt-3 lg:mt-4 ml-3 w-3 md:flex-col md:space-y-5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (index > 0) arrayHelper.remove(index);
                                    handleImage(index);
                                  }}>
                                  <TrashIcon className="h-6 mr-2 text-slate-500" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    inputRef.current[index].focus();
                                  }}>
                                  <PencilAltIcon className="h-6 text-blue-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                      : null}

                    {/* BUTTON TO CREATE SAME GROUP OF INPUTS */}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelper.push({
                          cardid: nanoid(),
                          cardname: "",
                          carddescription: "",
                          cardimg: null,
                        })
                      }
                      className={`flex items-center space-x-2 text-blue-600 font-medium text-sm bg-white  px-10 py-2 w-30`}
                    >
                      <PlusOutlined />
                      <span>Add More</span>
                    </button>
                    <div className="flex justify-center w-full">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="py-2 px-7  bg-red-600 text-white rounded-md "
                        style={{ marginBottom: "30px" }}
                      >
                        Create
                      </button>
                    </div>
                  </>
                );
              }}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
