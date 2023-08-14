import { fakeListings } from "../data/fake-data";
import { db } from "../database";

// export const getAllListingsRoute = {
//     method: "GET",
//     path: "/api/listings",
//     handler: (req, h) => {
//         return fakeListings;
//     }
// };

export const getAllListingsRoute = {
    method: "GET",
    path: "/api/listings",
    handler: async (req, h) => {
        const { results } = await db.query("SELECT * FROM listings");
        return results;
    }
};