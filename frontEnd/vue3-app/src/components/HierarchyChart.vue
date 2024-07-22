<template>
    <div class="chart" ref="treeContainer"></div>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3';

export default {
    name: 'D3Tree',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.createTree();
    },
    methods: {
    createTree() {
        const width = 600;
        const height = 500;
        const margin = { top: 20, right: 90, bottom: 30, left: 90 };

        const svg = d3.select(this.$refs.treeContainer)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const root = d3.hierarchy(this.data);
        const treeLayout = d3.tree().size([height, width]);

        root.x0 = height / 2;
        root.y0 = 0;

        let i = 0;

        const update = (source) => {
            const treeData = treeLayout(root);
            const nodes = treeData.descendants();
            const links = treeData.descendants().slice(1);

            nodes.forEach(d => { d.y = d.depth * 180; });

            const node = svg.selectAll('g.node')
                .data(nodes, d => d.id || (d.id = ++i));

            const nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr('transform', d => `translate(${source.y0},${source.x0})`)
                .on('click', (event, d) => {
                    this.$store.commit('update_node',d);
                    this.$emit('selected-node', d.data);
                    update(d);
                });

            nodeEnter.append('rect')
                .attr('class', 'node')
                .attr('width', 50)
                .attr('height', 50)
                .attr('y', d => d.children || d._children ? -25 : -25);

            nodeEnter.append('text')
                .attr('dy', '.35em')
                .attr('x', d => d.children || d._children ? 20 : 20)
                .attr('y', d => d.children || d._children ? 0 : 0)
                .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
                .text(d => d.data.name);

            const nodeUpdate = nodeEnter.merge(node);

            nodeUpdate.transition()
                .duration(200)
                .attr('transform', d => `translate(${d.y},${d.x})`)

            nodeUpdate.select('rect.node')
                .attr('cursor', 'pointer')
                .style('fill', d => this.$store.state.selectedNode && d.data.name === this.$store.state.selectedNode.data.name?'orange':'lightblue');

            const nodeExit = node.exit().transition()
                .duration(200)
                .attr('transform', d => `translate(${source.y},${source.x})`)
                .remove();

            nodeExit.select('rect')
                .attr('r', 1e-6)

            nodeExit.select('text')
                .style('fill-opacity', 1e-6);

            const link = svg.selectAll('path.link')
                .data(links, d => d.id);

            const linkEnter = link.enter().insert('path', 'g')
                .attr('class', 'link')
                .attr('d', d => {
                    const o = { x: source.x0, y: source.y0 };
                    return diagonal(o, o);
                });   

            const linkUpdate = linkEnter.merge(link);

            linkUpdate.transition()
                .duration(200)
                .attr('d', d => diagonal(d, d.parent));

            const linkExit = link.exit().transition()
                .duration(200)
                .attr('d', d => {
                    const o = { x: source.x, y: source.y };
                    return diagonal(o, o);
                })
                .remove();

            nodes.forEach(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            function diagonal(s, d) {
                return `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`;
            }
        };

        update(root);
    }
}
  };
</script>

<style scoped>
.chart>>>.node rect {
    fill: #0fa74e;
    stroke: rgb(36, 41, 44);
    stroke-width: 2px;
}

.chart>>>.node text {
    font: 12px sans-serif;
}

.chart>>>.link {
    fill: none;
    stroke: #ccc;
    stroke-width: 2px;
}
</style>