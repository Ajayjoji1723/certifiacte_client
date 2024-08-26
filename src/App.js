import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Tools";
import ElementProperties from "./components/ElementProperties";
import PreviewDownload from "./components/PreviewDownload";
import axios from "axios";

function App() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const certificateRef = useRef();
  const [background, setBackground] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const addElement = (type) => {
    const newElement = {
      id: Math.random().toString(36).substring(7),
      type,
      content: "Sample Text",
      color: "#000",
      fontSize: 20,
      x: 0,
      y: 0,
      zIndex: elements.length + 1,
      src: "",
      opacity: 1,
      backgroundColor: "",
    };
    setElements([...elements, newElement]);
  };

  const updateElement = (updatedElement) => {
    const newElements = elements.map((el) =>
      el.id === updatedElement.id ? updatedElement : el
    );
    setElements(newElements);
  };

  const resetCanvas = () => {
    setElements([]);
    setBackground(null);
    setQrCodeUrl(null);
  };

  const generateQRCode = async () => {
    try {
      const certificateData = {
        elements,
        background,
      };

      const response = await axios.post(
        "http://localhost:4444/api/generate-qr",
        { certificateData }
      );
      setQrCodeUrl(response.data.qrCode);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 bg-info">
          <Toolbar
                addElement={addElement}
                setCanvasBackground={setBackground}
                resetCanvas={resetCanvas}
              />
          </div>
          <div className="col-md-9">
            <div className="">
            <PreviewDownload
                certificateRef={certificateRef}
                elements={elements}
                background={background}
                generateQRCode={generateQRCode}
                qrCodeUrl={qrCodeUrl}
              />
              <hr />
              <h4 >Customize your design</h4>
              <ElementProperties
                selectedElement={selectedElement}
                elements={elements}
                updateElement={updateElement}
              />
              <Canvas
                elements={elements}
                setElements={setElements}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                ref={certificateRef}
                background={background}
                qrCodeUrl={qrCodeUrl}
              />
             
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
