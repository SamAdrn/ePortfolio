def findMinimumTime(centre_nodes, centre_from, centre_to, status):
    graph = [[0] * centre_nodes for _ in range(centre_nodes)]

    for i in range(0, len(centre_from)):
        graph[centre_from[i] - 1][centre_to[i] - 1] = 1
        graph[centre_to[i] - 1][centre_from[i] - 1] = 1

    pgraph(graph)

    deficientCentres = []
    for i in range(0, centre_nodes):
        if (status[i] == 1):
            deficientCentres.append(i)
    steps = [0] * centre_nodes

    # print(deficientCentres)

    for node in range(0, centre_nodes):
        if (status[node] == 3):
            steps = bfs(graph, node, steps, deficientCentres)

    # print(steps)




def bfs(graph, node, steps, deficientCentres):
    print('bfs')
    vis = [node]
    queue = [node]
    depth = 1
    lastStartNode = node

    while queue:
        cur = queue.pop(0)

        if (lastStartNode not in graph[cur]):
            depth += 1
            lastStartNode = cur

        print(f"cur: {cur}, depth: {depth}")
        print(deficientCentres)
        print(queue)
        print(vis)
        print()

        if (cur in deficientCentres):
            if (steps[cur] == 0):
                steps[cur] = depth
            else:
                steps[cur] = min(depth, steps[cur])

        for n in graph[cur]:
            if (n not in vis):
                vis.append(n)
                queue.append(n)
                print(queue)

    return steps


def pgraph(graph):
    for i in range(0, len(graph)):
        print(graph[i])


findMinimumTime(6,
                [1, 1, 1, 2, 3, 3, 5, 4],
                [2, 4, 3, 4, 4, 5, 6, 6],
                [3, 2, 3, 1, 2, 1])
