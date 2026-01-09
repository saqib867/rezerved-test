"use client";
import { useFetchListings } from "@/hooks/useFetchListings";
import { useParams } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";

export default function Listings() {
  const listings = [
    {
      id: 1,
      guests: 10,
      price: 80,
      name: "The White Abode",
      address: "33, Laxmi Palace, S V Road, r...",
      date: "15 May 2020 9:00 am",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      guests: 10,
      price: 80,
      name: "The White Abode",
      address: "33, Laxmi Palace, S V Road, r...",
      date: "15 May 2020 9:00 am",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      guests: 10,
      price: 80,
      name: "The White Abode",
      address: "33, Laxmi Palace, S V Road, r...",
      date: "15 May 2020 9:00 am",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop",
    },
  ];

  const { userId } = useParams();
  const { error, loading, reservations, hasMore, loadMore } = useFetchListings(
    userId as string
  );

  console.log("reservation => ", reservations);
  return (
    <div className="bg-slate-900 rounded-2xl p-6 max-w-2xl h-[560px] overflow-y-auto">
      {/* Header */}
      <h2 className="text-white text-2xl font-bold mb-6">Listings</h2>

      {/* Listings */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <BiLoaderCircle className="animate-spin" size={25} />
          </div>
        ) : reservations.length == 0 ? (
          <div className="flex items-center justify-center h-24">
            No Reservation Listing
          </div>
        ) : (
          reservations?.map((listing) => (
            <div
              key={listing?.id}
              className="flex items-start gap-4 bg-slate-800 bg-opacity-40 rounded-xl p-4 hover:bg-opacity-60 transition-all"
            >
              {/* Property Image */}
              <img
                src={listing?.proofImages[0]}
                alt={"proof images"}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Top row - guests and date */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-xs">
                    {listing?.noOfGuests} guests
                  </span>
                  <span className="text-slate-400 text-xs">
                    {listing?.postingDatetime?.toDate()?.toLocaleString()}
                  </span>
                </div>

                {/* Price */}
                <div className="text-white text-xl font-bold mb-1">
                  ${listing?.price}
                </div>

                {/* Property Name */}
                <h3 className="text-white font-semibold text-base mb-1">
                  {listing?.venue}
                </h3>

                {/* Address */}
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="truncate">{listing?.location}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {hasMore && reservations.length > 0 && (
          <div className="flex items-center justify-center">
            <button className="border rounded-md p-1 cursor-pointer border-gray-400">
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
