import { Node } from "./Node";
import { AdjacencyListNode } from "./AdjacencyListNode";

describe('AdjacencyListNode', () => {

    it('should initialialize correctly', () => {
        const node = new Node();
        const adjacencyListNode = new AdjacencyListNode(node);
        expect(adjacencyListNode).toBeDefined();
        expect(adjacencyListNode.node).toEqual(node);
        expect(typeof adjacencyListNode.adjacentNodes).toEqual(typeof new Set());
        expect(adjacencyListNode.adjacentNodes.size).toEqual(0);
    });

});
