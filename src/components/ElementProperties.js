import React from 'react';
import { Button } from '@material-ui/core';

function ElementProperties({ selectedElement, elements, updateElement }) {
  const element = elements.find(el => el.id === selectedElement);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateElement({ ...element, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0]);
      updateElement({ ...element, src });
    }
  };

  const handleLayerChange = (direction) => {
    updateElement({ ...element, zIndex: element.zIndex + direction });
  };

  if (!element) return null;

  return (
    <div className="element-properties">
      {element.type === 'text' && (
        <>
          <input
            type="text"
            name="content"
            value={element.content}
            onChange={handleChange}
            placeholder="Text Content"
            className='text-secondary p-1'
          />
          <input
            type="color"
            name="color"
            value={element.color}
            onChange={handleChange}
            className='color'
          />
          <input
            type="number"
            name="fontSize"
            value={element.fontSize}
            onChange={handleChange}
            placeholder="Font Size"
          />
          <select
            name="fontFamily"
            value={element.fontFamily || 'Arial'}
            onChange={handleChange}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
          <select
            name="fontWeight"
            value={element.fontWeight || 'normal'}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
          <select
            name="fontStyle"
            value={element.fontStyle || 'normal'}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </>
      )}
      {(element.type === 'logo' || element.type === 'signature') && (
        <>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <label>Opacity:</label>
          <input
            type="range"
            name="opacity"
            value={element.opacity || 1}
            min="0"
            max="1"
            step="0.1"
            onChange={handleChange}
          />
        </>
      )}
     
        <Button onClick={() => handleLayerChange(1)} variant="outlined" color="primary">Bring to Front</Button>
        <Button onClick={() => handleLayerChange(-1)} variant="outlined" color="secondary">Send to Back</Button>
    
    </div>
  );
}

export default ElementProperties;
