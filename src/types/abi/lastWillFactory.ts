/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type NewContract = ContractEventLog<{
  contractAddress: string;
  0: string;
}>;

export interface LastWillFactory extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): LastWillFactory;
  clone(): LastWillFactory;
  methods: {
    CONTROLLER(): NonPayableTransactionObject<string>;

    NATIVE(): NonPayableTransactionObject<string>;

    deployLastWill(
      tokenToPay: string,
      _backupAddresses: string[],
      _shares: (number | string | BN)[],
      _confirmationPeriod: number | string | BN,
      distributionReward: number | string | BN
    ): NonPayableTransactionObject<void>;

    price(arg0: string): NonPayableTransactionObject<string>;

    setPrice(
      _token: string,
      _price: number | string | BN
    ): NonPayableTransactionObject<void>;
  };
  events: {
    NewContract(cb?: Callback<NewContract>): EventEmitter;
    NewContract(
      options?: EventOptions,
      cb?: Callback<NewContract>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "NewContract", cb: Callback<NewContract>): void;
  once(
    event: "NewContract",
    options: EventOptions,
    cb: Callback<NewContract>
  ): void;
}
