import React, { useState } from 'react';
import { TonConnect } from '@tonconnect/sdk';

function App() {
    const [walletAddress, setWalletAddress] = useState(null);
    const [userBalance, setUserBalance] = useState(0);

    // قائمة الهدايا
    const gifts = [
        { name: "هدية 1", price: 10, image: "https://via.placeholder.com/150" },
        { name: "هدية 2", price: 20, image: "https://via.placeholder.com/150" },
        { name: "هدية 3", price: 30, image: "https://via.placeholder.com/150" }
    ];

    // عنوان المحفظة الرئيسية (محفظة الشحن)
    const mainWalletAddress = 'UQAGitCFQNH1JV2s7p6xomRZepCXk93fo11f3SaHH1P6l_-z';

    // تهيئة Ton Connect
    const connector = new TonConnect({
        manifestUrl: '/tonconnect-manifest.json' // ملف manifest في مجلد public
    });

    // وظيفة ربط المحفظة (محدثة)
    const connectWallet = async () => {
        try {
            // الحصول على قائمة المحافظ المتاحة
            const wallets = await connector.getWallets();
            if (!wallets || wallets.length === 0) {
                alert("لم يتم العثور على محافظ متاحة.");
                return;
            }

            // اختيار المحفظة الأولى (كمثال)
            const wallet = await connector.connect({ bridgeUrl: wallets[0].bridgeUrl });
            if (wallet && wallet.account) {
                setWalletAddress(wallet.account.address);
                alert(`تم ربط المحفظة بنجاح: ${wallet.account.address}`);
            }
        } catch (error) {
            console.error("حدث خطأ أثناء ربط المحفظة:", error);
            alert(`حدث خطأ أثناء ربط المحفظة: ${error.message}`);
        }
    };

    // وظيفة شحن الحساب
    const depositFunds = async () => {
        const amount = parseFloat(prompt("أدخل المبلغ الذي تريد شحنه:"));
        if (!amount || amount <= 0) {
            alert("يرجى إدخال مبلغ صحيح.");
            return;
        }
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: mainWalletAddress,
                    amount: (amount * 1_000_000_000).toString() // تحويل المبلغ إلى nanoTON
                }
            ]
        };
        try {
            await connector.sendTransaction(transaction);
            setUserBalance(userBalance + amount);
            alert(`تم شحن الحساب بمبلغ ${amount} TON.`);
        } catch (error) {
            alert(`حدث خطأ أثناء شحن الحساب: ${error.message}`);
        }
    };

    // وظيفة شراء الهدية
    const buyGift = (price) => {
        const fee = price * 0.01; // 1% رسوم
        const totalCost = price + fee;
        if (userBalance < totalCost) {
            alert("رصيدك غير كافٍ لشراء هذه الهدية.");
            return;
        }
        setUserBalance(userBalance - totalCost);
        alert(`تم شراء الهدية بمبلغ ${price} TON + رسوم ${fee.toFixed(2)} TON.`);
    };

    // وظيفة بيع الهدية
    const sellGift = () => {
        const sellPrice = 10; // سعر الهدية الثابت
        const fee = sellPrice * 0.01; // 1% رسوم
        const netAmount = sellPrice - fee;
        setUserBalance(userBalance + netAmount);
        alert(`تم بيع الهدية بمبلغ ${netAmount.toFixed(2)} TON بعد خصم الرسوم.`);
    };

    return (
        <div className="App container text-center mt-5">
            <h1 className="text-primary">مرحبًا بك في متجر الهدايا!</h1>
            {/* قسم قبل ربط المحفظة */}
            {!walletAddress && (
                <div>
                    <p className="text-muted">يرجى ربط محفظتك لبدء التداول.</p>
                    <button className="btn btn-success btn-lg mb-3" onClick={connectWallet}>
                        ربط المحفظة
                    </button>
                </div>
            )}
            {/* قسم بعد ربط المحفظة */}
            {walletAddress && (
                <div>
                    <p className="text-success">محفظتك متصلة: {walletAddress}</p>
                    {/* عرض الرصيد */}
                    <p className="text-success">رصيدك الحالي: {userBalance.toFixed(2)} TON</p>
                    {/* قسم شحن الحساب */}
                    <div className="mb-4">
                        <h3 className="text-info">شحن الحساب</h3>
                        <button className="btn btn-warning btn-block" onClick={depositFunds}>
                            شحن الحساب
                        </button>
                    </div>
                    {/* قسم الهدايا */}
                    <div>
                        <h3>الهدايا المتاحة:</h3>
                        <div className="d-flex justify-content-center">
                            {gifts.map((gift, index) => (
                                <div key={index} className="gift m-2 p-3 border rounded">
                                    <img src={gift.image} alt={gift.name} width="100" />
                                    <h5>{gift.name} - {gift.price} TON</h5>
                                    <button className="btn btn-primary" onClick={() => buyGift(gift.price)}>
                                        اشترِ الآن
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* قسم بيع الهدية */}
                    <div className="mt-4">
                        <h3 className="text-danger">بيع الهدية</h3>
                        <p>سعر الهدية: 10 TON</p>
                        <button className="btn btn-danger btn-block" onClick={sellGift}>
                            بيع الهدية
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
