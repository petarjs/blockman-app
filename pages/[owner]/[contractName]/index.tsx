import { Button, Container, LoadingOverlay } from "@mantine/core";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import useNearContext from "../../../context/NearContext";
import useAuth from "../../../hooks/useAuth";
import useContract from "../../../hooks/useContract";
import useContractQuery from "../../../queries/useContrcatQuery";
import http from "../../../services/http";
import ipfs from "../../../services/ipfs";

const ContractForm = dynamic(
  () => import("../../../components/ContractForm/ContractForm"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const { query } = useRouter();
  const { setNetwork } = useNearContext();
  const { owner, contractName } = query;

  const { data: contractData, isLoading } = useContractQuery(
    owner as string,
    contractName as string
  );
  console.log({ contractData });

  useEffect(() => {
    if (!contractData?.network) {
      return;
    }

    setNetwork(contractData.network);
  }, [contractData?.network]);

  

  return (
    <div>
      <Navbar />

      <Container mt="md">
        {!!contractData && <ContractForm contract={contractData} />}
      </Container>
    </div>
  );
};

export default Home;
