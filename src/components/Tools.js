import React, { useRef } from 'react';
import { Button } from '@material-ui/core';

const Toolbar = ({ addElement, setCanvasBackground, resetCanvas }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    if (e.target.files[0]) {
      setCanvasBackground(URL.createObjectURL(e.target.files[0]));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="toolbar pt-2">
      <h2 className='text-danger mb-5'>Certificate Designer</h2>
      <Button onClick={() => addElement('text')} variant='outlined' className='mb-1 w-100'>Add Text</Button>
      <Button onClick={() => addElement('logo')} variant='outlined' className='mb-1 w-100'>Add Logo</Button>
      <Button onClick={() => addElement('signature')} variant='outlined' className='mb-1 w-100'>Add Signature</Button>
      <Button onClick={triggerFileInput} variant='outlined' className='mb-1 w-100'>Add Background</Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: 'none' }} 
      />
      <Button onClick={resetCanvas} variant="contained" color="secondary" className='w-100'>Reset</Button>
    </div>
  );
};

export default Toolbar;
