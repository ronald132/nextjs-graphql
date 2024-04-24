import dbConnect from '@/middleware/db-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import Locations from '../../mongoose/locations/model'
import { findAllLocations } from '@/mongoose/locations/services'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  //const locations = await Locations.find({})
  const locations = await findAllLocations()
  res.status(200).json(locations)
}
