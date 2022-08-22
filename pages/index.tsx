import { Button, Container } from "@mantine/core";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import useNearContext from "../context/NearContext";
import useContract from "../hooks/useContract";
import http from "../services/http";
import ipfs from "../services/ipfs";

const ContractForm = dynamic(
  () => import("../components/ContractForm/ContractForm"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const { contract } = useContract("rock-paper-scissors-v3.petarjs.testnet", [
    {
      name: "getGameByPin",
      type: "view",
    },
    {
      name: "createGame",
      type: "change",
    },
  ]);

  const { contract: contract2 } = useContract(
    "dev-1660931771342-13140308559008",
    [
      {
        name: "getContract",
        type: "view",
      },
      {
        name: "createContract",
        type: "change",
      },
      {
        name: "updateContractJson",
        type: "change",
      },
    ]
  );

  async function change() {
    // if (!contract2) {
    //   return;
    // }
    // const r = await (contract2 as any).updateContractJson({
    //   contractName: "dev-1660931771342-13140308559008",
    //   json: "123",
    // });
    // const r = await (contract2 as any).createContract({
    //   network: "testnet",
    //   contractName: "dev-1660931771342-13140308559008",
    //   description: "Contract to save info about contracts",
    //   json: "",
    // });
    // console.log({ r });
  }

  async function view() {
    if (!contract2) {
      return;
    }

    const r = await (contract2 as any).getContract({
      owner: "petarjs.testnet",
      contractName: "dev-1660931771342-13140308559008",
    });
    console.log({ r });
  }
  // async function change() {
  //   if (!contract) {
  //     return;
  //   }
  //   const r = await (contract as any).createGame({ gamePin: "1222222" });
  //   console.log({ r });
  // }

  // async function view() {
  //   if (!contract) {
  //     return;
  //   }

  //   const r = await (contract as any).getGameByPin({ gamePin: "1222222" });
  //   console.log({ r });
  // }

  // useEffect(() => {
  //   async function main() {
  //     const res = await http.post("/api/ipfs/set", { test: "info" });
  //     http.post("/api/ipfs/get", { path: res.data.path });
  //   }

  //   main();
  // }, []);

  return (
    <div>
      <Navbar />

      <Container>
        <ContractForm />
        <Button color="gradient" onClick={change}>
          Call!
        </Button>
        <Button color="gradient" onClick={view}>
          View
        </Button>
      </Container>
    </div>
  );
};

export default Home;
