/**
 * @flow
 * @relayHash 969fac41e8bca3e33455f85734ea59bd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BuyTicketsQueryVariables = {|
  userID: string
|};
export type BuyTicketsQueryResponse = {|
  +seat: ?{|
    +seatLen: ?number
  |}
|};
export type BuyTicketsQuery = {|
  variables: BuyTicketsQueryVariables,
  response: BuyTicketsQueryResponse,
|};
*/


/*
query BuyTicketsQuery(
  $userID: ID!
) {
  seat(id: $userID) {
    seatLen
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userID",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "seatLen",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "BuyTicketsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "seat",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Seat",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "BuyTicketsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "seat",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Seat",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
  },
  "params": {
    "operationKind": "query",
    "name": "BuyTicketsQuery",
    "id": null,
    "text": "query BuyTicketsQuery(\n  $userID: ID!\n) {\n  seat(id: $userID) {\n    seatLen\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ab6fe29c50fb4b2885d60d9df200959f';
module.exports = node;
