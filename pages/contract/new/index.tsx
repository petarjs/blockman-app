import { Container, Text } from "@mantine/core";
import CreateContractForm from "../../../components/CreateContract/CreateContractForm";
import Navbar from "../../../components/Navbar/Navbar";

export default function NewContract() {
  return (
    <div>
      <Navbar />

      <Container mt="md">
        <CreateContractForm />
      </Container>
    </div>
  );
}
