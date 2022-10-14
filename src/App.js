import './App.css';
import React, {useState , useEffect, Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import axios from 'axios';


const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_mintAmount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newmaxMintAmount",
				"type": "uint256"
			}
		],
		"name": "setmaxMintAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMintAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var  account = null;
var contract = null;

//const API = "2GIRS3RCXDEJ7DMJ9MQKSACD1E57WJ7SJA";
//const ADDRESS = "0xd49d7909f16f8c92cfd4115a41812728d187cf04";


const data = [
    {
		id: "1",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/1.png",
		title: "Nelson Mandela #1",
		buttontext: "Buy Now"
	},
	{
		id: "2",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/2.png",
		title: "kwame Nkrumah #2",
		buttontext: "Buy Now"
	},
	{
		id: "3",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/3.png",
		title: "Patrice Lumunba #3",
		buttontext: "Buy Now"
	},
	{
		id: "4",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/4.png",
		title: "USA Martin Luther King #4",
		
		buttontext: "Buy Now"
	},
	{
		id: "5",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/5.png",
		title: "Ruben Um Nyobe #5",
		buttontext: "Buy Now"
	},
	{
		id: "6",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/6.png",
		title: "Cheikh Anta Diop #6",
		buttontext: "Buy Now"
	},
	{
		id: "7",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/7.png",
		title: "Douala Manga Bell #7",
		buttontext: "Buy Now"
	},
	{
		id: "8",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/8.png",
		title: "USA Malcom X #8",
		buttontext: "Buy Now"
	},
	{
		id: "9",
		img: "https://ipfs.io/ipfs/QmRF7CKUSjDXdczw1DeEuL7meLdC76GW8scQMuvWQMnpRK/9.png",
		title: "Ernest Wandjie X #9",
		buttontext: "Buy Now"
	},


]


const apikey = "2GIRS3RCXDEJ7DMJ9MQKSACD1E57WJ7SJA";
const ADDRESS = "0x6de897003291fefd4dd0a78c0d9b8304724dace6";
const endpoint = "https://api-rinkeby.etherscan.io/api"

async function connectwallet() { 
      if (window.ethereum) { 
      let web3 = new Web3(window.ethereum); 
      await window.ethereum.request({method : 'eth_requestAccounts'}); 
      let accounts = await web3.eth.getAccounts(); 
	  console.log(typeof window.ethereum);
      account = accounts[0]; 
	  
      document.getElementById('wallet-address').textContent = account; 
      contract = new web3.eth.Contract(ABI, ADDRESS);
	  
      }
}
async function mint() {
      if (window.ethereum) { 
        let _mintAmount = Number(document.querySelector("[name=amount]").value); 
        let mintRate = Number(await contract.methods.cost().call()); 
        let totalAmount = mintRate * _mintAmount; 
      contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
      }
    } 

class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			data: [],
		};
	}

	async componentDidMount() {
		const etherscan = await axios.get(endpoint + `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`);

		let { result } = etherscan.data;
		this.setState({
		 balance: result,
		 data: data
		});
  }
  render() {
	const {balance} = this.state;

  return (
    <div className="App">
 <div className='container'>
<div className='row'>
  <form class="gradient col-lg-5 mt-5" style={{borderRadius:"30px",boxShadow:"1px 1px 25px #000000"}}>
    <h4 style={{color:"#FFFFFF"}}>Black Heros NFT Collection</h4>
    <h5 style={{color:"#FFFFFF"}}>connect your wallet</h5>
    <Button onClick={connectwallet} style={{marginBottom:"5px",color:"#FFFFFF"}}>Connect Wallet</Button>
    <div class="card" id='wallet-address' style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <label for="floatingInput">Wallet Address</label>
      </div>
      <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 30px #000000"}}>
      <input type="number" name="amount" defaultValue="1" min="1" max="5"/>
      <label >Please select the amount of NFTs to mint.</label>
      <Button onClick={mint}>Mint Now!</Button>
      </div>
    <label style={{color:"#FFFFFF"}}>Price 0.05 ETH each mint.</label>
	<h5 style={{color:"white"}}> NFT Minted so far= {balance}/1000</h5>
  </form>
  <div className="row items mt-3">
  {this.state.data.map((item, idx) => {
	  return (
		<div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
			<div className="card">
            		<div className="image-over">
					<img className="card-img-top" src={item.img} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="card-body">
							<h5 className="mb-0">{item.title}</h5>
                    	<div className="card-bottom d-flex justify-content-between">
							<Button className="btn btn-bordered-white btn-smaller mt-3">
								<i className="mr-2" />{item.buttontext}
							</Button>
							</div>
					</div>
                </div>
            </div>
        </div>
        );
    })}
</div>
  </div>
	</div>
 	</div>
  			);
	};
}

export default App;