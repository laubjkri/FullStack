import { fakeListings } from "../data/fake-data";
import Boom from "@hapi/boom";
import { db } from "../database";

// export const getListingRoute = {
//     method: "GET",
//     path: "/api/listings/{id}",
//     handler: async (req, h) => {
//         const id = req.params.id;
//         const listing = fakeListings.find(listing => listing.id === id);
//         if (!listing) throw Boom.notFound(`Listing with id ${id} does not exist.`);
//         return listing;
//     }
// };

export const getListingRoute = {
        method: "GET",
        path: "/api/listings/{id}",
        handler: async (req, h) => {
            const id = req.params.id;

            const { results } = await db.query(
                "SELECT * FROM listings WHERE id = ?", // this ? syntax prevents the use of sql injection
                [id]
            );

            const listing = results[0];
            
            if (!listing) throw Boom.notFound(`Listing with id ${id} does not exist.`);
            return listing;
        }
    };