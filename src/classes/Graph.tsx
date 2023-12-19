import { Node } from "./Node";
import { AdjacencyListNode } from "./AdjacencyListNode";
import { NodeID } from "../types/NodeID";
import { Edge } from "../types/Edge";

export class Graph {
    directed: boolean = false;
    adjacencyList: Map<NodeID, AdjacencyListNode>;
    private nodeIdCounter: NodeID = 0;

    constructor() {
        this.adjacencyList = new Map<NodeID, AdjacencyListNode>();
    }
    getNodes() {
        return [...this.adjacencyList.values()].map(({ node }) => node);
    }
    getEdges(): Edge[] {
        let edges = [...this.adjacencyList].reduce(
            (prev: Edge[], [sourceId, { adjacentNodes }]): Edge[] => [
                ...prev,
                ...[...adjacentNodes].map((targetId) => ({ sourceId, targetId })),
            ],
            []
        );
        return edges
    }
    addNode(name: string, content: string): Node {
        const newNode = new Node(this.nodeIdCounter, name, content);
        this.nodeIdCounter++;
        const newAdjacencyListNode = new AdjacencyListNode(newNode);
        this.adjacencyList.set(newNode.id, newAdjacencyListNode);
        newNode.adjacencyListNode = newAdjacencyListNode;
        return newNode;
    }

    deleteNode(node: Node): boolean {
        if (!this.adjacencyList.has(node.id)) return false;
        this.adjacencyList.delete(node.id);
        this.adjacencyList.forEach(({ adjacentNodes }) => adjacentNodes.delete(node.id)
        );
        return true;
    }

    addEdge(nodeA: Node | undefined, nodeB: Node | undefined): void {
        if (nodeA && nodeB) {
            this.adjacencyList.get(nodeA.id)?.adjacentNodes.add(nodeB.id);
            if (!this.directed) {
                this.adjacencyList.get(nodeB.id)?.adjacentNodes.add(nodeA.id);

            }
        }
    }

    deleteEdge(nodeA: Node, nodeB: Node): void {
        this.adjacencyList.get(nodeA.id)?.adjacentNodes.delete(nodeB.id);
        this.adjacencyList.get(nodeB.id)?.adjacentNodes.delete(nodeA.id);
    }

    printGraph(): void {
        this.adjacencyList.forEach((adjListNode) => {
            const adjacentIds = [...adjListNode.adjacentNodes].join(", ");
            console.log(`Node ${adjListNode.node.id}: ${adjacentIds}`);
        });
    }

    listGraph(): AdjacencyListNode[] {
        return [...this.adjacencyList.values()];
    }

    getShortestPath(nodeA: Node, nodeB: Node): Node[] {
        return this.breadthFirstSearch(nodeA, nodeB);
    }
    getNode(id: number): Node | undefined {
        return this.adjacencyList.get(id)?.node;
    }
    addNodes({ nodes, edges }: { nodes: Node[]; edges: Edge[]; }): void {
        nodes.forEach(({ name, content }) => this.addNode(name, content));
        edges.forEach(({ sourceId, targetId }) => this.addEdge(this.getNode(sourceId), this.getNode(targetId)));

    }
    private breadthFirstSearch(nodeA: Node, nodeB: Node): Node[] {
        const visited = new Set();
        const queue: { node: Node, path: Node[] }[] = [];
        queue.push({ node: nodeA, path: [nodeA] });
        while (queue.length > 0) {

            const { node: current = null, path } = queue.shift() || { node: null, path: [] };
            if (current == null) return [];
            if (current.id == nodeB.id) {
                return path;
            }
            visited.add(current.id);
            for (const node of this.getAdjacentNodes(current)) {
                if (!visited.has(node.id)) {
                    queue.push({
                        node, path: [...path, node]
                    });
                }
            }
        }
        return [];
    }


    private getAdjacentNodes(node: Node): Node[] {
        const adjListNode = this.adjacencyList.get(node.id);
        if (!adjListNode) return [];

        return [...adjListNode.adjacentNodes].map(
            (id) => this.adjacencyList.get(id)!.node
        );
    }
}
