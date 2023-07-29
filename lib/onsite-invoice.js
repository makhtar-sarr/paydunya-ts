"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnsiteInvoice = void 0;
const invoice_1 = require("./invoice");
const superagent_1 = __importDefault(require("superagent"));
class OnsiteInvoice extends invoice_1.Invoice {
    constructor(setup, store) {
        super(setup, store); // call Invoice initializer
        this.baseURL = this.baseURL + "/opr";
    }
    /**
     * Create an invoice
     * @param {string} customer Account alias, number or username
     * @returns {Promise}
     */
    create(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            try {
                // setup request body
                const body = {
                    invoice_data: self.generateRequestBody(),
                    opr_data: {
                        account_alias: String(customer),
                    },
                };
                const response = yield superagent_1.default
                    .post(`${self.baseURL}/create`)
                    .set(self.config)
                    .send(body);
                if (response.body.response_code === "00") {
                    self.token = response.body.invoice_token;
                    self.oprToken = response.body.token;
                    self.responseText = response.body.description;
                }
                else {
                    const e = new Error("Failed to create invoice");
                    throw e;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Charge PAYDUNYA account
     * @param {string} oprToken OPR token generated on first step of onsite payment
     * @param {string} confirmToken Confirmation token sent to PAYDUNYA user
     * @returns {Promise<void>}
     */
    charge(oprToken, confirmToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                token: oprToken,
                confirm_token: confirmToken,
            };
            try {
                const res = yield superagent_1.default
                    .post(`${this.baseURL}/charge`)
                    .set(this.config)
                    .send(body);
                if (res.body.response_code === "00") {
                    this.responseText = res.body.response_text;
                    this.status = res.body.invoice_data.status;
                    this.receiptURL = res.body.invoice_data.receipt_url;
                    this.customer = res.body.invoice_data.customer;
                }
                else {
                    const e = new Error("Failed to charge invoice. Check OPR/confirm token and try again.");
                    throw e;
                }
            }
            catch (err) {
                throw new Error(`Failed to charge PAYDUNYA account: ${err}`);
            }
        });
    }
}
exports.OnsiteInvoice = OnsiteInvoice;
