import { useState } from "react";
import ChevronUp from "../Icons/ChevronUp";
import ChevronDown from "../Icons/ChevronDown";
import Trash from "../Icons/Trash";

const GameDescProps = ({ name, props, setProps, addLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  function addProps() {
    setProps((prevDesc) => {
      return [
        ...prevDesc,
        {
          description: "",
          imageLink: "",
        },
      ];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevDesc) => {
      const newDesc = [...prevDesc];
      newDesc[index][prop] = newValue;
      return newDesc;
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
          props.map((desc, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between px-4 py-2">
              <div className="flex flex-col">
                <label>Description:</label>
                <textarea
                  placeholder="Game Description..."
                  value={desc.description}
                  onChange={(ev) => editProp(ev, index, "description")}
                  rows="4" cols="40"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-2 md:mt-0">Image Link:</label>
                <input
                  type="text"
                  placeholder="Image Link"
                  value={desc.imageLink}
                  onChange={(ev) => editProp(ev, index, "imageLink")}
                  className="p-2 border rounded-md md:w-72"
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
        <button className="mt-2" onClick={addProps} type="button">
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default GameDescProps;
