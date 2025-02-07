import React from 'react';
import { useIsConnectionRestored } from '@tonconnect/ui-react';

export const EntrypointPage = ({ children }) => {
    const connectionRestored = useIsConnectionRestored();

    if (!connectionRestored) {
        return <div>Please wait...</div>; // رسالة تحميل
    }

    return <>{children}</>;
};
