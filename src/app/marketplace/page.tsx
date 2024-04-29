"use client";

import { ReservoirBuyButton } from "../components/reservoir/ReservoirBuyButton";
import { ReservoirCancelOrderButton } from "../components/reservoir/ReservoirCancelButton";
import {
  chainName,
  collectionContractAddress,
  reservoirApiKey,
  reservoirBaseUri,
} from "../configs/index";
import { paths } from "@reservoir0x/reservoir-sdk";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type ReservoirListing = {
  orders: any[];
  continuation?: string;
};

export default function MarketplacePage() {
  const account = useAccount();
  const [reservoirListings, setReservoirListings] = useState<
    | paths["/orders/asks/v5"]["get"]["responses"]["200"]["schema"]
    | ReservoirListing
  >({ orders: [], continuation: "" });

  useEffect(() => {
    const fetchReservoirListings = async (): Promise<
      paths["/orders/asks/v5"]["get"]["responses"]["200"]["schema"]
    > => {
      if (!collectionContractAddress) return { orders: [], continuation: "" };

      const res = await fetch(
        `${reservoirBaseUri[chainName]}orders/asks/v5?contracts=${collectionContractAddress}&status=active`,
        {
          headers: {
            "x-api-key": reservoirApiKey,
          },
        }
      );
      const data = await res.json();

      const response =
        data as paths["/orders/asks/v5"]["get"]["responses"]["200"]["schema"];
      console.log(response);
      return response;
    };

    fetchReservoirListings()
      .then((listings) => {
        setReservoirListings(listings);
      })
      .catch((err) => console.error("reservoir error", err));
  }, [collectionContractAddress]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full text-center">
        <h1 className="text-4xl font-bold">Reservoir Marketplace</h1>
        <h3 className="font-bold">
          No. of Listings: {reservoirListings?.orders?.length}
        </h3>
        <hr />
      </div>

      {reservoirListings &&
        reservoirListings.orders &&
        reservoirListings.orders.length > 0 && (
          <>
            {reservoirListings?.orders?.map((order) => (
              <div className="mt-5 mx-auto" key={order.id}>
                <div className="card mr-10">
                  <div className="card-text">
                    <h2 className="gradient-text-1">{order?.id}</h2>
                    <p>
                      Price (CRYPTO) - {order?.price?.amount?.decimal}{" "}
                      {order?.price?.currency?.symbol}
                    </p>
                    <p>Price (USD) - ${order?.price?.amount?.usd}</p>
                    <p>Seller - {order?.maker}</p>
                    <p>Token Set - {order?.tokenSetId}</p>
                    <p>Listed on - {order?.source?.name}</p>
                  </div>
                </div>
                {account &&
                  account.address &&
                  account.address.toLowerCase() !==
                    order?.maker.toLowerCase() && (
                    <>
                      {
                        // @ts-ignore
                        !wallet?.isSmartWallet && (
                          <div className="mb-5 text-center">
                            <ReservoirBuyButton
                              orderId={order.id}
                              wallet={account!}
                            />
                          </div>
                        )
                      }
                    </>
                  )}

                {account &&
                  account.address &&
                  account.address.toLowerCase() ===
                    order?.maker.toLowerCase() && (
                    <div className="mb-5 text-center">
                      <ReservoirCancelOrderButton
                        wallet={account!}
                        orderId={order?.id}
                      />
                    </div>
                  )}
              </div>
            ))}
          </>
        )}
    </div>
  );
}
