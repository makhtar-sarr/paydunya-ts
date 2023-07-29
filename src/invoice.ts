import { Setup, Store } from ".";

export class Invoice {
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
  customData: { [key: string]: string };
  taxes: { [key: string]: { name: string; amount: number } };
  channels: string[];
  totalAmount: number;

  constructor(setup: Setup, store: Store) {
    if (
      !(
        setup &&
        store &&
        setup.config["PAYDUNYA-MASTER-KEY"] &&
        setup.config["PAYDUNYA-PRIVATE-KEY"] &&
        setup.config["PAYDUNYA-TOKEN"] &&
        store.name
      )
    ) {
      throw new Error("Invalid parameters;");
    }

    this.baseURL = setup.baseURL;
    this.config = setup.config;

    if (store.return_url) this.returnURL = store.return_url;
    if (store.cancel_url) this.cancelURL = store.cancel_url;
    if (store.callback_url) this.callbackURL = store.callback_url;

    this.store = store;
    this.description = "";
    this.items = {};
    this.customData = {};
    this.taxes = {};
    this.channels = [];
    this.totalAmount = 0;
  }

  addItem(
    name: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number,
    description?: string
  ) {
    if (!name) throw new Error("Invalid parameters; name is required.");
    const position = Object.keys(this.items).length + 1;
    this.items["item_" + position] = {
      name: name,
      quantity: quantity || 0,
      unit_price: unitPrice || 0,
      total_price: totalPrice || 0,
    };
    if (description) this.items["item_" + position].description = description;
  }

  addTax(name: string, amount: number) {
    if (
      !(name && typeof name === "string" && typeof Number(amount) === "number")
    )
      throw new Error("Invalid parameters.");
    const position = Object.keys(this.taxes).length + 1;
    this.taxes["tax_" + position] = {
      name: name,
      amount: Number(amount),
    };
  }

  addChannel(channel: string) {
    if (!(channel && typeof channel === "string"))
      throw new Error("Invalid parameters.");
    this.channels.push(channel);
  }

  addChannels(channels: string[]) {
    if (!(channels && channels instanceof Array))
      throw new Error("Invalid parameters.");
    this.channels = [];
    for (let i = 0; i < channels.length; i++) {
      this.channels.push(channels[i]);
    }
  }

  addCustomData(title: string, value: string) {
    if (!(title && value)) throw new Error("Invalid parameters.");

    this.customData[title] = value;
  }

  generateRequestBody() {
    if (
      !(this.store && this.store.name && this.baseURL && this.totalAmount > 0)
    ) {
      throw new Error(
        "Invalid parameters. Initialize Invoice with valid instances of Setup and Store. Total amount must also be set.\neg: var invoice = new Invoice; invoice.init(setup, store); invoice.setTotalAmount(40)"
      );
    }

    const body: {
      invoice: {
        total_amount: number;
        description?: string;
        channels?: string[];
        items?: {
          [key: string]: {
            name: string;
            quantity: number;
            unit_price: number;
            total_price: number;
            description?: string;
          };
        };
        taxes?: {
          [key: string]: {
            name: string;
            amount: number;
          };
        };
      };
      store: Store;
      actions?: {
        return_url?: string;
        cancel_url?: string;
        callback_url?: string;
      };
      custom_data?: { [key: string]: string };
    } = {
      invoice: {
        total_amount: this.totalAmount,
      },
      store: this.store,
    };
    if (this.description) body.invoice.description = this.description;
    if (Object.keys(this.channels).length > 0)
      body.invoice.channels = this.channels;
    if (Object.keys(this.items).length > 0) body.invoice.items = this.items;
    if (this.returnURL || this.cancelURL || this.callbackURL) {
      body.actions = {};
      if (this.returnURL) body.actions.return_url = this.returnURL;
      if (this.cancelURL) body.actions.cancel_url = this.cancelURL;
      if (this.callbackURL) body.actions.callback_url = this.callbackURL;
    }
    if (Object.keys(this.taxes).length > 0) body.invoice.taxes = this.taxes;
    if (Object.keys(this.customData).length > 0)
      body.custom_data = this.customData;

    return body;
  }
}
export default Invoice;
