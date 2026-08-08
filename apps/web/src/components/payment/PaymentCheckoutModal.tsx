'use client';

import React, { useState } from 'react';
import type { BusinessModuleCategory } from '@/components/inquiry/types';
import type { PaymentMethod, PaymentTransaction } from '@/types/payment';
import { processPaymentOrder } from '@/services/payment.api';

interface PaymentCheckoutModalProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  category: BusinessModuleCategory;
  serviceName: string;
  amount: number;
  quoteId?: string;
  bookingId?: string;
  inquiryId?: string;
  onClose: () => void;
  onPaymentSuccess?: (txn: PaymentTransaction) => void;
}

export function PaymentCheckoutModal({
  customerName,
  customerEmail,
  customerPhone,
  category,
  serviceName,
  amount,
  quoteId,
  bookingId,
  inquiryId,
  onClose,
  onPaymentSuccess,
}: PaymentCheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTxn, setCompletedTxn] = useState<PaymentTransaction | null>(null);

  // Form Fields
  const [upiId, setUpiId] = useState('customer@upi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8810');
  const [bankName, setBankName] = useState('State Bank of India');

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const txn = await processPaymentOrder({
        quoteId,
        bookingId,
        inquiryId,
        customerName,
        customerEmail,
        customerPhone,
        category,
        serviceName,
        amount,
        method,
      });
      setCompletedTxn(txn);
      if (onPaymentSuccess) onPaymentSuccess(txn);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-6">
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              SECURE VAIDIK SERVICE PAYMENT GATEWAY
            </span>
            <h2 className="font-serif text-2xl text-teal-900">
              {completedTxn ? `Receipt #${completedTxn.receiptNumber}` : 'Complete Sacred Service Payment'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200">
            ✕
          </button>
        </div>

        {!completedTxn ? (
          <form onSubmit={(e) => void handlePayNow(e)} className="space-y-5 text-xs">
            {/* Order Summary Box */}
            <div className="rounded-xl border border-teal-900/20 bg-amber-50/50 p-4 space-y-2">
              <div className="flex justify-between font-bold text-teal-900 text-sm">
                <span>{serviceName}</span>
                <span className="text-amber-700">₹{amount.toLocaleString()} INR</span>
              </div>
              <div className="text-stone-600">
                Customer: <strong>{customerName}</strong> ({customerPhone})
              </div>
              {bookingId && <div className="text-[10px] text-stone-500 font-mono">Linked Booking: {bookingId}</div>}
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block font-bold text-teal-900 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {(['UPI', 'CREDIT_CARD', 'NET_BANKING'] as PaymentMethod[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`rounded-xl border p-3 font-bold text-center transition-all ${
                      method === m ? 'border-teal-800 bg-teal-800 text-white shadow' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {m === 'UPI' ? '📱 UPI / QR' : m === 'CREDIT_CARD' ? '💳 Card' : '🏦 Net Banking'}
                  </button>
                ))}
              </div>
            </div>

            {/* Method Inputs */}
            {method === 'UPI' && (
              <div className="space-y-3 rounded-xl border p-4 bg-stone-50">
                <div className="text-center py-2">
                  <div className="mx-auto h-28 w-28 rounded-lg bg-stone-200 grid place-items-center font-bold text-stone-500 text-xs border border-dashed border-teal-800">
                    [ UPI QR CODE ]
                  </div>
                  <p className="mt-2 text-[10px] text-stone-500">Scan using BHIM, GPay, PhonePe, or Paytm</p>
                </div>
                <div>
                  <label className="block font-bold text-teal-900">Or Enter VPA / UPI ID</label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-xl border bg-white p-2 text-xs"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              </div>
            )}

            {method === 'CREDIT_CARD' && (
              <div className="space-y-3 rounded-xl border p-4 bg-stone-50">
                <div>
                  <label className="block font-bold text-teal-900">Card Number</label>
                  <input
                    type="text"
                    required
                    className="mt-1 w-full rounded-xl border bg-white p-2 text-xs font-mono"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-teal-900">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" defaultValue="12/28" className="mt-1 w-full rounded-xl border bg-white p-2 text-xs" />
                  </div>
                  <div>
                    <label className="block font-bold text-teal-900">CVV</label>
                    <input type="password" maxLength={4} defaultValue="•••" className="mt-1 w-full rounded-xl border bg-white p-2 text-xs" />
                  </div>
                </div>
              </div>
            )}

            {method === 'NET_BANKING' && (
              <div className="space-y-3 rounded-xl border p-4 bg-stone-50">
                <div>
                  <label className="block font-bold text-teal-900">Select Bank</label>
                  <select
                    className="mt-1 w-full rounded-xl border bg-white p-2 text-xs font-bold text-teal-900"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-xl bg-teal-800 py-3 font-bold text-white text-sm shadow hover:bg-teal-900 disabled:opacity-50"
              >
                {isProcessing ? 'Processing Secure Payment…' : `Pay ₹${amount.toLocaleString()} Securely →`}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-xs text-center py-4">
            <span className="text-5xl text-green-600">✓</span>
            <div>
              <h3 className="font-serif text-2xl text-teal-900">Payment Successful!</h3>
              <p className="mt-1 text-stone-600">
                Transaction Ref: <strong className="font-mono">{completedTxn.transactionRef}</strong>
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50/60 p-4 text-left space-y-2">
              <div className="flex justify-between font-bold text-green-900">
                <span>Receipt Number: {completedTxn.receiptNumber}</span>
                <span>Amount Paid: ₹{completedTxn.amount.toLocaleString()}</span>
              </div>
              <div className="text-stone-700">
                Customer: <strong>{completedTxn.customerName}</strong> ({completedTxn.customerEmail})
              </div>
              <div className="text-[10px] text-green-800 font-semibold">
                ✓ Automated Payment Receipt emailed & WhatsApp notification sent!
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-teal-800 px-6 py-2.5 font-bold text-white shadow hover:bg-teal-900"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
