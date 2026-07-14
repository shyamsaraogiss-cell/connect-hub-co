import { api } from "@/lib/api";
import { TravelAssistanceInput,TravelAssistanceRequest,TravelStatus } from "@/types/travel-assistance";
export const submitTravelAssistance=(input:TravelAssistanceInput)=>api<{requestId:string}>("/public/travel-assistance/requests",{method:"POST",body:JSON.stringify(input)});
export const getTravelAssistanceRequests=()=>api<TravelAssistanceRequest[]>("/travel-assistance/requests");
export const processTravelAssistance=(id:string,input:{status?:TravelStatus;adminNotes?:string|null;providerDetails?:string|null})=>api<TravelAssistanceRequest>(`/travel-assistance/requests/${id}/process`,{method:"PATCH",body:JSON.stringify(input)});
