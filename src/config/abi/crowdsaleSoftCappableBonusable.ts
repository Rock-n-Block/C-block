import { AbiItem } from 'web3-utils';

export default [
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
      {
        type: 'uint8',
        name: 'contractType',
        internalType: 'uint8',
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
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'deploySoftCappableBonusableCrowdsale',
    inputs: [
      {
        type: 'address[2]',
        name: 'tokenToPayAndOwner',
        internalType: 'address[2]',
      },
      { type: 'address', name: '_token', internalType: 'address' },
      { type: 'uint256', name: '_tokenDecimals', internalType: 'uint256' },
      { type: 'uint256', name: '_duration', internalType: 'uint256' },
      { type: 'uint256', name: '_soft_cap', internalType: 'uint256' },
      { type: 'address[]', name: '_tokens', internalType: 'address[]' },
      { type: 'uint256[]', name: '_rates', internalType: 'uint256[]' },
      { type: 'uint256[2]', name: '_limits', internalType: 'uint256[2]' },
      { type: 'uint256[2]', name: '_bonus', internalType: 'uint256[2]' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'deploySoftCappableBonusableDatesChangeableCrowdsale',
    inputs: [
      {
        type: 'address[2]',
        name: 'tokenToPayAndOwner',
        internalType: 'address[2]',
      },
      { type: 'address', name: '_token', internalType: 'address' },
      { type: 'uint256', name: '_tokenDecimals', internalType: 'uint256' },
      { type: 'uint256', name: '_duration', internalType: 'uint256' },
      { type: 'uint256', name: '_soft_cap', internalType: 'uint256' },
      { type: 'address[]', name: '_tokens', internalType: 'address[]' },
      { type: 'uint256[]', name: '_rates', internalType: 'uint256[]' },
      { type: 'uint256[2]', name: '_limits', internalType: 'uint256[2]' },
      { type: 'uint256[2]', name: '_bonus', internalType: 'uint256[2]' },
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
    inputs: [
      { type: 'address', name: '', internalType: 'address' },
      { type: 'uint256', name: '', internalType: 'uint256' },
    ],
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
      { type: 'uint256[2]', name: '_price', internalType: 'uint256[2]' },
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