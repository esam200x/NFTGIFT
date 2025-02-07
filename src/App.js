import React from 'react';
import { Header } from './Header';
import { Address } from './Address';
import { Wallet } from './Wallet';
import { ModalControl } from './ModalControl';
import { Settings } from './Settings';
import { ConnectParameters } from './ConnectParameters';

function App() {
    return (
        <div className="App container text-center mt-5">
            {/* Header */}
            <Header />
            {/* Address Component */}
            <Address />
            {/* Wallet Component */}
            <Wallet />
            {/* Modal Control */}
            <ModalControl />
            {/* Settings */}
            <Settings />
            {/* Connect Parameters */}
            <ConnectParameters />
        </div>
    );
}

export default App;
