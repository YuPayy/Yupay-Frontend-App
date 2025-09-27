import React from 'react';

const glassStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.4)', // bayangan belakang
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const alertStyle = {
    minWidth: 300,
    padding: '32px 24px',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.15)',
    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: '#fff',
    textAlign: 'center',
};

const GlassAlert = ({ message, onClose }) => (
    <div style={glassStyle} onClick={onClose}>
        <div style={alertStyle} onClick={e => e.stopPropagation()}>
            {message}
            <br />
            <button onClick={onClose} style={{marginTop: 16}}>Tutup</button>
        </div>
    </div>
);

export default GlassAlert;