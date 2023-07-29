import { Invoice } from "./invoice";
export declare class CheckoutInvoice extends Invoice {
    token?: string;
    url?: string;
    status: any;
    responseText?: string;
    customer?: string;
    receiptURL?: string;
    receipt_identifier: any;
    provider_reference: any;
    create(): Promise<void>;
    confirm(givenToken?: string): Promise<void>;
}
