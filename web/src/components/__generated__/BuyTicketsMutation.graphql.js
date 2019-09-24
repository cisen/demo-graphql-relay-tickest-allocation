/**
 * @flow
 * @relayHash 11822672513e9bcd5327725da88c8046
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BuyTicketsInfo = {|
  phone?: ?string,
  ticketsCout?: ?number,
|};
export type BuyTicketsMutationVariables = {|
  input: BuyTicketsInfo
|};
export type BuyTicketsMutationResponse = {|
  +buyTickets: ?{|
    +ticket: ?{|
      +phone: ?string,
      +seatCodes: ?string,
    |}
  |}
|};
export type BuyTicketsMutation = {|
  variables: BuyTicketsMutationVariables,
  response: BuyTicketsMutationResponse,
|};
*/


/*
mutation BuyTicketsMutation(
  $input: BuyTicketsInfo!
) {
  buyTickets(input: $input) {
    ticket {
      phone
      seatCodes
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "BuyTicketsInfo!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "seatCodes",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "BuyTicketsMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "buyTickets",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "BuyTicketsPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "ticket",
            "storageKey": null,
            "args": null,
            "concreteType": "Ticket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BuyTicketsMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "buyTickets",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "BuyTicketsPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "ticket",
            "storageKey": null,
            "args": null,
            "concreteType": "Ticket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "BuyTicketsMutation",
    "id": null,
    "text": "mutation BuyTicketsMutation(\n  $input: BuyTicketsInfo!\n) {\n  buyTickets(input: $input) {\n    ticket {\n      phone\n      seatCodes\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8742837b1f6d3a8b743c0c7ea8e4253b';
module.exports = node;
