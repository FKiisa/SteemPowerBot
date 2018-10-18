const dsteem = require('dsteem');
let opts = {};
//connect to production server
opts.addressPrefix = 'STM';
opts.chainId =
    '0000000000000000000000000000000000000000000000000000000000000000';
//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');


//submitAcc function from html input
const max = 1;
window.submitAcc = async () => {
    const accSearch = document.getElementById("username").value;
    const _accounts = await client.database.call('lookup_accounts',[accSearch, max]);
    const acc = await client.database.call('get_accounts',[_accounts]);  
    const steem_balance = acc[0].balance;
    const balance = `Available Steem balance for ${_accounts}: ${steem_balance}<br/>`;
    const steem_vests = parseFloat(acc[0].vesting_shares);
    const steemVests2 = Math.floor(steem_vests / 2019);
    const vests = `Vests for ${_accounts}: ${steem_vests}<br/>`;
	const steemPower = `SteemPower on ${_accounts} is: ${steemVests2}<br/>`;
	  
//disply list of account names with line breaks
document.getElementById('accList').innerHTML = _accounts;
document.getElementById('accBalance').innerHTML = balance;
document.getElementById('accVests').innerHTML = vests;
document.getElementById('accSteemPower').innerHTML = steemPower;
};
