import mongoose, { model } from 'mongoose'
import { LocationSchema, LocationType } from './schema'

// create and export the LocationModel
// return from cache or create a new one
// locations maps to the collection name on the database
export default mongoose.models.locations ||
  model<LocationType>('locations', LocationSchema)
