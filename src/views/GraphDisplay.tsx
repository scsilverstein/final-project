import { memo, useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { Node } from "../classes/Node";
import { Edge } from "../types/Edge";
import { Box } from "../components/Box";
const colors = {
    sourceNode: "#f5e617",
    targetNode: "#219ebc",
    pathNode: "#fb6107",
    defaultNode: "#bbb",
    pathEdge: "#fead02",
    defaultEdge: "white",
};
const sizes = {
    sourceNode: 3,
    targetNode: 3,
    pathNode: 2,
    defaultNode: 1,
    pathEdge: 5,
    defaultEdge: 1,
};
export const GraphDisplay: React.FC<{
    edges: Edge[];
    nodes: Node[];
    path: Node[];
    sourceNodeId: number;
    targetNodeId: number;
}> = memo(({ edges, nodes, path = [], sourceNodeId, targetNodeId }) => {
    // let graphRef = useRef(null);
    // let [width, setWidth] = useState();
    // useEffect(() => {
    //     if (graphRef.current) {
    //         setWidth(graphRef.current.innerWidth);
    //     }
    // }, [graphRef]);
    return (
        <Box justifyContent="center">
            <ForceGraph2D
                width={window.innerWidth * 0.8}
                height={window.innerHeight * 0.6}
                nodeColor={(node) => {
                    let isSource = sourceNodeId == node.id ? colors["sourceNode"] : false;
                    let isTarget = targetNodeId == node.id ? colors["targetNode"] : false;
                    let isInPath = path.includes(node.id) ? colors["pathNode"] : false;

                    let isElse = colors["defaultNode"];
                    return isSource || isTarget || isInPath || isElse;
                }}
                nodeVal={(node) => {
                    let isSource = sourceNodeId == node.id ? sizes["sourceNode"] : false;
                    let isTarget = targetNodeId == node.id ? sizes["targetNode"] : false;
                    let isInPath = path.includes(node.id) ? sizes["pathNode"] : false;

                    let isElse = sizes["defaultNode"];
                    return isSource || isTarget || isInPath || isElse;
                }}
                nodeCanvasObjectMode={() => "after"}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const content = node.val;
                    console.log('node', node)
                    let fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "white"; //node.color;
                    ctx.fillText(label, node.x, node.y - 8);
                    fontSize = 8 / globalScale;

                    ctx.font = `${fontSize}px Sans-Serif`;

                    ctx.fillText(content, node.x, node.y + 8);
                }}
                linkWidth={(link) => {
                    return path.includes(link.source.id) && path.includes(link.target.id)
                        ? sizes["pathEdge"]
                        : sizes["defaultEdge"];
                }}
                linkColor={(link) => {
                    return path.includes(link.source.id) && path.includes(link.target.id)
                        ? colors["pathEdge"]
                        : colors["defaultEdge"];
                }}
                linkDirectionalArrowColor={(link) => {
                    return path.includes(link.source.id) && path.includes(link.target.id)
                        ? colors["pathEdge"]
                        : colors["defaultEdge"];
                }}
                linkDirectionalArrowRelPos={1}
                linkDirectionalArrowLength={1}
                graphData={{
                    links: edges.map(({ sourceId: source, targetId: target }) => ({
                        source,
                        target,
                    })),
                    nodes,
                }}
            />
        </Box>
    );
});
