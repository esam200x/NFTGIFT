import React from 'react';
import { useTonWallet } from '@tonconnect/ui-react';

export const Wallet = () => {
    const wallet = useTonWallet();

    if (!wallet) {
        return null; // لا تعرض أي شيء إذا لم تكن المحفظة متصلة
    }

    return (
        <div>
            <span>Connected wallet: {wallet.name}</span>
            <br />
            <span>Device: {wallet.device.appName}</span>
        </div>
    );
};
