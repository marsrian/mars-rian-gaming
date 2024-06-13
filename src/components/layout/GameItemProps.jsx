import React, { useState } from "react";
import ChevronUp from "../Icons/ChevronUp";
import ChevronDown from "../Icons/ChevronDown";
import Trash from "../Icons/Trash";

const GameItemProps = ({ name, props, setProps, addLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  function addProps() {
    setProps((prevVideos) => {
      return [
        ...prevVideos,
        {
          serial: 0,
          videoLink: "",
        },
      ];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevVideos) => {
      const newVideos = [...prevVideos];
      newVideos[index][prop] = newValue;
      return newVideos;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="mb-2 bg-gray-200 rounded-md p-2">
      <button onClick={() => setIsOpen((prev) => !prev)} type="button">
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        {name}
        <span className="ml-1">{props.length}</span>
      </button>
      <div className={isOpen ? "block mt-2" : "hidden"}>
        {props.length > 0 &&
          props.map((video, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row border py-2 rounded-md"
            >
              <div className="">
                <label>Serial:</label>
                <input
                  type="number"
                  id=""
                  name=""
                  placeholder="Serial Number"
                  value={video.serial}
                  onChange={(ev) => editProp(ev, index, "serial")}
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="mt-2 md:mt-0">
                <label>Video Link:</label>
                <input
                  type="text"
                  id=""
                  name=""
                  placeholder="Video Link"
                  value={video.videoLink}
                  onChange={(ev) => editProp(ev, index, "videoLink")}
                  className="p-2 border rounded-md"
                />
              </div>
              <div>
                <button
                  onClick={() => removeProp(index)}
                  type="button"
                  className="bg-white mt-4 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button onClick={addProps} type="button">
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default GameItemProps;
