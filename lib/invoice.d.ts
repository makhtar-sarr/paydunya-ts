import { Setup, Store } from ".";
export declare class Invoice {
    baseURL: string;
    config: {
        "PAYDUNYA-MASTER-KEY"?: string;
        "PAYDUNYA-PRIVATE-KEY"?: string;
        "PAYDUNYA-TOKEN"?: string;
        "Content-Type"?: string;
    };
    returnURL?: string;
    cancelURL?: string;
    callbackURL?: string;
    store: Store;
    description: string;
    items: {
        [key: string]: {
            name: string;
            quantity: number;
            unit_price: number;
            total_price: number;
            description?: string;
        };
    };
    customData: {
        [key: string]: string;
    };
    taxes: {
        [key: string]: {
            name: string;
            amount: number;
        };
    };
    channels: string[];
    totalAmount: number;
    constructor(setup: Setup, store: Store);
    addItem(name: string, quantity: number, unitPrice: number, totalPrice: number, description?: string): void;
    addTax(name: string, amount: number): void;
    addChannel(channel: string): void;
    addChannels(channels: string[]): void;
    addCustomData(title: string, value: string): void;
    generateRequestBody(): {
        invoice: {
            total_amount: number;
            description?: string | undefined;
            channels?: string[] | undefined;
            items?: {
                [key: string]: {
                    name: string;
                    quantity: number;
                    unit_price: number;
                    total_price: number;
                    description?: string | undefined;
                };
            } | undefined;
            taxes?: {
                [key: string]: {
                    name: string;
                    amount: number;
                };
            } | undefined;
        };
        store: Store;
        actions?: {
            return_url?: string | undefined;
            cancel_url?: string | undefined;
            callback_url?: string | undefined;
        } | undefined;
        custom_data?: {
            [key: string]: string;
        } | undefined;
    };
}
export default Invoice;
