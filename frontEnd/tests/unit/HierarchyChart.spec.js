import { shallowMount } from '@vue/test-utils'
import HierarchyChart from '@/components/HierarchyChart.vue'

import * as d3 from 'd3';

describe('HierarchyChart.vue', () => {
  it('renders props.data when passed', () => {
    const data = { "name": "A", "description": "This is a description of A", "children": [ { "name": "B", "description": "This is a description of B", "children": [ { "name": "B-1", "description": "This is a description of B-1" }, { "name": "B-2", "description": "This is a description of B-2" }, { "name": "B-3", "description": "This is a description of B-3" } ] }, { "name": "C", "description": "This is a description of C", "children": [] }, { "name": "D", "description": "This is a description of D", "children": [] } ] }
    const wrapper = shallowMount(HierarchyChart, {
      props: { data }
    })
    const d = d3.selectAll('svg')
    expect(d).toBeTruthy()
    expect(wrapper.vm.data).toStrictEqual(data)
  })
})
   
