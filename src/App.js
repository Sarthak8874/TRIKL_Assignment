import React, { useState, useEffect } from "react";
import axios from "axios";
import TextBox from "./TextBox";

import "./App.css";

const App = () => {
  const [textOverlayElements, setTextOverlayElements] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              client_id: "Ap62Cz3delkG86fIA15MTici0GBC68G_VZvmow2VXyw",
            },
          }
        );
        setImageData(response.data);
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    };
    fetchImage();
  }, []);

  const handleAddText = () => {
    if (textInput.trim() !== "") {
      const newTextElement = {
        text: textInput,
        position: { x: 0, y: 0 }, // Initial position
      };
      setTextOverlayElements([...textOverlayElements, newTextElement]);
      setTextInput("");
    }
  };

  const handleTextChange = (index, newTextProps) => {
    const updatedElements = [...textOverlayElements];
    updatedElements[index] = { ...updatedElements[index], ...newTextProps };
    setTextOverlayElements(updatedElements);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${imageData?.urls?.regular})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "90vh",
    position: "fixed",
    zIndex: -1,
    top: "10vh",
  };

  return (
    <div className="App mt-2">
      <div>
        <input
          type="text"
          placeholder="Enter custom text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button
          className="bg-black text-white p-1 rounded-lg hover:bg-white hover:text-black border border-black"
          onClick={handleAddText}
        >
          Add Text
        </button>
      </div>
      <div style={backgroundImageStyle}>
        {textOverlayElements.map((element, index) => (
          <TextBox
            key={index}
            text={element.text}
            position={element.position}
            size={element.size}
            onTextChange={(newTextProps) =>
              handleTextChange(index, newTextProps)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
