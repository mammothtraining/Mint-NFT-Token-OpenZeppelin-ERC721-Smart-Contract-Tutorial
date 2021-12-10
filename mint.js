const HDWalletProvider  = require('@truffle/hdwallet-provider');
const web3 = require('web3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let data_of_nft = fs.readFileSync(path.resolve(__dirname,
     "./build/contracts/MyNFT.json"));

let contract_abi = JSON.parse(data_of_nft);

const NFT_ABI = contract_abi.abi;
const MNEMONIC = process.env.MNEMONIC;
const API_KEY  = process.env.NODE_URL;
const NETWORK_LINK = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`;
const NFT_CONTRACT_ADDRESS = "0xE0D12E6872cE8ce075f436Ecdb19604f1e5B66BF"
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;

async function main() {

    try {
        const provider = new HDWalletProvider(
            MNEMONIC,
            NETWORK_LINK
        );

        const web3Instance = new web3(provider); 

        const nftContract = new web3Instance.eth.Contract(
            NFT_ABI,
            NFT_CONTRACT_ADDRESS
        );

        await nftContract.methods
        .mintItem(OWNER_ADDRESS, 
            `https://ipfs.io/ipfs/QmPmYto1RA127umy8bNrAv8XyirzGikqXT8xUx9GwbLNEk`)
            .send({from: OWNER_ADDRESS })
            .then(console.log("minted nft"))
            .catch(error => console.log(error));
    }
    catch (e) {
        console.log(e);
    }
}

main().then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});
