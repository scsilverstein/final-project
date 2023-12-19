import { testNodes } from "../data/testNodes";
import { NodeID } from "../types/NodeID";
import { AdjacencyListNode } from "./AdjacencyListNode";
import { Graph } from "./Graph";
import { Node } from "./Node";
describe('Graph', () => {
    it('should initialize correctly', () => {
        let graph = new Graph()
        expect(graph).toBeDefined()
        expect(typeof graph.adjacencyList).toEqual(typeof new Map<NodeID, AdjacencyListNode>());
        expect(graph.adjacencyList.size).toEqual(0);
    })
    describe('node methods', () => {
        describe('addNode', () => {
            it('should add node', () => {
                let graph = new Graph()
                let newNodeName = 'name'
                let newNodeContent = 'content'
                let addedNode = graph.addNode(newNodeName, newNodeContent)
                expect(addedNode.id).toEqual(0)
                expect(addedNode.name).toEqual(newNodeName)
                expect(addedNode.content).toEqual(newNodeContent)
                expect(graph.getNodes().length).toEqual(1)
                expect(graph.getNodes()[0].name).toEqual(newNodeName)
                expect(graph.getNodes()[0].content).toEqual(newNodeContent)
            })
        })
        describe('deleteNode', () => {
            it('should delete node', () => {
                let graph = new Graph()
                let newNodeName = 'name'
                let newNodeContent = 'content'
                let addedNode = graph.addNode(newNodeName, newNodeContent)
                let isNodeDeleted = graph.deleteNode(addedNode)
                expect(isNodeDeleted).toEqual(true)
                expect(graph.getNodes().length).toEqual(0)
            })
        })
        describe('getNode', () => {
            it('should return correct node', () => {
                let graph = new Graph()
                let newNodeName = 'name'
                let newNodeContent = 'content'
                let addedNode = graph.addNode(newNodeName, newNodeContent)
                expect(graph.getNode(addedNode.id)).toEqual(addedNode)
            })
        })
        describe('getNodes', () => {
            it('should return all nodes', () => {
                let graph = new Graph()
                let demoNodes = testNodes.nodes
                demoNodes.forEach(({ name }) => graph.addNode(name, name))
                expect(graph.getNodes().length).toEqual(demoNodes.length)
                expect(graph.getNodes()[0].name).toEqual(demoNodes[0].name)
                expect(graph.getNodes()[demoNodes.length - 1].name).toEqual(demoNodes[demoNodes.length - 1].name)
            })
        })
        describe('addNodes', () => {
            it('should return all nodes', () => {
                let graph = new Graph()
                let demoNodes = testNodes.nodes
                demoNodes.forEach(({ name }) => graph.addNode(name, name))
                expect(graph.getNodes().length).toEqual(demoNodes.length)
                expect(graph.getNodes()[0].name).toEqual(demoNodes[0].name)
                expect(graph.getNodes()[demoNodes.length - 1].name).toEqual(demoNodes[demoNodes.length - 1].name)
            })
        })
    })
    describe('edge methods', () => {
        let graph = new Graph()
        let addedNodeA = new Node();
        let addedNodeB = new Node();
        let addedNodeC = new Node();
        beforeEach(() => {
            graph = new Graph()
            let newNodeNameA = 'name'
            let newNodeContentA = 'content'
            addedNodeA = graph.addNode(newNodeNameA, newNodeContentA)
            let newNodeNameB = 'nameB'
            let newNodeContentB = 'contentB'

            addedNodeB = graph.addNode(newNodeNameB, newNodeContentB)
            let newNodeNameC = 'nameC'
            let newNodeContentC = 'contentC'
            addedNodeC = graph.addNode(newNodeNameC, newNodeContentC)
        })
        describe('addEdge', () => {
            describe('undirected', () => {

                it('should add an edge between given nodes', () => {
                    graph.addEdge(addedNodeA, addedNodeB)

                    expect(graph.adjacencyList.get(addedNodeA.id)?.adjacentNodes.has(addedNodeB.id)).toEqual(true)
                    expect(graph.adjacencyList.get(addedNodeB.id)?.adjacentNodes.has(addedNodeA.id)).toEqual(true)
                    expect(graph.getEdges().length).toEqual(2)

                })
            })
            describe('directed', () => {
                it('should add an edge between given nodes', () => {
                    graph.directed = true
                    graph.addEdge(addedNodeA, addedNodeB)

                    expect(graph.adjacencyList.get(addedNodeA.id)?.adjacentNodes.has(addedNodeB.id)).toEqual(true)
                    expect(graph.getEdges().length).toEqual(1)

                })
            })

        })
        describe('delete Edge', () => {
            describe('undirected', () => {

                it('should delete an edge between given nodes', () => {
                    graph.addEdge(addedNodeA, addedNodeB)
                    graph.deleteEdge(addedNodeA, addedNodeB)
                    expect(graph.adjacencyList.get(addedNodeA.id)?.adjacentNodes.has(addedNodeB.id)).toEqual(false)
                    expect(graph.getEdges().length).toEqual(0)
                })
            })
            describe('directed', () => {
                it('should add an edge between given nodes', () => {
                    graph.directed = true
                    graph.addEdge(addedNodeA, addedNodeB)
                    graph.deleteEdge(addedNodeA, addedNodeB)
                    expect(graph.adjacencyList.get(addedNodeA.id)?.adjacentNodes.has(addedNodeB.id)).toEqual(false)
                    expect(graph.getEdges().length).toEqual(0)
                })
            })
        })
        describe('getEdges', () => {
            describe('undirected', () => {
                it('should return corrent number of edges', () => {
                    expect(graph.getEdges().length).toEqual(0)
                    graph.addEdge(addedNodeA, addedNodeB)
                    expect(graph.getEdges().length).toEqual(2)
                    graph.addEdge(addedNodeB, addedNodeC)
                    expect(graph.getEdges().length).toEqual(4)
                    graph.addEdge(addedNodeC, addedNodeA)
                    expect(graph.getEdges().length).toEqual(6)
                })
                it('should return edges between correct nodes', () => {
                    graph.addEdge(addedNodeA, addedNodeB)
                    expect(graph.getEdges()[0].sourceId).toEqual(addedNodeA.id)
                    expect(graph.getEdges()[0].targetId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[1].sourceId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[1].targetId).toEqual(addedNodeA.id)
                    graph.addEdge(addedNodeB, addedNodeC)
                    expect(graph.getEdges()[0].sourceId).toEqual(addedNodeA.id)
                    expect(graph.getEdges()[0].targetId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[1].sourceId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[1].targetId).toEqual(addedNodeA.id)
                    expect(graph.getEdges()[2].sourceId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[2].targetId).toEqual(addedNodeC.id)
                    expect(graph.getEdges()[3].sourceId).toEqual(addedNodeC.id)
                    expect(graph.getEdges()[3].targetId).toEqual(addedNodeB.id)
                    graph.addEdge(addedNodeC, addedNodeA)
                    expect(graph.getEdges()[0].sourceId).toEqual(addedNodeA.id)
                    expect(graph.getEdges()[0].targetId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[1].sourceId).toEqual(addedNodeA.id)
                    expect(graph.getEdges()[1].targetId).toEqual(addedNodeC.id)
                    expect(graph.getEdges()[2].sourceId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[2].targetId).toEqual(addedNodeA.id)
                    expect(graph.getEdges()[3].sourceId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[3].targetId).toEqual(addedNodeC.id)
                    expect(graph.getEdges()[4].sourceId).toEqual(addedNodeC.id)
                    expect(graph.getEdges()[4].targetId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[5].sourceId).toEqual(addedNodeC.id)
                    expect(graph.getEdges()[5].targetId).toEqual(addedNodeA.id)
                })
            })
            describe('directed', () => {
                beforeEach(() => {
                    graph.directed = true

                })
                it('should return corrent number of edges', () => {
                    expect(graph.getEdges().length).toEqual(0)
                    graph.addEdge(addedNodeA, addedNodeB)
                    expect(graph.getEdges().length).toEqual(1)
                    graph.addEdge(addedNodeB, addedNodeC)
                    expect(graph.getEdges().length).toEqual(2)
                    graph.addEdge(addedNodeC, addedNodeA)
                    expect(graph.getEdges().length).toEqual(3)
                })
                it('should return the edges between the correct nodes, one for each added node', () => {
                    graph.addEdge(addedNodeA, addedNodeB)
                    expect(graph.getEdges()[0].sourceId).toEqual(addedNodeA.id)
                    expect(graph.getEdges()[0].targetId).toEqual(addedNodeB.id)
                    graph.addEdge(addedNodeB, addedNodeC)
                    expect(graph.getEdges()[1].sourceId).toEqual(addedNodeB.id)
                    expect(graph.getEdges()[1].targetId).toEqual(addedNodeC.id)
                    graph.addEdge(addedNodeC, addedNodeA)
                    expect(graph.getEdges()[2].sourceId).toEqual(addedNodeC.id)
                    expect(graph.getEdges()[2].targetId).toEqual(addedNodeA.id)
                })
            })

        })
    })
    describe('graph methods', () => {
        let graph = new Graph()
        let addedNodeA = new Node();
        let addedNodeB = new Node();
        let addedNodeC = new Node();
        let addedNodeD = new Node();
        beforeEach(() => {
            graph = new Graph()
            let newNodeNameA = 'name'
            let newNodeContentA = 'content'
            addedNodeA = graph.addNode(newNodeNameA, newNodeContentA)
            let newNodeNameB = 'nameB'
            let newNodeContentB = 'contentB'

            addedNodeB = graph.addNode(newNodeNameB, newNodeContentB)
            let newNodeNameC = 'nameC'
            let newNodeContentC = 'contentC'
            addedNodeC = graph.addNode(newNodeNameC, newNodeContentC)
            let newNodeNameD = 'nameD'
            let newNodeContentD = 'contentD'
            addedNodeD = graph.addNode(newNodeNameD, newNodeContentD)

        })
        describe('undirected', () => {
            beforeEach(() => {
                graph.addEdge(addedNodeA, addedNodeB)
                graph.addEdge(addedNodeB, addedNodeC)
                graph.addEdge(addedNodeC, addedNodeD)
                graph.addEdge(addedNodeB, addedNodeD)
            })
            describe('getShortestPath', () => {
                it('should return shortest path', () => {
                    expect(graph.getShortestPath(addedNodeA, addedNodeD)).toEqual([addedNodeA, addedNodeB, addedNodeD])
                    graph.addEdge(addedNodeD, addedNodeA)
                    expect(graph.getShortestPath(addedNodeA, addedNodeD)).toEqual([addedNodeA, addedNodeD])
                    graph.deleteEdge(addedNodeA, addedNodeD)
                    expect(graph.getShortestPath(addedNodeA, addedNodeD)).toEqual([addedNodeA, addedNodeB, addedNodeD])
                    expect(graph.getShortestPath(addedNodeA, addedNodeA)).toEqual([addedNodeA])
                })
            })
            describe('listGraph', () => {
                it('should return list of nodes', () => {
                    let list: AdjacencyListNode[] = []
                    graph.adjacencyList.forEach(value => list.push(value))
                    expect(graph.listGraph()).toEqual(list)
                })
            })
        })
        describe('directed', () => {
            beforeEach(() => {
                graph.directed = true
                graph.addEdge(addedNodeA, addedNodeB)
                graph.addEdge(addedNodeB, addedNodeC)
                graph.addEdge(addedNodeC, addedNodeD)
                graph.addEdge(addedNodeB, addedNodeD)

            })
            describe('getShortestPath', () => {
                it('should return shortest path', () => {
                    expect(graph.getShortestPath(addedNodeA, addedNodeD)).toEqual([addedNodeA, addedNodeB, addedNodeD])
                    expect(graph.getShortestPath(addedNodeD, addedNodeA)).toEqual([])

                    graph.addEdge(addedNodeD, addedNodeA)
                    expect(graph.getShortestPath(addedNodeA, addedNodeD)).toEqual([addedNodeA, addedNodeB, addedNodeD])
                    expect(graph.getShortestPath(addedNodeD, addedNodeA)).toEqual([addedNodeD, addedNodeA])

                    graph.addEdge(addedNodeA, addedNodeD)
                    expect(graph.getShortestPath(addedNodeA, addedNodeD)).toEqual([addedNodeA, addedNodeD])

                    graph.deleteEdge(addedNodeA, addedNodeD)
                    expect(graph.getShortestPath(addedNodeA, addedNodeD)).toEqual([addedNodeA, addedNodeB, addedNodeD])
                    expect(graph.getShortestPath(addedNodeD, addedNodeA)).toEqual([])
                    expect(graph.getShortestPath(addedNodeA, addedNodeA)).toEqual([addedNodeA])
                })
            })
            describe('listGraph', () => {
                it('should return list of nodes', () => {
                    let list: AdjacencyListNode[] = []
                    graph.adjacencyList.forEach(value => list.push(value))
                    expect(graph.listGraph()).toEqual(list)
                })
            })
        })
    })
})


