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

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type TransferLocked = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface Bep20 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Bep20;
  clone(): Bep20;
  methods: {
    advanceStage(
      unlockTime: number | string | BN
    ): NonPayableTransactionObject<void>;

    allowance(
      owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    approve(
      spender: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    balanceOf(account: string): NonPayableTransactionObject<string>;

    balanceOfLocked(account: string): NonPayableTransactionObject<string>;

    balanceOfSum(account: string): NonPayableTransactionObject<string>;

    currentStage(): NonPayableTransactionObject<string>;

    decimals(): NonPayableTransactionObject<string>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    disableDoNotTriggerLockupWhenTo(
      account: string
    ): NonPayableTransactionObject<void>;

    disableLockup(): NonPayableTransactionObject<void>;

    disableTriggerLockupWhenFrom(
      account: string
    ): NonPayableTransactionObject<void>;

    doNotTriggerLockupWhenTo(
      arg0: string
    ): NonPayableTransactionObject<boolean>;

    enableDoNotTriggerLockupWhenTo(
      account: string
    ): NonPayableTransactionObject<void>;

    enableLockup(): NonPayableTransactionObject<void>;

    enableTriggerLockupWhenFrom(
      account: string
    ): NonPayableTransactionObject<void>;

    increaseAllowance(
      spender: string,
      addedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    locks(
      arg0: string,
      arg1: number | string | BN
    ): NonPayableTransactionObject<{
      amount: string;
      buyTime: string;
      0: string;
      1: string;
    }>;

    lockupEnabled(): NonPayableTransactionObject<boolean>;

    mint(
      account: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    name(): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    stageUnlockTime(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    symbol(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    transfer(
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    triggerLockupWhenFrom(arg0: string): NonPayableTransactionObject<boolean>;

    unlock(account: string): NonPayableTransactionObject<void>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    TransferLocked(cb?: Callback<TransferLocked>): EventEmitter;
    TransferLocked(
      options?: EventOptions,
      cb?: Callback<TransferLocked>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;

  once(event: "TransferLocked", cb: Callback<TransferLocked>): void;
  once(
    event: "TransferLocked",
    options: EventOptions,
    cb: Callback<TransferLocked>
  ): void;
}
