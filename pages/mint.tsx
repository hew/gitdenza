import {useState} from 'react';
import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {nftaddress} from '../config';

import GDZ from '../artifacts/contracts/GitDenza.sol/GitDenza.json';

export default function CreateItem() {
  const [formInput, updateFormInput] = useState({hash: ''});

  async function mint() {
    const {hash} = formInput;

    if (hash.length !== 40) {
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

    let transaction = await contract.safeMint(formInput.hash);

    alert(`Complete! Transaction Hash: ${transaction.hash}`)

    location.href = '/'
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Gist Hash"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({hash: e.target.value})}
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
