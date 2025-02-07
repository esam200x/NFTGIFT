// Header.js
import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

export const Header = () => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8f9fa' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My App with React UI</span>
            <TonConnectButton />
        </header>
    );
};
