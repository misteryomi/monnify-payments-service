import MonnifyHelper from './paymentsGateway/monnify.helper';

let monnify = new MonnifyHelper;
// let verify = monnify.verifyTransaction('MNFY|20200911142527|000428').then((res) => {
//     // MNFY%7C20200911142527%7C000428
//     console.log({res});    

// });
let user = {
    first_name: 'Yomi',
    last_name: 'Omotoso',
    email: 'yomiomotoso@gmail.com'
}
let userAccount = monnify.generateCustomerAccount(user).then((res) => {
    // MNFY%7C20200911142527%7C000428
    console.log({res});    

});

console.log({userAccount});