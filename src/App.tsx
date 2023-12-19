import { useState, Fragment, useCallback, useRef, useEffect } from "react";

import "./App.css";
import { GraphData } from "react-force-graph-2d";
import { Node } from "./classes/Node";
import { Graph } from "./classes/Graph";
import { testNodes } from "./data/testNodes";
import { Edge } from "./types/Edge";
import { NodeID } from "./types/NodeID";
import { GraphDisplay } from "./views/GraphDisplay";
import { NodePanel } from "./views/NodePanel";
import { Box } from "./components/Box";
const App = () => {
  const graph = useRef(new Graph());
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [path, setPath] = useState<NodeID[]>([]);
  const [sourceNodeId, setSourceNodeId] = useState<number>();
  const [targetNodeId, setTargetNodeId] = useState<number>();

  useEffect(() => {
    graph.current.addNodes(testNodes);
    setNodes(graph.current.getNodes());
  }, []);

  return (
    <Box flexDirection="column" border='1px solid white'>
      <GraphDisplay
        edges={graph.current.getEdges()}
        nodes={graph.current
          .getNodes()
          .map(({ content: val, ...rest }) => ({ ...rest, val }))}
        path={path}
        sourceNodeId={sourceNodeId}
        targetNodeId={targetNodeId}
      />
      <NodePanel
        sourceNodeId={sourceNodeId}
        setSourceNodeId={setSourceNodeId}
        targetNodeId={targetNodeId}
        setTargetNodeId={setTargetNodeId}
        graph={graph.current}
        nodes={nodes}
        setNodes={setNodes}
        setEdges={setEdges}
        setPath={setPath}
      ></NodePanel>

    </Box>
  );

};

export default App;
