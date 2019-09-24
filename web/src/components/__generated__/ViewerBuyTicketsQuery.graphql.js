/**
 * @flow
 * @relayHash 3ae911c42695cfbb01f67459b80e746c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ViewerBuyTicketsQueryVariables = {|
  phone?: ?number
|};
export type ViewerBuyTicketsQueryResponse = {|
  +ticket: ?{|
    +phone: ?string
  |}
|};
export type ViewerBuyTicketsQuery = {|
  variables: ViewerBuyTicketsQueryVariables,
  response: ViewerBuyTicketsQueryResponse,
|};
*/


/*
query ViewerBuyTicketsQuery(
  $phone: Int
) {
  ticket(phone: $phone) {
    phone
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "phone",
    "type": "Int",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "phone",
    "variableName": "phone"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ViewerBuyTicketsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ticket",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Ticket",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ViewerBuyTicketsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ticket",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Ticket",
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
    "name": "ViewerBuyTicketsQuery",
    "id": null,
    "text": "query ViewerBuyTicketsQuery(\n  $phone: Int\n) {\n  ticket(phone: $phone) {\n    phone\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5be6697585111eab94bdbf9bb8f0e129';
module.exports = node;
