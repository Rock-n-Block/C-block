/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Crowdsale } from "./Crowdsale";
import { LastWill } from "./LastWill";
import { LostKey } from "./LostKey";
import { Token } from "./Token";
import { Wedding } from "./Wedding";


export interface HistoryResponse {
    crowdsales: Crowdsale;
    lastwills: LastWill;
    lostkeys: LostKey;
    tokens?: Token;
    weddings: Wedding;
}