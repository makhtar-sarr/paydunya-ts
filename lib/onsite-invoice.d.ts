import { Invoice } from "./invoice";
import { Setup, Store } from ".";
export declare class OnsiteInvoice extends Invoice {
    token?: string;
    oprToken?: string;
    responseText?: string;
    status: any;
    receiptURL?: string;
    customer?: string;
    constructor(setup: Setup, store: Store);
    /**
     * Create an invoice
     * @param {string} customer Account alias, number or username
     * @returns {Promise}
     */
    create(customer: string): Promise<void>;
    /**
     * Charge PAYDUNYA account
     * @param {string} oprToken OPR token generated on first step of onsite payment
     * @param {string} confirmToken Confirmation token sent to PAYDUNYA user
     * @returns {Promise<void>}
     */
    charge(oprToken: string, confirmToken: string): Promise<void>;
}
