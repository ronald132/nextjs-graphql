import { locationMutations } from './locations/mutations'
import { locationQueries } from './locations/queries'

export const resolvers = {
  Query: {
    ...locationQueries,
  },
  Mutation: {
    ...locationMutations,
  },
}
