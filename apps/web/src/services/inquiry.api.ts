import { api } from '@/lib/api';
import type {
  BaseInquiryInput,
  BusinessModuleCategory,
  PitruMokshaGayaInquiryInput,
  RitualServicesInquiryInput,
  TravelAssistanceInquiryInput,
  VahiRecordsInquiryInput,
  ReligiousPartnersInquiryInput,
} from '@/components/inquiry/types';
import { createUniversalRequest } from './urms.api';
import type { URMSRequestType } from '@/types/urms';

export type SubmitInquiryResult = {
  success: boolean;
  inquiryId?: string;
  message?: string;
};

const submittedInquiries = new Set<string>();

function getInquiryHash(category: BusinessModuleCategory, phone: string, name: string): string {
  return `${category}:${name.trim().toLowerCase()}:${phone.trim()}`;
}

function mapCategoryToURMSType(category: BusinessModuleCategory): URMSRequestType {
  switch (category) {
    case 'religious-partners':
      return 'PARTNER_REGISTRATION';
    case 'pitru-moksha-gaya':
    case 'travel-assistance':
    case 'vahi-records':
      return 'SERVICE_REQUEST';
    case 'ritual-services':
      return 'BOOKING';
    default:
      return 'INQUIRY';
  }
}

export async function submitUnifiedInquiry(
  category: 'pitru-moksha-gaya',
  data: PitruMokshaGayaInquiryInput
): Promise<SubmitInquiryResult>;
export async function submitUnifiedInquiry(
  category: 'ritual-services',
  data: RitualServicesInquiryInput
): Promise<SubmitInquiryResult>;
export async function submitUnifiedInquiry(
  category: 'travel-assistance',
  data: TravelAssistanceInquiryInput
): Promise<SubmitInquiryResult>;
export async function submitUnifiedInquiry(
  category: 'vahi-records',
  data: VahiRecordsInquiryInput
): Promise<SubmitInquiryResult>;
export async function submitUnifiedInquiry(
  category: 'religious-partners',
  data: ReligiousPartnersInquiryInput
): Promise<SubmitInquiryResult>;
export async function submitUnifiedInquiry(
  category: BusinessModuleCategory,
  data: BaseInquiryInput
): Promise<SubmitInquiryResult>;
export async function submitUnifiedInquiry(
  category: BusinessModuleCategory,
  data: BaseInquiryInput
): Promise<SubmitInquiryResult> {
  const hash = getInquiryHash(category, data.phone || '', data.fullName || '');
  if (submittedInquiries.has(hash)) {
    return {
      success: false,
      message: 'A similar inquiry has already been submitted recently. Our team will contact you shortly.',
    };
  }

  const urmsType = mapCategoryToURMSType(category);

  try {
    const urmsRecord = await createUniversalRequest({
      requestType: urmsType,
      relatedService: category,
      guestName: data.fullName || 'Anonymous Guest',
      guestPhone: data.phone || '',
      guestEmail: data.email || '',
      title: `${category.replaceAll('-', ' ').toUpperCase()} Submission`,
      description: data.notes || `Submitted via ${category} form.`,
      sourceChannel: 'WEBSITE_FORM',
      metadata: { ...data },
    });

    submittedInquiries.add(hash);
    return { success: true, inquiryId: urmsRecord.referenceId };
  } catch {
    let endpoint = '/public/inquiries';
    if (category === 'pitru-moksha-gaya') {
      endpoint = '/public/pitru-moksha/requests';
    } else if (category === 'travel-assistance') {
      endpoint = '/public/travel-assistance/requests';
    }

    const res = await api<{ requestId?: string; inquiryId?: string }>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ category, ...data }),
    });
    const inquiryId = res.requestId || res.inquiryId;
    if (!inquiryId) throw new Error('The server did not issue a request reference.');
    submittedInquiries.add(hash);
    return { success: true, inquiryId };
  }
}
