import { render, screen } from '@testing-library/react';
import App from './App';

// اختبار للعنوان الرئيسي
test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/My App with React UI/i);
  expect(headerElement).toBeInTheDocument();
});

// اختبار لزر TonConnectButton
test('renders TonConnectButton', () => {
  render(<App />);
  const tonConnectButton = screen.getByRole('button', { name: /connect wallet/i });
  expect(tonConnectButton).toBeInTheDocument();
});

// اختبار لحالة الاتصال بالمحفظة (اختياري)
test('displays wallet information when connected', async () => {
  render(<App />);
  
  // محاكاة ربط المحفظة
  const mockWallet = {
    name: 'Test Wallet',
    device: { appName: 'Test Device' }
  };
  jest.spyOn(require('@tonconnect/ui-react'), 'useTonWallet').mockReturnValue(mockWallet);

  // التحقق من عرض اسم المحفظة
  const walletName = await screen.findByText(/Connected wallet: Test Wallet/i);
  expect(walletName).toBeInTheDocument();

  // التحقق من عرض نوع الجهاز
  const deviceName = await screen.findByText(/Device: Test Device/i);
  expect(deviceName).toBeInTheDocument();
});
