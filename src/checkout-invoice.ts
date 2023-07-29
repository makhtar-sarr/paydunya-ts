import { Invoice } from "./invoice";
import request from "superagent";

export class CheckoutInvoice extends Invoice {
  token?: string;
  url?: string;
  status: any;
  responseText?: string;
  customer?: string;
  receiptURL?: string;
  receipt_identifier: any;
  provider_reference: any;

  async create() {
    const requestBody = this.generateRequestBody();

    try {
      const res = await request
        .post(`${this.baseURL}create`)
        .set(this.config)
        .send(requestBody);

      if (res.body.response_code === "00") {
        this.token = res.body.token;
        this.url = res.body.response_text;

        //check invoice status
        return await this.confirm();
      } else {
        const e = new Error("Failed to create invoice.");
        throw e;
      }
    } catch (err) {
      throw err;
    }
  }

  async confirm(givenToken?: string) {
    const self = this;
    const token = givenToken ?? self.token;

    try {
      const res = await request
        .get(`${self.baseURL}/confirm/${token}`)
        .set(self.config);

      const body = res.body;
      if (body.response_code === "00") {
        self.status = body.status;
        self.responseText = body.response_text;

        if (self.status === "completed") {
          self.customer = body.customer;
          self.receiptURL = body.receipt_url;
          self.receipt_identifier = body.receipt_identifier;
          self.provider_reference = body.provider_reference;
          if (body.custom_data && Object.keys(body.custom_data).length > 0)
            self.customData = body.custom_data;
        }
        self.totalAmount = body.invoice.total_amount;
      } else {
        throw new Error("Could not confirm invoice status.");
      }
    } catch (err) {
      throw err;
    }
  }
}
