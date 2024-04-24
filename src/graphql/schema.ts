import gql from 'graphql-tag'
import locationTypeDefsCustom from './locations/custom.gql'
import locationTypeDefsQueries from './locations/queries.gql'
import locationTypeDefsMutations from './locations/mutations.gql'

export const typeDefs = gql`

  ${locationTypeDefsCustom}
  
  type Query {
    ${locationTypeDefsQueries}
  }

  type Mutation {
    ${locationTypeDefsMutations}
  }
`
