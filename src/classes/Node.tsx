import { NodeID } from "../types/NodeID";
import { AdjacencyListNode } from "./AdjacencyListNode";

export class Node {
    id: NodeID;
    name: string;
    content: string;
    adjacencyListNode: AdjacencyListNode | null = null;
    constructor(id: NodeID = 0, name: string = '', content: string = '') {
        this.id = id;
        this.name = name;
        this.content = content;
    }
}
