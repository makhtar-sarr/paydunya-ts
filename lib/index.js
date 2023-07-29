"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directPay = exports.onsiteInvoice = exports.checkoutInvoice = exports.Store = exports.Setup = void 0;
class Setup {
    constructor(data) {
        this.config = {};
        this.config['PAYDUNYA-MASTER-KEY'] =
            (data && data.masterKey) || process.env.PAYDUNYA_MASTER_KEY;
        this.config['PAYDUNYA-PRIVATE-KEY'] =
            (data && data.privateKey) || process.env.PAYDUNYA_PRIVATE_KEY;
        this.config['PAYDUNYA-PUBLIC-KEY'] =
            (data && data.publicKey) || process.env.PAYDUNYA_PUBLIC_KEY;
        this.config['PAYDUNYA-TOKEN'] =
            (data && data.token) || process.env.PAYDUNYA_TOKEN;
        this.config['Content-Type'] = 'application/json';
        if (data && data.mode && data.mode.toLowerCase() === 'test')
            this.baseURL = 'https://app.paydunya.com/sandbox-api/v1';
        else
            this.baseURL = 'https://app.paydunya.com/api/v1';
    }
}
exports.Setup = Setup;
class Store {
    constructor(data) {
        if (!data || !data.name)
            throw new Error('Invalid parameters.');
        this.name = data.name;
        if (data.tagline)
            this.tagline = data.tagline;
        if (data.phoneNumber)
            this.phone_number = data.phoneNumber;
        if (data.postalAddress)
            this.postal_address = data.postalAddress;
        if (data.logoURL)
            this.logo_url = data.logoURL;
        if (data.websiteURL)
            this.website_url = data.websiteURL;
        if (data.cancelURL)
            this.cancel_url = data.cancelURL;
        if (data.returnURL)
            this.return_url = data.returnURL;
        if (data.callbackURL)
            this.callback_url = data.callbackURL;
    }
}
exports.Store = Store;
exports.checkoutInvoice = require('./checkout-invoice');
exports.onsiteInvoice = require('./onsite-invoice');
exports.directPay = require('./direct-pay');
