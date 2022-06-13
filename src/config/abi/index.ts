import { AbiItem } from 'web3-utils';
import bep20 from './bep20.json';
import erc20BurnableMintablePausableFreezableToken from './erc20BurnableMintablePausableFreezableToken.json';
import sale from './sale.json';

import tokenMintableFreezable from './tokenMintableFreezable.json';
import tokenMintableNonFreezable from './tokenMintableNonFreezable.json';
import tokenNonMintableFreezable from './tokenNonMintableFreezable.json';
import tokenNonMintableNonFreezable from './tokenNonMintableNonFreezable.json';

import crowdsaleNonSoftCappableBonusable from './crowdsaleNonSoftCappableBonusable.json';
import crowdsaleNonSoftCappableNonBonusable from './crowdsaleNonSoftCappableNonBonusable.json';
import crowdsaleSoftCappableBonusable from './crowdsaleSoftCappableBonusable.json';
import crowdsaleSoftCappableNonBonusable from './crowdsaleSoftCappableNonBonusable.json';

import weddingFactory from './weddingFactory.json';
import wedding from './wedding.json'; // Instance of WeddingFactory

import lostKeyFactory from './lostKeyFactory.json';
import lostKey from './lostKey.json'; // Instance of LostKeyFactory

import lastWillFactory from './lastWillFactory.json';
import controller from './controller.json';

export const bep20Abi = bep20 as AbiItem[];
export const erc20BurnableMintablePausableFreezableTokenAbi = erc20BurnableMintablePausableFreezableToken as AbiItem[]; // Common instance of TokenFactory
export const saleAbi = sale as AbiItem[];

// Factories
export const tokenMintableFreezableAbi = tokenMintableFreezable as AbiItem[];
export const tokenMintableNonFreezableAbi = tokenMintableNonFreezable as AbiItem[];
export const tokenNonMintableFreezableAbi = tokenNonMintableFreezable as AbiItem[];
export const tokenNonMintableNonFreezableAbi = tokenNonMintableNonFreezable as AbiItem[];

export const crowdsaleNonSoftCappableBonusableAbi = crowdsaleNonSoftCappableBonusable as AbiItem[];
export const crowdsaleNonSoftCappableNonBonusableAbi = crowdsaleNonSoftCappableNonBonusable as AbiItem[];
export const crowdsaleSoftCappableBonusableAbi = crowdsaleSoftCappableBonusable as AbiItem[];
export const crowdsaleSoftCappableNonBonusableAbi = crowdsaleSoftCappableNonBonusable as AbiItem[];

export const weddingFactoryAbi = weddingFactory as AbiItem[];
export const weddingAbi = wedding as AbiItem[];

export const lostKeyFactoryAbi = lostKeyFactory as AbiItem[];
export const lostKeyAbi = lostKey as AbiItem[];

export const lastWillFactoryAbi = lastWillFactory as AbiItem[];

export const controllerAbi = controller as AbiItem[];
