import {useState, KeyboardEvent} from 'react';
import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {nftaddress} from '../config';
import GDZ from '../artifacts/contracts/GitDenza.sol/GitDenza.json';

export default function CreateItem() {
  const [formInput, updateFormInput] = useState({hash: ''});

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      mint();
    }
  };

  const mint = async () => {
    const {hash} = formInput;

    if (hash.length !== 40) {
      alert('Must be a valid git hash');
      return;
    }

    const numbers = hash.toLowerCase().match(/\d/g);
    const letters = hash.toLowerCase().match(/[A-Za-z]/g);

    if (!numbers || !letters) {
      alert('Must be a valid git hash');
      return;
    }

    /* initialize */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* create the item */
    const contract = new ethers.Contract(nftaddress, GDZ.abi, signer);

    let transaction = await contract.safeMint(hash);

    alert(`Complete! Transaction Hash: ${transaction.hash}`);

    location.href = '/';
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col pb-12">
        <h3 className="text-xl mt-6 font-bold">
          1. In Metamask, select the Ropsten Developer Network (Network {'->'} Ropsten)
        </h3>
        <h3 className="text-xl py-2 font-bold">
          2. Ensure you have enough ETH to cover the Gas (
          <a className="border-bottom-100 underline" href="https://faucet.ropsten.be/">
            use the faucet
          </a>{' '}
          if not)
        </h3>
        <input
          placeholder="Git Hash"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({hash: e.target.value})}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={mint}
          className="font-bold mt-4 bg-black text-white rounded p-4 shadow-lg"
        >
          Mint a new style
        </button>
      </div>
    </div>
  );
}
