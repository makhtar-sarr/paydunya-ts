export declare class Setup {
    config: {
        'PAYDUNYA-MASTER-KEY'?: string;
        'PAYDUNYA-PRIVATE-KEY'?: string;
        'PAYDUNYA-PUBLIC-KEY'?: string;
        'PAYDUNYA-TOKEN'?: string;
        'Content-Type'?: string;
    };
    baseURL: string;
    constructor(data?: {
        masterKey?: string;
        privateKey?: string;
        publicKey?: string;
        token?: string;
        mode?: string;
    });
}
export declare class Store {
    name: string;
    tagline?: string;
    phone_number?: string;
    postal_address?: string;
    logo_url?: string;
    website_url?: string;
    cancel_url?: string;
    return_url?: string;
    callback_url?: string;
    constructor(data: {
        name: string;
        tagline?: string;
        phoneNumber?: string;
        postalAddress?: string;
        logoURL?: string;
        websiteURL?: string;
        cancelURL?: string;
        returnURL?: string;
        callbackURL?: string;
    });
}
export declare const checkoutInvoice: any;
export declare const onsiteInvoice: any;
export declare const directPay: any;
