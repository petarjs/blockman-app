import {
  Button,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { NEAR_ENV } from "../../config/near";
import useNearContext from "../../context/NearContext";
import useCreateContractMutation, {
  CreateContractVariables,
} from "../../queries/useCreateContractMutation";

export default function CreateContractForm() {
  const networks = [NEAR_ENV.TESTNET, NEAR_ENV.MAINNET];

  const { push } = useRouter();
  const { accountId } = useNearContext();

  const { mutate: createContract, isLoading } = useCreateContractMutation();

  const form = useForm({
    defaultValues: {
      contractName: "",
      network: NEAR_ENV.TESTNET,
      description: "",
    },
  });

  async function onSubmit(data: Omit<CreateContractVariables, "redirectUrl">) {
    createContract({
      ...data,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${accountId}/${data.contractName}/edit`,
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack>
        <Controller
          name="network"
          control={form.control}
          render={({ field }) => (
            <Select
              {...field}
              data={networks}
              label="Network"
              withAsterisk
              placeholder="Select NEAR network"
            />
          )}
        />

        <Controller
          name="contractName"
          control={form.control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="Contract name"
              label="Contract name"
              withAsterisk
            />
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Contract description"
              label="Contract description"
            />
          )}
        />

        <Button type="submit" loading={isLoading}>
          Create
        </Button>
      </Stack>
    </form>
  );
}
