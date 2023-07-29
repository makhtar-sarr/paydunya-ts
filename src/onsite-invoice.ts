import { Invoice } from "./invoice";
import request from "superagent";
import { Setup, Store } from ".";

export class OnsiteInvoice extends Invoice {
  token?: string;
  oprToken?: string;
  responseText?: string;
  status: any;
  receiptURL?: string;
  customer?: string;
  constructor(setup: Setup, store: Store) {
    super(setup, store); // call Invoice initializer
    this.baseURL = this.baseURL + "/opr";
  }

  /**
   * Create an invoice
   * @param {string} customer Account alias, number or username
   * @returns {Promise}
   */
  async create(customer: string) {
    const self = this;

    try {
      // setup request body
      const body = {
        invoice_data: self.generateRequestBody(),
        opr_data: {
          account_alias: String(customer),
        },
      };

      const response = await request
        .post(`${self.baseURL}/create`)
        .set(self.config)
        .send(body);

      if (response.body.response_code === "00") {
        self.token = response.body.invoice_token;
        self.oprToken = response.body.token;
        self.responseText = response.body.description;
      } else {
        const e = new Error("Failed to create invoice");
        throw e;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Charge PAYDUNYA account
   * @param {string} oprToken OPR token generated on first step of onsite payment
   * @param {string} confirmToken Confirmation token sent to PAYDUNYA user
   * @returns {Promise<void>}
   */
  async charge(oprToken: string, confirmToken: string) {
    const body = {
      token: oprToken,
      confirm_token: confirmToken,
    };

    try {
      const res = await request
        .post(`${this.baseURL}/charge`)
        .set(this.config)
        .send(body);

      if (res.body.response_code === "00") {
        this.responseText = res.body.response_text;
        this.status = res.body.invoice_data.status;
        this.receiptURL = res.body.invoice_data.receipt_url;
        this.customer = res.body.invoice_data.customer;
      } else {
        const e = new Error(
          "Failed to charge invoice. Check OPR/confirm token and try again."
        );
        throw e;
      }
    } catch (err) {
      throw new Error(`Failed to charge PAYDUNYA account: ${err}`);
    }
  }
}
