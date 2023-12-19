# Data Structure

Graph Data Structure

## Explination of the Graph Data Structure

The Graph data structure represents data as nodes and the relationships between that data as edges with a source node and target node. It is a non linear datastructure and abstract data type. It can be represent in multiple ways, through an adjacency list, adjacency matrix and edge list. In this program I use a ajdacency list, a list of nodes and their respective adjacent nodes to represent this graph. However we can get an edge list from the graph by using the getEdges method.

## What was done and why

To demonstrate the implementation of this graph datastructure, a react application was built to visualize and expose the various functions of the graph. On the dashboard, There are 3 panels. First, there is a a new node form to provide a name and provide content to a pending node. There is also a button to add that node to the graph. The Second panel has some graph method buttons, adding an edge from node to node, deleting an edge from node to node, and getting the shortest path from node to node. On the third panel, there are two select inputs to select a source node and target node for the adding adding and deleting of an edge or running the shortest path algorithm (leveraging breadth first search). Below there are buttons to delete either node aswell. Each of these buttons were selected to demonstrate a key, and useful, method of the graph data structure.

The key methods I wanted to demonstrate were, adding a node, deleting a node, useful for adding and deleting of new data to the graph. I show adding and deleting edges which is useful for managing the connections between those graph nodes. Finally, I added a shortest path implementation which shows how the graphs private breadth first search function and private adjacent nodes function are used to find the shortest path between two nodes.

Notes: The directed parameter for the graph is an additional parameter not indicated in the proposeal. It was added to make the demo more straight forward, and more clearly show deleting nodes and getting shortest path without directed edges leading to confusion.

## How to run

To run the react application

```
npm install;
npm run dev;
```

To run Jest tests:

```
npm run test
```

## Where relavent code is held

### Most Relevant

The Graph, Node and Adjacency List classes can be found under /src/classes/. For each class, it's constructor and other methods are tested.

### Not so Relevant

The client application can be found with the root component at /src/App.tsx and it's sub components under /src/views/.
