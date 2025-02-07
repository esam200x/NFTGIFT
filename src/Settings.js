import React from 'react';
import { Locales, useTonConnectUI } from '@tonconnect/ui-react';

export const Settings = () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();

    const onLanguageChange = (lang) => {
        setOptions({ language: lang });
    };

    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 ثانية
        messages: [
            {
                address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
                amount: "20000000",
            },
            {
                address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
                amount: "60000000",
            }
        ]
    };

    return (
        <div>
            <button onClick={() => tonConnectUI.sendTransaction(myTransaction)}>
                Send transaction
            </button>
            <div>
                <label>Language:</label>
                <select onChange={(e) => onLanguageChange(e.target.value)}>
                    <option value="en">English</option>
                    <option value="ru">Russian</option>
                </select>
            </div>
        </div>
    );
};
