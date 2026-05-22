function dijkstra(graph, start) {

    const distances = {};
  
    const visited = {};
  
    // INITIALIZE DISTANCES
  
    for (let node in graph) {
  
      distances[node] = Infinity;
    }
  
    distances[start] = 0;
  
    while (true) {
  
      let closestNode = null;
  
      let shortestDistance = Infinity;
  
      // FIND CLOSEST UNVISITED NODE
  
      for (let node in distances) {
  
        if (
          !visited[node] &&
          distances[node] < shortestDistance
        ) {
  
          shortestDistance = distances[node];
  
          closestNode = node;
        }
      }
  
      // STOP CONDITION
  
      if (closestNode === null) {
  
        break;
      }
  
      visited[closestNode] = true;
  
      // CHECK NEIGHBORS
  
      for (let neighbor in graph[closestNode]) {
  
        let newDistance =
  
          distances[closestNode] +
  
          graph[closestNode][neighbor];
  
        if (newDistance < distances[neighbor]) {
  
          distances[neighbor] = newDistance;
        }
      }
    }
  
    return distances;
  }
  
  export default dijkstra;