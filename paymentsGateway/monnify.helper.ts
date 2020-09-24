import Axios from 'axios';
// import * as Helpers from "../../helpers";
import * as http from 'http';
// import * as dotenv from 'dotenv';

// dotenv.config();

class MonnifyHelper {

    baseUrl: string;
    username: string;
    password: string;
    contractCode: number;
    accountPrefix: string;
    currency: string;

    constructor() {
        this.baseUrl = 'https://sandbox.monnify.com/api/';
        this.username = 'MK_TEST_SSJHF4V9V9';
        this.password = '3GC7GC7MK3FTX8SZ9HSLUBFK3HM864B4';
        this.contractCode = 8872524455;
        this.accountPrefix = 'coinchain';
        this.currency = "NGN";
    }

    private authenticateMonnify = async () => {

        let response = await Axios.post(this.baseUrl + 'v1/auth/login', {}, {
                                auth: {
                                    username: this.username,
                                    password: this.password,
                                }                    
                            }).catch(err => err);

        if(response.status != 200 || !response.data.requestSuccessful) return false;

        return response.data.responseBody;
    }


    public verifyTransaction = async (transaction_ref:string)  => {

       return this.authenticateMonnify().catch(err => err).then(async res => {
            // return res;
            if(!res) return false;

            let response = await Axios.get(this.baseUrl + 'v2/transactions/' + transaction_ref, {
                                    headers: {
                                        'Authorization': 'Bearer' + res.accessToken,
                                    }                    
                                }).catch(err => err);


            if(response.status != 200 || !response.data.requestSuccessful) return false;

            return response.data.responseBody;
        })

    }


    public generateCustomerAccount = async (user: any)  => {

        return this.authenticateMonnify().catch(err => err).then(async res => {
             // return res;
             if(!res) return false;
 
             let payload = {
                    accountReference: this.accountPrefix + '_' + user.email,
                    accountName: user.first_name + ' ' + user.last_name,
                    customerName: user.first_name + ' ' + user.last_name,
                    customerEmail: user.email,
                    currencyCode: this.currency,
                    contractCode: this.contractCode,
             };

             let response = await Axios.post(this.baseUrl + 'v1/bank-transfer/reserved-accounts', payload, {
                                     headers: {
                                         'Authorization': 'Bearer' + res.accessToken,
                                     }                    
                                 }).catch(err => err);
 
             if(response.status != 200 || !response.data.requestSuccessful) return false;
 
             return response.data.responseBody;
         })
 
     }
 


}

export default MonnifyHelper;