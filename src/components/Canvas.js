import React, { forwardRef } from 'react';
import { Rnd } from 'react-rnd';

const Canvas = forwardRef(({ elements, setElements, selectedElement, setSelectedElement, background, qrCodeUrl }, ref) => {
  const handleDragStop = (id, e, d) => {
    const newElements = elements.map(element => {
      if (element.id === id) {
        return { ...element, x: d.x, y: d.y };
      }
      return element;
    });
    setElements(newElements);
  };

  const handleResizeStop = (id, e, direction, ref, delta, position) => {
    const newElements = elements.map(element => {
      if (element.id === id) {
        return { ...element, width: ref.style.width, height: ref.style.height, x: position.x, y: position.y };
      }
      return element;
    });
    setElements(newElements);
  };

  const handleSelectElement = (id) => {
    setSelectedElement(id);
  };



  return (
    <div className="canvas mt-2 mb-2" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} ref={ref}>
      {elements.map((element, index) => (
        <Rnd
          key={element.id}
          size={{ width: element.width, height: element.height }}
          position={{ x: element.x, y: element.y }}
          onDragStop={(e, d) => handleDragStop(element.id, e, d)}
          onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(element.id, e, direction, ref, delta, position)}
          onClick={() => handleSelectElement(element.id)}
          style={{
            border: selectedElement === element.id ? '1px solid grey' : 'none',
            zIndex: element.zIndex,
            fontSize: `${element.fontSize}px`,
            fontFamily: element.fontFamily,
            fontWeight: element.fontWeight,
            fontStyle: element.fontStyle,
            opacity: element.opacity,
            backgroundColor: element.backgroundColor
          }}
        >
          {element.type === 'text' && (
            <div style={{
              fontSize: element.fontSize,
              color: element.color,
              fontFamily: element.fontFamily,
              fontWeight: element.fontWeight,
              fontStyle: element.fontStyle
            }}>
              {element.content}
            </div>
          )}
          {(element.type === 'logo' || element.type === 'signature') && (
            <img src={element.src} alt={element.type} style={{ width: '100%', height: '100%' }} />
          )}
        </Rnd>
      ))}
      {qrCodeUrl && (
        <img
          src={qrCodeUrl}
          alt="QR Code"
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            left: elements.find(e => e.type === 'qrCode')?.x || '10px',
            top: elements.find(e => e.type === 'qrCode')?.y || '10px'
          }}
        />
      )}
    </div>
  );
});

export default Canvas;
