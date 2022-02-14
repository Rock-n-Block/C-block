import { AbiItem } from 'web3-utils';

export default [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [{ type: 'address', name: '_native', internalType: 'address' }],
  },
  {
    type: 'event',
    name: 'NewContract',
    inputs: [
      {
        type: 'address',
        name: 'contractAddress',
        internalType: 'address',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        internalType: 'address',
        indexed: true,
      },
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'contract IERC20' }],
    name: 'NATIVE',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'deployLostKey',
    inputs: [
      { type: 'address', name: 'tokenToPay', internalType: 'address' },
      {
        type: 'address[]',
        name: '_backupAddresses',
        internalType: 'address[]',
      },
      { type: 'uint256[]', name: '_shares', internalType: 'uint256[]' },
      { type: 'uint256', name: '_confirmationPeriod', internalType: 'uint256' },
      { type: 'uint256', name: 'distributionReward', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'getToken',
    inputs: [{ type: 'address', name: '_token', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'owner',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'price',
    inputs: [{ type: 'address', name: '', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'renounceOwnership',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setPrice',
    inputs: [
      { type: 'address', name: '_token', internalType: 'address' },
      { type: 'uint256', name: '_price', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
  },
] as AbiItem[];