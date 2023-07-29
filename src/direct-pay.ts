import * as request from "superagent";
import * as util from "util";
import { Setup } from ".";

/**
 * DirectPay class
 * @param {object} setup Instance of paydunya.Setup
 */
class DirectPay {
  private config: any;
  private baseURL: string;
  public responseText: string | undefined;
  public description: string | undefined;
  public transactionID: string | undefined;

  constructor(setup: Setup) {
    if (!(setup && setup.config))
      throw new Error("Must be initialized with instance of paydunya.Setup");

    this.config = setup.config;
    this.baseURL = setup.baseURL + "/direct-pay";
  }

  /**
   * Credit a PAYDUNYA account
   * @param  {string} account - Account alias, number or email
   * @param  {number} amount - The amount to credit
   * @return {Promise<void>}
   */
  public async creditAccount(account: string, amount: number) {
    const body = {
      account_alias: account,
      amount: Number(amount),
    };

    try {
      const res = await request
        .post(`${this.baseURL}/credit-account`)
        .set(this.config)
        .send(body);

      if (res.body.response_code === "00") {
        this.responseText = res.body.response_text;
        this.description = res.body.description;
        this.transactionID = res.body.transaction_id;
      } else {
        throw new Error(
          util.format(
            "Failed to credit account. Please ensure %s and %s are valid OR check your account balance.",
            account,
            amount
          )
        );
      }
    } catch (err) {
      throw err;
    }
  }
}

export = DirectPay;
