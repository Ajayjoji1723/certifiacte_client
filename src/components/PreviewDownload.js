import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import CertificatePreview from './CertificatePreview';
import { ShareIcon } from '@heroicons/react/outline';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const PreviewDownload = ({ elements, background, generateQRCode, qrCodeUrl }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const downloadCertificate = () => {
    html2canvas(document.querySelector('.certificate-preview')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('certificate.pdf');
    });
  };

  const verificationLink = window.location.href;

  return (
    <div className='d-flex flex-row justify-content-between mt-3'>
      <Button variant="contained" color="primary" onClick={generateQRCode} className=''>
        Generate QR Code
      </Button>
      <Button variant="contained" onClick={handlePreviewToggle} className='' color='primary'>
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </Button>
      <Button variant="contained" color="primary" onClick={toggleShareOptions} className='' >
        <ShareIcon className="h-5 w-5 text-gray-600" />
      </Button>
      
      {showShareOptions && (
        <div style={{ backgroundColor: 'white',  zIndex: 1000, position:'relative', right:'175px' }} >
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
      <Dialog
        open={showPreview}
        onClose={handlePreviewToggle}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <CertificatePreview elements={elements} background={background} qrCodeUrl={qrCodeUrl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={downloadCertificate} color="primary">
            Download as PDF
          </Button>
          <Button onClick={handlePreviewToggle} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PreviewDownload;
