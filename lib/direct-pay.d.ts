import { Setup } from ".";
/**
 * DirectPay class
 * @param {object} setup Instance of paydunya.Setup
 */
declare class DirectPay {
    private config;
    private baseURL;
    responseText: string | undefined;
    description: string | undefined;
    transactionID: string | undefined;
    constructor(setup: Setup);
    /**
     * Credit a PAYDUNYA account
     * @param  {string} account - Account alias, number or email
     * @param  {number} amount - The amount to credit
     * @return {Promise<void>}
     */
    creditAccount(account: string, amount: number): Promise<void>;
}
export = DirectPay;
