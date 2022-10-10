import React, { useState, useEffect } from "react";
import Lodash from "lodash";
import "./App.css";

function App() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    getFloor(offset);
  }, []);

  var listings = [];
  var offset = 0;

  async function getFloor(offset) {
    var result = await fetch(
      "https://api-mainnet.magiceden.dev/v2/collections/aos/listings?limit=20&offset=" +
        offset
    ).then((r) => r.json());

    listings = Lodash.concat(listings, result);

    offset = offset + 20;
    if (result.length > 0) {
      getFloor(offset);
    } else {
      listings = Lodash.uniqBy(listings, "tokenMint");
      listings = Lodash.orderBy(listings, "price");
      setNfts(listings);
      console.log(listings);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          {nfts.length} SAMs still remaining
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {nfts.map((nft) => (
            <div key={nft.tokenMint}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={nft.extra.img}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <button
                    type="button"
                    className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {nft.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
