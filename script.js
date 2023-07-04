import {contractAbi} from contractAbi.js;

const {Web3} = require("web3");
const web3 = new Web3(newWeb3.providers.HttpProvider('http://localhost:8545'));

const contractAddress = 0x762C3042D7199ADf699f22Cb27dDC75d652f7156;

const contract = new web3.eth.Contract(contractABI, contractAddress);

var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

function createCollection() {
    var name = document.getElementById("name");
    var symbol = document.getElementById("symbol");
    var baseUri = document.getElementById("baseUri");
    const nftCollection = contract.deploy(name, symbol, baseUri).send({from: account});

    const address = nftCollection.getAddress();
    displayDataForCreated(address);
}

function mint() {
    var collectionAddress = document.getElementById("collectionAddress");
    const thisContract = new web3.eth.Contract(contractABI, collectionAddress);
    const tokenMinted = thisContract.methods.mint(account).call({from: account}, function(error, result){
        displayIdDataForMinted(result[0]);
        displayUriDataForMinted(result[1]);
    });

}

function displayDataForCreated(string) {
    var data = document.getElementById("textField");
    data.style.display = string;
}

function displayIdDataForMinted(string) {
    var data = document.getElementById("textIdField");
    data.style.display = string;
}

function displayUriDataForMinted(string) {
    var data = document.getElementById("textUriField");
    data.style.display = string;
}