<template>
    <div>
      <h1>Hierarchy</h1>
      {{ items }}
      <ul>
        <li v-for="item in items.items" :key="item.name">
          <strong>{{ item.name }}</strong>: {{ item.description }}
          <ul v-if="item.children && item.children.length > 0">
            <li v-for="child in item.children" :key="child.name">
              <strong>{{ child.name }}</strong>: {{ child.description }}
              <ul v-if="child.children && child.children.length > 0">
                <li v-for="grandChild in child.children" :key="grandChild.name">
                  <strong>{{ grandChild.name }}</strong>: {{ grandChild.description }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useQuery } from '@vue/apollo-composable';
  import gql from "graphql-tag"
  
  const GET_ITEMS =gql`
    query GetItems {
      items {
        name
        description
        children {
          name
          description
          children {
            name
            description
          }
        }
      }
    }
  `;
  
  export default {
    setup() {
      const { result, loading, error } = useQuery(GET_ITEMS);
  
      return {
        items: result,
        loading,
        error,
      };
    },
  };
  </script>