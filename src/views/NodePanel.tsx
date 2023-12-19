import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Box } from "../components/Box";

const GetShortestPathButton = (props) => (
    <Button
        onClick={() => {
            const sourceNode = props.adjacencyList.get(props.sourceNodeId)?.node;
            const targetNode = props.adjacencyList.get(props.targetNodeId)?.node;
            props.setPath(
                props.graph.getShortestPath(sourceNode, targetNode).map(({ id }) => id)
            );
        }}
        disabled={!(props.sourceNodeId >= 0 && props.targetNodeId >= 0)}
    >
        Get Shortest Path
    </Button>
);

const DeleteEdgeButton = (props) => (
    <Button
        onClick={() => {
            props.graph.deleteEdge(
                props.graph.getNode(props.sourceNodeId),
                props.graph.getNode(props.targetNodeId)
            );
            props.setNodes(props.graph.getNodes());
            props.setEdges(props.graph.getEdges());
        }}
    >
        Delete Edge From {props.graph.getNode(props.sourceNodeId)?.name} to {props.graph.getNode(props.targetNodeId)?.name}
    </Button>
);

const AddEdgeButton = (props) => (
    <Button
        onClick={() => {
            props.graph.addEdge(
                props.graph.getNode(props.sourceNodeId),
                props.graph.getNode(props.targetNodeId)
            );
            props.setEdges(props.graph.getEdges());
        }}
        disabled={!(props.sourceNodeId >= 0 && props.targetNodeId >= 0)}
    >
        Add Edge From {props.graph.getNode(props.sourceNodeId)?.name} to {props.graph.getNode(props.targetNodeId)?.name}
    </Button>
);

const AddNodeButton = (props) => (
    <Button
        onClick={() => {
            let node = props.graph.addNode(props.newNodeName, props.newNodeContent);
            console.log("len", props.graph.adjacencyList.size);

            if (props.graph.adjacencyList.size == 1) {
                props.setSourceNodeId(node.id);
                props.setTargetNodeId(node.id);
            }

            props.setNodes(props.graph.getNodes());
            props.setEdges(props.graph.getEdges());
            props.setNewNodeName("");
            props.setNewNodeContent("");
        }}
        disabled={!props.newNodeName}
    >
        Add Node
    </Button>
);

const NodeContentInput = (props) => (
    <label>
        <Box flexDirection="column" margin="8px">

            Content:
            <input
                id="content"
                value={props.newNodeContent}
                onChange={({ target: { value } }) => props.setNewNodeContent(value)}
            ></input>
        </Box>
    </label>
);

const NodeNameInput = (props) => (
    <label>
        <Box flexDirection="column" margin="8px">

            Name:{" "}
            <input
                id="name"
                value={props.newNodeName}
                onChange={({ target: { value } }) => props.setNewNodeName(value)}
            ></input>
        </Box>

    </label>
);

const NewNodeFieldSet = (props) => (
    <fieldset>
        <legend>New Node Info</legend>
        <Box flexDirection="column" justifyContent="center" height='100%' >
            <NodeNameInput
                newNodeName={props.newNodeName}
                setNewNodeName={props.setNewNodeName}
            ></NodeNameInput>
            <NodeContentInput
                newNodeContent={props.newNodeContent}
                setNewNodeContent={props.setNewNodeContent}
            ></NodeContentInput>
            <AddNodeButton
                newNodeName={props.newNodeName}
                setNewNodeName={props.setNewNodeName}
                newNodeContent={props.newNodeContent}
                setNewNodeContent={props.setNewNodeContent}
                setTargetNodeId={props.setTargetNodeId}
                setSourceNodeId={props.setSourceNodeId}
                setNodes={props.setNodes}
                setEdges={props.setEdges}
                graph={props.graph}
            ></AddNodeButton>
        </Box>
    </fieldset>
);

const NodeSelectionFieldSet = (props) => (
    <fieldset>
        <legend>Node Selection</legend>
        <Box flexDirection="column" >
            <Box>
                <Box flexDirection="column">
                    <label>
                        Source Node:{" "}
                        <select
                            value={props.sourceNodeId}
                            onChange={({ target: { value } }) => {
                                console.log("source", value, props.adjacencyList);
                                props.setSourceNodeId(parseInt(value));
                            }}
                        >
                            {props.nodes.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Button
                        onClick={() => {
                            props.graph.deleteNode(props.graph.getNode(props.sourceNodeId));
                            props.setNodes(props.graph.getNodes());
                            props.setEdges(props.graph.getEdges());
                        }}
                    >
                        Delete {props.graph.getNode(props.sourceNodeId)?.name} Node
                    </Button>
                </Box>
                <Box flexDirection="column">
                    <label>
                        Source Node:{" "}
                        <select
                            value={props.targetNodeId}
                            onChange={({ target: { value } }) => {
                                props.setTargetNodeId(parseInt(value));
                            }}
                        >
                            {props.nodes.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Button
                        onClick={() => {
                            props.graph.deleteNode(props.graph.getNode(props.targetNodeId));
                            props.setNodes(props.graph.getNodes());
                            props.setEdges(props.graph.getEdges());
                        }}
                    >
                        Delete {props.graph.getNode(props.targetNodeId)?.name} Node
                    </Button>
                </Box>

            </Box>
            {" "}

        </Box>
    </fieldset>
);

const MethodButtonsFieldSet = (props) => (
    <fieldset>
        <legend>Method Buttons</legend>
        <Box height={"100%"}>
            <Box flexDirection="column">

                <AddEdgeButton
                    targetNodeId={props.targetNodeId}
                    sourceNodeId={props.sourceNodeId}
                    setEdges={props.setEdges}
                    graph={props.graph}
                ></AddEdgeButton>
            </Box>
            <Box flexDirection="column">

                <DeleteEdgeButton
                    targetNodeId={props.targetNodeId}
                    sourceNodeId={props.sourceNodeId}
                    setEdges={props.setEdges}
                    setNodes={props.setNodes}
                    graph={props.graph}
                ></DeleteEdgeButton>
                <GetShortestPathButton
                    targetNodeId={props.targetNodeId}
                    sourceNodeId={props.sourceNodeId}
                    adjacencyList={props.graph.adjacencyList}
                    graph={props.graph}
                    setPath={props.setPath}
                ></GetShortestPathButton>
            </Box>

        </Box>
    </fieldset>
);

export const NodePanel = ({
    targetNodeId,
    setTargetNodeId,
    sourceNodeId,
    setSourceNodeId,
    nodes,
    setNodes,
    edges,
    setEdges,
    graph,
    setPath,
}) => {
    const [newNodeName, setNewNodeName] = useState<string>();
    const [newNodeContent, setNewNodeContent] = useState<string>("");
    useEffect(() => {
        let firstNodeId = nodes?.[0]?.id;
        if (firstNodeId >= 0) {
            setSourceNodeId(firstNodeId);
            setTargetNodeId(firstNodeId);
        }
    }, [nodes]);
    return (
        <Box>
            <NewNodeFieldSet
                newNodeName={newNodeName}
                setNewNodeName={setNewNodeName}
                newNodeContent={newNodeContent}
                setNewNodeContent={setNewNodeContent}
                sourceNodeId={sourceNodeId}

                targetNodeId={targetNodeId}
                graph={graph}
                setNodes={setNodes}
                setEdges={setEdges}
            ></NewNodeFieldSet>
            <MethodButtonsFieldSet
                newNodeName={newNodeName}
                setNewNodeName={setNewNodeName}
                newNodeContent={newNodeContent}
                setNewNodeContent={setNewNodeContent}
                targetNodeId={targetNodeId}
                setTargetNodeId={setTargetNodeId}
                sourceNodeId={sourceNodeId}
                setSourceNodeId={setSourceNodeId}
                setNodes={setNodes}
                setEdges={setEdges}
                graph={graph}
                setPath={setPath}
            ></MethodButtonsFieldSet>
            <NodeSelectionFieldSet
                targetNodeId={targetNodeId}
                setTargetNodeId={setTargetNodeId}
                sourceNodeId={sourceNodeId}
                setSourceNodeId={setSourceNodeId}
                nodes={nodes}
                adjacencyList={graph.adjacencyList}
                get={graph.adjacencyList.get}
                setNodes={setNodes}
                setEdges={setEdges}
                graph={graph}
            ></NodeSelectionFieldSet>
        </Box>
    );
};
