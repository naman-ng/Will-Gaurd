import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useSigner,
} from "wagmi";
import LegacyAddModal from "../../components/legacyAddModal";
import CheckIn from "../../components/checkIn";
import LegacyList from "../../components/legacyList";
import React, { useState, useEffect } from "react";

import {
  contractConfig,
  contractAddress,
  contractAbi,
} from "../../utils/constants";
import { Header } from "../../components/header";

const index = () => {
  const { address, isConnected } = useAccount();
  const { data: signerData } = useSigner();
  const [loading, setLoading] = useState(false);
  const [legacyCount, setLegacyCount] = useState(0);

  const { data: legacyCountData } = useContractRead({
    ...contractConfig,
    functionName: "legacyCount",
    args: [address],
  });

  useEffect(() => {
    console.log("LOGS");
    console.log("Legacy Count:", legacyCountData?.toString());

    console.log("___________");
  }, []);

  useEffect(() => {
    if (!legacyCountData) return;
    setLegacyCount(legacyCountData.toNumber());
  }, [legacyCountData]);

  return (
    <div className="h-screen flex flex-col bg-fblack">
      <Header />
      <div></div>
      <hr></hr>
      <main className="flex flex-col items-center justify-center grow mx-5">
        {isConnected ? (
          <>
            {address && legacyCount > 0 && <CheckIn />}

            <h2 className="text-white text-3xl font-semibold max-w-50 justify-center">
              Register your beneficiary
            </h2>

            <p className="text-xl mt-2 text-gray-400 border-b-2 border-gray-300 pb-3 justify-center">
              Schedule automatic payouts to accounts of your choice as your will
              or as a fall back.
            </p>

            <div className="grid grid-cols-6 grid-row-flow gap-4 w-full mx-auto mt-5 ml-5 justify-items-center">
              <h3 className="font-semibold text-white">Token</h3>
              <h3 className="font-semibold text-white">Beneficiary</h3>
              <h3 className="font-semibold text-white">Amount</h3>
              <h3 className="font-semibold text-white">Token ID</h3>
              <h3 className="font-semibold text-white">Type</h3>
              <h3 className="font-semibold text-white">Delete</h3>
            </div>

            {isConnected && address && <LegacyList />}

            <div>
              <LegacyAddModal />
            </div>
          </>
        ) : (
          <>
            <p className="text-white">Please Connect Wallet</p>
          </>
        )}
      </main>
    </div>
  );
};

export default index;
