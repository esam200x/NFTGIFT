import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { EntrypointPage } from './EntrypointPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <TonConnectUIProvider
            manifestUrl="https://esam200x.github.io/NFTGIFT/tonconnect-manifest.json"
            enableAndroidBackHandler={false}
        >
            <EntrypointPage>
                <App />
            </EntrypointPage>
        </TonConnectUIProvider>
    </React.StrictMode>
);
