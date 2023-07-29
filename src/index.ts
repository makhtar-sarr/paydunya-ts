export class Setup {
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
  }) {
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
    else this.baseURL = 'https://app.paydunya.com/api/v1';
  }
}

export class Store {
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
  }) {
    if (!data || !data.name) throw new Error('Invalid parameters.');
    this.name = data.name;
    if (data.tagline) this.tagline = data.tagline;
    if (data.phoneNumber) this.phone_number = data.phoneNumber;
    if (data.postalAddress) this.postal_address = data.postalAddress;
    if (data.logoURL) this.logo_url = data.logoURL;
    if (data.websiteURL) this.website_url = data.websiteURL;
    if (data.cancelURL) this.cancel_url = data.cancelURL;
    if (data.returnURL) this.return_url = data.returnURL;
    if (data.callbackURL) this.callback_url = data.callbackURL;
  }
}

export const checkoutInvoice = require('./checkout-invoice');
export const onsiteInvoice = require('./onsite-invoice');
export const directPay = require('./direct-pay');
