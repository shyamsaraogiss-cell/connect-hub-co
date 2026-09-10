import { priestTerminology } from '@/lib/priest-terminology';
import { api } from '@/lib/api';
import type { QuoteInput, QuoteStatus, ServiceQuote } from '@/types/quote';
import { sendEmailNotification, sendWhatsAppNotification } from './communication.api';

const QUOTE_STORAGE_KEY = 'chc_service_quotes';

function getLocalQuotes(): ServiceQuote[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(QUOTE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalQuotes(quotes: ServiceQuote[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quotes));
}

export async function createServiceQuote(input: QuoteInput): Promise<ServiceQuote> {
  const now = new Date();
  const validUntil = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const items = input.items.map((item, idx) => ({
    id: `item_${idx + 1}`,
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    total: item.quantity * item.unitPrice,
  }));

  const subtotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const tax = Math.round(subtotal * 0.05); // 5% service tax / GST
  const totalAmount = subtotal + tax;

  const quoteId = `QT-${Date.now().toString().slice(-6)}`;
  const quoteNumber = `CHC-QT-2026-${Date.now().toString().slice(-4)}`;

  const newQuote: ServiceQuote = {
    id: quoteId,
    quoteNumber,
    leadId: input.leadId,
    bookingId: input.bookingId,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone,
    customerCountry: input.customerCountry || 'India',
    category: input.category,
    serviceName: input.serviceName,
    preferredDate: input.preferredDate,
    items,
    subtotal,
    tax,
    totalAmount,
    status: 'DRAFT', // Mandatory Admin Approval Required
    inclusions: input.inclusions || ['Vedic Ritual Conduct', 'Samagri Arrangements', 'Panda Coordination'],
    exclusions: input.exclusions || ['Personal Airfare / Train Travel', 'Hotel Accommodation unless specified', 'Individual Gratuity'],
    termsAndConditions: input.termsAndConditions || 'Quotes are valid for 14 days. Advance coordinator approval required before ceremony confirmation.',
    notes: input.notes,
    version: 1,
    versionHistory: [
      {
        version: 1,
        createdAt: now.toISOString(),
        createdBy: 'Senior Coordinator',
        totalAmount,
        notes: 'Initial Draft Created',
      },
    ],
    issuedAt: now.toISOString(),
    validUntil,
  };

  try {
    const res = await api<ServiceQuote>('/quotes', {
      method: 'POST',
      body: JSON.stringify(newQuote),
    });
    setLocalQuotes([res, ...getLocalQuotes()]);
    return res;
  } catch {
    setLocalQuotes([newQuote, ...getLocalQuotes()]);
    return newQuote;
  }
}

export async function approveQuoteByAdmin(quoteId: string, adminName: string = 'Senior Administrator'): Promise<ServiceQuote> {
  const local = getLocalQuotes();
  const index = local.findIndex((q) => q.id === quoteId);

  if (index >= 0) {
    const updated: ServiceQuote = {
      ...local[index],
      status: 'APPROVED',
      approvedByAdmin: adminName,
      approvedAt: new Date().toISOString(),
    };
    local[index] = updated;
    setLocalQuotes(local);
    return updated;
  }
  throw new Error(`Quote ${quoteId} not found.`);
}

export async function updateQuoteStatus(quoteId: string, status: QuoteStatus): Promise<ServiceQuote> {
  const local = getLocalQuotes();
  const index = local.findIndex((q) => q.id === quoteId);

  if (index >= 0) {
    const updated: ServiceQuote = {
      ...local[index],
      status,
    };
    local[index] = updated;
    setLocalQuotes(local);
    return updated;
  }
  throw new Error(`Quote ${quoteId} not found.`);
}

export async function dispatchQuoteViaEmail(quote: ServiceQuote): Promise<boolean> {
  if (quote.status === 'DRAFT') {
    throw new Error('Administrator approval is required before dispatching quotes.');
  }

  const htmlBody = `
    <div style="font-family: serif; max-width: 650px; margin: 0 auto; border: 1px solid #087F8C; padding: 24px; border-radius: 16px; background-color: #ffffff;">
      <h2 style="color: #087F8C; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">Connect Hub Co. - Official Vaidik Service Proposal</h2>
      <p>Dear <strong>${quote.customerName}</strong>,</p>
      <p>Pranam. Please find enclosed your approved service proposal for <strong>${priestTerminology(quote.serviceName)}</strong> (Category: ${quote.category.toUpperCase()}).</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
        <thead>
          <tr style="background: #087F8C; color: white;">
            <th style="padding: 8px; text-align: left;">Item / Description</th>
            <th style="padding: 8px; text-align: center;">Qty</th>
            <th style="padding: 8px; text-align: right;">Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          ${quote.items
            .map(
              (i) => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 8px;">${priestTerminology(i.description)}</td>
              <td style="padding: 8px; text-align: center;">${i.quantity}</td>
              <td style="padding: 8px; text-align: right;">₹${i.total.toLocaleString()}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      
      <div style="margin: 16px 0; background: #fffbeb; padding: 12px; border-radius: 8px; border: 1px solid #fef3c7; font-size: 12px;">
        <strong>Inclusions:</strong> ${priestTerminology(quote.inclusions.join(', '))}<br/>
        <strong>Exclusions:</strong> ${priestTerminology(quote.exclusions.join(', '))}
      </div>

      <div style="text-align: right; font-weight: bold; font-size: 18px; color: #087F8C;">
        Total Investment: ₹${quote.totalAmount.toLocaleString()} (Incl. taxes)
      </div>

      <p style="font-size: 11px; color: #666; margin-top: 20px;">
        Approved by Admin (${quote.approvedByAdmin || 'Administrator'}) on ${new Date(quote.approvedAt || quote.issuedAt).toLocaleDateString()}. Valid until ${quote.validUntil}.
      </p>
    </div>
  `;

  await sendEmailNotification({
    toEmail: quote.customerEmail,
    recipientName: quote.customerName,
    subject: `Approved Service Proposal #${quote.quoteNumber} - Connect Hub Co.`,
    type: 'QUOTE_DELIVERY',
    htmlBody,
    referenceId: quote.id,
  });

  await updateQuoteStatus(quote.id, 'SENT');
  return true;
}

export async function dispatchQuoteViaWhatsApp(quote: ServiceQuote): Promise<string> {
  if (quote.status === 'DRAFT') {
    throw new Error('Administrator approval is required before dispatching quotes.');
  }

  const messageText = `*Connect Hub Co. - Approved Service Proposal #${quote.quoteNumber}*

Pranam ${quote.customerName} Ji,

Here is your approved Vaidik service proposal for *${priestTerminology(quote.serviceName)}*:

${quote.items.map((i) => `• ${priestTerminology(i.description)} (x${i.quantity}): ₹${i.total.toLocaleString()}`).join('\n')}

*Total Investment:* ₹${quote.totalAmount.toLocaleString()} (Incl. taxes)
*Approved By:* ${quote.approvedByAdmin || 'Administrator'}
*Valid Until:* ${quote.validUntil}

*Inclusions:* ${priestTerminology(quote.inclusions.join(', '))}
*Exclusions:* ${priestTerminology(quote.exclusions.join(', '))}

Reply to this message to accept or confirm ceremony dates.

_Connect Hub Co. Pilgrimage Coordination Desk_`;

  const result = await sendWhatsAppNotification({
    phone: quote.customerPhone,
    recipientName: quote.customerName,
    type: 'QUOTE_DELIVERY',
    messageText,
    referenceId: quote.id,
  });

  await updateQuoteStatus(quote.id, 'SENT');
  return result.whatsappWebUrl;
}

export function generateQuotePDFHTML(quote: ServiceQuote): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Service Quote - ${quote.quoteNumber}</title>
        <style>
          body { font-family: 'Times New Roman', serif; padding: 40px; color: #1c1917; }
          .header { text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; }
          .title { font-size: 26px; color: #087F8C; font-weight: bold; margin-bottom: 4px; }
          .subtitle { font-size: 12px; color: #78716c; text-transform: uppercase; letter-spacing: 2px; }
          .status-badge { display: inline-block; background: #087F8C; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-top: 8px; }
          .details { display: flex; justify-content: space-between; margin: 30px 0; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
          th { background-color: #087F8C; color: white; padding: 10px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e7e5e4; }
          .totals { margin-top: 30px; text-align: right; font-size: 14px; }
          .total-price { font-size: 20px; font-weight: bold; color: #087F8C; margin-top: 8px; }
          .scope-box { margin-top: 24px; padding: 16px; background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; font-size: 13px; }
          .footer { margin-top: 60px; font-size: 12px; color: #78716c; text-align: center; border-top: 1px solid #e7e5e4; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">CONNECT HUB CO.</div>
          <div class="subtitle">Religious Service & Sacred Travel Assistance</div>
          <div class="status-badge">STATUS: ${quote.status} (VERSION v${quote.version})</div>
        </div>
        <div class="details">
          <div>
            <strong>CUSTOMER DETAILS:</strong><br/>
            ${quote.customerName}<br/>
            ${quote.customerPhone}<br/>
            ${quote.customerEmail}<br/>
            Country: ${quote.customerCountry}
          </div>
          <div style="text-align: right;">
            <strong>QUOTE REFERENCE:</strong> ${quote.quoteNumber}<br/>
            <strong>APPROVED BY:</strong> ${quote.approvedByAdmin || 'Pending Approval'}<br/>
            <strong>DATE ISSUED:</strong> ${new Date(quote.issuedAt).toLocaleDateString()}<br/>
            <strong>VALID UNTIL:</strong> ${quote.validUntil}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price (INR)</th>
              <th style="text-align: right;">Total (INR)</th>
            </tr>
          </thead>
          <tbody>
            ${quote.items
              .map(
                (i) => `
              <tr>
                <td>${priestTerminology(i.description)}</td>
                <td style="text-align: center;">${i.quantity}</td>
                <td style="text-align: right;">₹${i.unitPrice.toLocaleString()}</td>
                <td style="text-align: right;">₹${i.total.toLocaleString()}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
        <div class="totals">
          <div>Subtotal: ₹${quote.subtotal.toLocaleString()}</div>
          <div>Taxes & GST (5%): ₹${quote.tax.toLocaleString()}</div>
          <div class="total-price">Total Amount: ₹${quote.totalAmount.toLocaleString()}</div>
        </div>
        <div class="scope-box">
          <strong>INCLUSIONS:</strong> ${priestTerminology(quote.inclusions.join(', '))}<br/><br/>
          <strong>EXCLUSIONS:</strong> ${priestTerminology(quote.exclusions.join(', '))}<br/><br/>
          <strong>TERMS & CONDITIONS:</strong> ${priestTerminology(quote.termsAndConditions)}
        </div>
        <div class="footer">
          Official Vaidik Service Proposal issued by Connect Hub Co. Operations Desk.<br/>
          Gaya Ji · Kashi · Patna · New Delhi
        </div>
      </body>
    </html>
  `;
}
