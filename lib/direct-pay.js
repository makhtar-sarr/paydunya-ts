"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request = __importStar(require("superagent"));
const util = __importStar(require("util"));
/**
 * DirectPay class
 * @param {object} setup Instance of paydunya.Setup
 */
class DirectPay {
    constructor(setup) {
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
    creditAccount(account, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                account_alias: account,
                amount: Number(amount),
            };
            try {
                const res = yield request
                    .post(`${this.baseURL}/credit-account`)
                    .set(this.config)
                    .send(body);
                if (res.body.response_code === "00") {
                    this.responseText = res.body.response_text;
                    this.description = res.body.description;
                    this.transactionID = res.body.transaction_id;
                }
                else {
                    throw new Error(util.format("Failed to credit account. Please ensure %s and %s are valid OR check your account balance.", account, amount));
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
module.exports = DirectPay;
