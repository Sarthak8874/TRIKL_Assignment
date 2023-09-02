import React from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

const TextBox = ({
  text,
  position,
  onTextChange,
}) => {

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 5px #FFFFFF",
    color:"white"
  };

  return (
    <Draggable
      bounds="parent"
      position={position}
      onStop={(e, data) => {
        onTextChange({ position: { x: data.x, y: data.y } });
      }}
    >
      <Resizable
        style={style}
        defaultSize={{
          width: 100,
          height: 100,
        }}
      >
        {text}
      </Resizable>
    </Draggable>
  );
};

export default TextBox;
