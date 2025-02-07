import React from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const ConnectParameters = () => {
    const [tonConnectUI] = useTonConnectUI();

    const setLoadingState = () => {
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });
        alert("تم تعيين حالة التحميل.");
    };

    const setReadyState = async () => {
        const tonProofPayload = "your-proof-payload"; // استبدل هذا بـ tonProof الحقيقي
        tonConnectUI.setConnectRequestParameters({
            state: 'ready',
            value: { tonProof: tonProofPayload }
        });
        alert("تم تعيين حالة الجاهزية مع tonProof.");
    };

    const clearParameters = () => {
        tonConnectUI.setConnectRequestParameters(null);
        alert("تم إزالة المعلمات.");
    };

    return (
        <div>
            <button onClick={setLoadingState}>Set Loading State</button>
            <button onClick={setReadyState}>Set Ready State with tonProof</button>
            <button onClick={clearParameters}>Clear Parameters</button>
        </div>
    );
};
