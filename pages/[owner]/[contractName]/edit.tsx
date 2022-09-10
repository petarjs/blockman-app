import { Container, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import ContractHeader from "../../../components/Contract/ContractHeader";
import EditContractForm from "../../../components/EditContract/EditContractForm";
import Navbar from "../../../components/Navbar/Navbar";
import useNearContext from "../../../context/NearContext";
import useContractQuery from "../../../queries/useContrcatQuery";
import useIpfsQuery from "../../../queries/useIpfsQuery";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { setNetwork } = useNearContext();

  const { owner, contractName } = query;

  const { data: contractData, isLoading } = useContractQuery(
    owner as string,
    contractName as string
  );

  const { data: contractIpfsData } = useIpfsQuery(contractData?.json!, {
    enabled: !!contractData?.json,
  });

  return (
    <div>
      <Navbar />

      <Container mt="md">
        <Text>
          {!!contractData && <ContractHeader contract={contractData} />}

          {!!contractIpfsData && (
            <EditContractForm contractIpfsData={contractIpfsData} />
          )}
        </Text>
      </Container>
    </div>
  );
};

export default Home;
