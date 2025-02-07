import React from 'react';
import { useTonAddress } from '@tonconnect/ui-react';

export const Address = () => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    if (!userFriendlyAddress) {
        return null; // لا تعرض أي شيء إذا لم يكن هناك عنوان متصل
    }

    return (
        <div>
            <span>User-friendly address: {userFriendlyAddress}</span>
            <br />
            <span>Raw address: {rawAddress}</span>
        </div>
    );
};
