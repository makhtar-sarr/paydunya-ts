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
exports.CheckoutInvoice = void 0;
const invoice_1 = require("./invoice");
const superagent_1 = __importDefault(require("superagent"));
class CheckoutInvoice extends invoice_1.Invoice {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const requestBody = this.generateRequestBody();
            try {
                const res = yield superagent_1.default
                    .post(`${this.baseURL}create`)
                    .set(this.config)
                    .send(requestBody);
                if (res.body.response_code === "00") {
                    this.token = res.body.token;
                    this.url = res.body.response_text;
                    //check invoice status
                    return yield this.confirm();
                }
                else {
                    const e = new Error("Failed to create invoice.");
                    throw e;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    confirm(givenToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const token = givenToken !== null && givenToken !== void 0 ? givenToken : self.token;
            try {
                const res = yield superagent_1.default
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
                }
                else {
                    throw new Error("Could not confirm invoice status.");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.CheckoutInvoice = CheckoutInvoice;
