import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { ShareIcon } from '@heroicons/react/outline';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const CertificatePreview = ({ elements, background, qrCodeUrl, verificationLink }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  return (
    <div className="certificate-preview" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', width: '100%', minHeight: '100vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      {elements.map((element) => (
        <Rnd
          key={element.id}
          size={{ width: element.width, height: element.height }}
          position={{ x: element.x, y: element.y }}
          style={{
            border: '1px solid transparent',
            zIndex: element.zIndex,
            fontSize: `${element.fontSize}px`,
            fontFamily: element.fontFamily,
            fontWeight: element.fontWeight,
            fontStyle: element.fontStyle,
            opacity: element.opacity,
            backgroundColor: element.backgroundColor,
          }}
          disableDragging
          enableResizing={false}
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
            width: '250px',
            height: '250px',
            left: elements.find(e => e.type === 'qrCode')?.x || '10px',
            top: elements.find(e => e.type === 'qrCode')?.y || '10px'
          }}
        />
      )}
      <div style={{ position: 'relative', marginTop: '20px' }}>
        <button onClick={toggleShareOptions} style={{ padding: '10px', cursor: 'pointer', background: 'none', border: 'none' }}>
          <ShareIcon className="h-6 w-6 text-gray-600" />
        </button>

        {showShareOptions && (
          <div style={{ position: 'absolute', top: '40px', left: '0', backgroundColor: 'white', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 1000 }}>
            <EmailShareButton url={verificationLink} subject="Your Certificate" body="Check out your certificate!">
              <EmailIcon size={32} round />
            </EmailShareButton>
            <FacebookShareButton url={verificationLink}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={verificationLink} title="Check out my certificate!">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={verificationLink}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatePreview;
