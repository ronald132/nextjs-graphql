import { FilterLocationType, FilterWishlistType } from './custom'
import { LocationType } from './schema'
import Locations from './model'
/**
 * actual filter fucntion
 */
async function findLocations(
  filter: {} | FilterLocationType | FilterWishlistType
) {
  try {
    let result: Array<LocationType | null> = await Locations.find(filter)
    return result as unknown as LocationType
  } catch (err) {
    console.error(err)
  }
  return []
}

export async function findAllLocations() {
  let filter = {}
  return (await findLocations(filter)) as unknown as LocationType
}

export async function findLocationsById(location_ids: string[]) {
  let filter: FilterLocationType = { location_id: location_ids }
  return (await findLocations(filter)) as unknown as LocationType
}

export async function onUserWishlist(user_id: string) {
  let filter: FilterWishlistType = {
    on_wishlist: {
      $in: [user_id],
    },
  }
  return (await findLocations(filter)) as unknown as LocationType
}

export async function updateWishlist(
  location_id: string,
  user_id: string,
  action: string
) {
  let filter = { location_id: location_id }
  let options = { upsert: true }
  let update = {}

  switch (action) {
    case 'add':
      update = { $push: { on_wishlist: user_id } }
      break
    case 'remove':
      update = { $pull: { on_wishlist: user_id } }
      break
  }

  try {
    let result: LocationType | null = await Locations.findOneAndUpdate(
      filter,
      update,
      options
    )
    return result
  } catch (err) {}
}
