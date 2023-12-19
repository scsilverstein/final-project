import { Node } from "./Node";
import { NodeID } from "../types/NodeID";

export class AdjacencyListNode {
    node: Node;
    adjacentNodes: Set<NodeID>;
    constructor(node: Node) {
        this.node = node;
        this.adjacentNodes = new Set();
    }
}
