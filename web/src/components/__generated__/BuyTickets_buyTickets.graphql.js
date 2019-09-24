/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type BuyTickets_buyTickets$ref: FragmentReference;
declare export opaque type BuyTickets_buyTickets$fragmentType: BuyTickets_buyTickets$ref;
export type BuyTickets_buyTickets = {|
  +phone: ?string,
  +seatCodes: ?string,
  +$refType: BuyTickets_buyTickets$ref,
|};
export type BuyTickets_buyTickets$data = BuyTickets_buyTickets;
export type BuyTickets_buyTickets$key = {
  +$data?: BuyTickets_buyTickets$data,
  +$fragmentRefs: BuyTickets_buyTickets$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "BuyTickets_buyTickets",
  "type": "Ticket",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "phone",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "seatCodes",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'cf07fbfdbf0904b6b0dfa89a6e487398';
module.exports = node;
