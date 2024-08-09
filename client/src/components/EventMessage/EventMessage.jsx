import React from 'react';
import './EventMessage.css';

function EventMessage({ isOpen, onClose, message ,statuss,buttonText}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{statuss}</h2>
        <p>{message}</p>
        <button onClick={onClose}>{buttonText}</button>
      </div>
    </div>
  );
}

export default EventMessage;