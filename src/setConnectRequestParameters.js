import React from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const SetConnectRequestParameters = () => {
    const [tonConnectUI] = useTonConnectUI();

    const setLoadingState = () => {
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });
    };

    return (
        <button onClick={setLoadingState}>Set Loading State</button>
    );
};
