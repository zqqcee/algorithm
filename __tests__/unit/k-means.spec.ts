import { kMeans } from '../../packages/graph/src'
import propertiesGraphData from '../data/cluster-origin-properties-data.json';
import { Graph } from "@antv/graphlib";
import { dataPropertiesTransformer, dataLabelDataTransformer } from '../utils/data';


describe('kMeans abnormal demo', () => {
    it('no properties demo: ', () => {
        const noPropertiesData = {
            nodes: [
                {
                    id: 'node-0',
                    data: {},
                },
                {
                    id: 'node-1',
                    data: {},
                },
                {
                    id: 'node-2',
                    data: {},
                },
                {
                    id: 'node-3',
                    data: {},
                }
            ],
        }
        const graph = new Graph(noPropertiesData);
        const { clusters, clusterEdges } = kMeans(graph, 2);
        expect(clusters.length).toBe(1);
        expect(clusterEdges.length).toBe(0);
    });
});


describe('kMeans normal demo', () => {
    it('simple data demo: ', () => {
        const simpleGraphData = {
            nodes: [
                {
                    id: 'node-0',
                    properties: {
                        amount: 10,
                        city: '10001',
                    }
                },
                {
                    id: 'node-1',
                    properties: {
                        amount: 10000,
                        city: '10002',
                    }
                },
                {
                    id: 'node-2',
                    properties: {
                        amount: 3000,
                        city: '10003',
                    }
                },
                {
                    id: 'node-3',
                    properties: {
                        amount: 3200,
                        city: '10003',
                    }
                },
                {
                    id: 'node-4',
                    properties: {
                        amount: 2000,
                        city: '10003',
                    }
                }
            ],
            edges: [
                {
                    id: 'edge-0',
                    source: 'node-0',
                    target: 'node-1',
                },
                {
                    id: 'edge-1',
                    source: 'node-0',
                    target: 'node-2',
                },
                {
                    id: 'edge-4',
                    source: 'node-3',
                    target: 'node-2',
                },
                {
                    id: 'edge-5',
                    source: 'node-2',
                    target: 'node-1',
                },
                {
                    id: 'edge-6',
                    source: 'node-4',
                    target: 'node-1',
                },
            ]
        }
        const data = dataPropertiesTransformer(simpleGraphData);
        const graph = new Graph(data);
        const { clusters, nodeToCluster } = kMeans(graph, 3);
        expect(clusters.length).toBe(3);
        const nodes = graph.getAllNodes();


        expect(nodeToCluster.get(nodes[2].id)).toEqual(nodeToCluster.get(nodes[3].id));
        expect(nodeToCluster.get(nodes[2].id)).toEqual(nodeToCluster.get(nodes[4].id));
    });


    it('complex data demo: ', () => {
        const data = dataLabelDataTransformer(propertiesGraphData);
        const graph = new Graph(data);
        const { clusters,nodeToCluster } = kMeans(graph, 3);
        expect(clusters.length).toBe(3);
        const nodes = graph.getAllNodes();
        expect(nodeToCluster.get(nodes[0].id)).toEqual(nodeToCluster.get(nodes[1].id));
        expect(nodeToCluster.get(nodes[0].id)).toEqual(nodeToCluster.get(nodes[2].id));
        expect(nodeToCluster.get(nodes[0].id)).toEqual(nodeToCluster.get(nodes[3].id));
        expect(nodeToCluster.get(nodes[0].id)).toEqual(nodeToCluster.get(nodes[4].id));
        expect(nodeToCluster.get(nodes[5].id)).toEqual(nodeToCluster.get(nodes[6].id));
        expect(nodeToCluster.get(nodes[5].id)).toEqual(nodeToCluster.get(nodes[7].id));
        expect(nodeToCluster.get(nodes[5].id)).toEqual(nodeToCluster.get(nodes[8].id));
        expect(nodeToCluster.get(nodes[5].id)).toEqual(nodeToCluster.get(nodes[9].id));
        expect(nodeToCluster.get(nodes[5].id)).toEqual(nodeToCluster.get(nodes[10].id));
        expect(nodeToCluster.get(nodes[11].id)).toEqual(nodeToCluster.get(nodes[12].id));
        expect(nodeToCluster.get(nodes[11].id)).toEqual(nodeToCluster.get(nodes[13].id));
        expect(nodeToCluster.get(nodes[11].id)).toEqual(nodeToCluster.get(nodes[14].id));
        expect(nodeToCluster.get(nodes[11].id)).toEqual(nodeToCluster.get(nodes[15].id));
        expect(nodeToCluster.get(nodes[11].id)).toEqual(nodeToCluster.get(nodes[16].id));
    });

    it('demo use involvedKeys: ', () => {
        const simpleGraphData = {
            nodes: [
                {
                    id: 'node-0',
                    properties: {
                        amount: 10,
                        city: '10001',
                    }
                },
                {
                    id: 'node-1',
                    properties: {
                        amount: 10000,
                        city: '10002',
                    }
                },
                {
                    id: 'node-2',
                    properties: {
                        amount: 3000,
                        city: '10003',
                    }
                },
                {
                    id: 'node-3',
                    properties: {
                        amount: 3200,
                        city: '10003',
                    }
                },
                {
                    id: 'node-4',
                    properties: {
                        amount: 2000,
                        city: '10003',
                    }
                }
            ],
            edges: [
                {
                    id: 'edge-0',
                    source: 'node-0',
                    target: 'node-1',
                },
                {
                    id: 'edge-1',
                    source: 'node-0',
                    target: 'node-2',
                },
                {
                    id: 'edge-4',
                    source: 'node-3',
                    target: 'node-2',
                },
                {
                    id: 'edge-5',
                    source: 'node-2',
                    target: 'node-1',
                },
                {
                    id: 'edge-6',
                    source: 'node-4',
                    target: 'node-1',
                },
            ]
        }
        const data = dataPropertiesTransformer(simpleGraphData);
        const involvedKeys = ['amount'];
        const graph = new Graph(data);
        const { clusters ,nodeToCluster} = kMeans(graph, 3, involvedKeys);
        expect(clusters.length).toBe(3);
        const nodes = graph.getAllNodes();
        expect(nodeToCluster.get(nodes[2].id)).toEqual(nodeToCluster.get(nodes[3].id));
        expect(nodeToCluster.get(nodes[2].id)).toEqual(nodeToCluster.get(nodes[4].id));
    });

    it('demo use uninvolvedKeys: ', () => {
        const simpleGraphData = {
            nodes: [
                {
                    id: 'node-0',
                    properties: {
                        amount: 10,
                        city: '10001',
                    }
                },
                {
                    id: 'node-1',
                    properties: {
                        amount: 10000,
                        city: '10002',
                    }
                },
                {
                    id: 'node-2',
                    properties: {
                        amount: 3000,
                        city: '10003',
                    }
                },
                {
                    id: 'node-3',
                    properties: {
                        amount: 3200,
                        city: '10003',
                    }
                },
                {
                    id: 'node-4',
                    properties: {
                        amount: 2000,
                        city: '10003',
                    }
                }
            ],
            edges: [
                {
                    id: 'edge-0',
                    source: 'node-0',
                    target: 'node-1',
                },
                {
                    id: 'edge-1',
                    source: 'node-0',
                    target: 'node-2',
                },
                {
                    id: 'edge-4',
                    source: 'node-3',
                    target: 'node-2',
                },
                {
                    id: 'edge-5',
                    source: 'node-2',
                    target: 'node-1',
                },
                {
                    id: 'edge-6',
                    source: 'node-4',
                    target: 'node-1',
                },
            ]
        }
        const data = dataPropertiesTransformer(simpleGraphData);
        const graph = new Graph(data);
        const uninvolvedKeys = ['id', 'city'];
        const { clusters,nodeToCluster } = kMeans(graph, 3, [], uninvolvedKeys);
        expect(clusters.length).toBe(3);
        const nodes = graph.getAllNodes(); data
        expect(nodeToCluster.get(nodes[2].id)).toEqual(nodeToCluster.get(nodes[3].id));
        expect(nodeToCluster.get(nodes[2].id)).toEqual(nodeToCluster.get(nodes[4].id));
    });

});

describe('kMeans All properties values are numeric demo', () => {
    it('all properties values are numeric demo: ', () => {
        const allPropertiesValuesNumericData = {
            nodes: [
                {
                    id: 'node-0',
                    properties: {
                        max: 1000000,
                        mean: 900000,
                        min: 800000,
                    }
                },
                {
                    id: 'node-1',
                    properties: {
                        max: 1600000,
                        mean: 1100000,
                        min: 600000,
                    }
                },
                {
                    id: 'node-2',
                    properties: {
                        max: 5000,
                        mean: 3500,
                        min: 2000,
                    }
                },
                {
                    id: 'node-3',
                    properties: {
                        max: 9000,
                        mean: 7500,
                        min: 6000,
                    }
                }
            ],
            edges: [],
        }
        const data = dataPropertiesTransformer(allPropertiesValuesNumericData);
        const graph = new Graph(data);
        const { clusters, clusterEdges,nodeToCluster } = kMeans(graph, 2);
        expect(clusters.length).toBe(2);
        expect(clusterEdges.length).toBe(0);
        const nodes = graph.getAllNodes();
        expect(nodeToCluster.get(nodes[0].id)).toEqual(nodeToCluster.get(nodes[1].id));
        expect(nodeToCluster.get(nodes[2].id)).toEqual(nodeToCluster.get(nodes[3].id));
    });
    it('only one property and the value are numeric demo: ', () => {
        const allPropertiesValuesNumericData = {
            nodes: [
                {
                    id: 'node-0',
                    properties: {
                        num: 10,
                    }
                },
                {
                    id: 'node-1',
                    properties: {
                        num: 12,
                    }
                },
                {
                    id: 'node-2',
                    properties: {
                        num: 56,
                    }
                },
                {
                    id: 'node-3',
                    properties: {
                        num: 300,
                    }
                },
                {
                    id: 'node-4',
                    properties: {
                        num: 350,
                    }
                }
            ],
            edges: [],
        }
        const data = dataPropertiesTransformer(allPropertiesValuesNumericData);
        const graph = new Graph(data);
        const { clusters, clusterEdges,nodeToCluster } = kMeans(graph, 2);
        expect(clusters.length).toBe(2);
        expect(clusterEdges.length).toBe(0);
        const nodes = graph.getAllNodes();
        expect(nodeToCluster.get(nodes[0].id)).toEqual(nodeToCluster.get(nodes[1].id));
        expect(nodeToCluster.get(nodes[0].id)).toEqual(nodeToCluster.get(nodes[2].id));
        expect(nodeToCluster.get(nodes[3].id)).toEqual(nodeToCluster.get(nodes[4].id));
    });

});

