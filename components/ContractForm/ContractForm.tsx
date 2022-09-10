import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Input,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconExternalLink,
  IconLink,
  IconRocket,
} from "@tabler/icons";
import { utils } from "near-api-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { getNearConfig, NEAR_ENV } from "../../config/near";
import useNearContext from "../../context/NearContext";
import useAuth from "../../hooks/useAuth";
import useContract from "../../hooks/useContract";
import {
  Contract,
  ContractJson,
  ContractMethod,
  ContractMethodParameter,
} from "../../interfaces/Contract";
import useContractCallMutation from "../../queries/useContractCallMutation";
import useIpfsMutation from "../../queries/useIpfsMutation";
import useIpfsQuery from "../../queries/useIpfsQuery";
import { useContractStore } from "../../stores/contractStore";
import ContractHeader from "../Contract/ContractHeader";
import ContractMethodForm from "./ContractMethodForm";
import ContractMethodResponse from "./ContractMethodResponse";

interface ContractMethodSelectItemProps {
  name: string;
  description: string;
}
const ContractMethodSelectItem = forwardRef<
  HTMLDivElement,
  ContractMethodSelectItemProps
>(function ContractMethodItem(
  { name, description, ...others }: ContractMethodSelectItemProps,
  ref
) {
  return (
    <div ref={ref} {...others}>
      <Stack spacing="xs">
        <Text weight="bold" underline>
          {name}
        </Text>
        <Text>{description}</Text>
      </Stack>
    </div>
  );
});

interface Props {
  contract: Contract;
}
export default function ContractForm({ contract }: Props) {
  const { accountId } = useAuth();
  const { query, push } = useRouter();
  const { owner, contractName } = query;

  const [selectedMethod, setSelectedMethod] = useState<ContractMethod>();
  const form = useForm();

  const { mutate } = useIpfsMutation();
  const { data: contractJson } = useIpfsQuery<ContractJson>(contract.json);

  const { contract: userContract } = useContract(
    contract.name,
    contractJson?.methods
  );

  const { mutate: mutateContractCall, data: contractCallResponse } =
    useContractCallMutation(userContract);

  useEffect(() => {
    // mutate({
    //   methods: [
    //     {
    //       type: "view",
    //       name: "getContract",
    //       description: "Get contract documentation",
    //       parameters: [
    //         {
    //           type: "string",
    //           name: "owner",
    //           description:
    //             "Name of the account that created the contract documentation",
    //         },
    //         {
    //           type: "string",
    //           name: "contractName",
    //           description: "Name of the contract",
    //         },
    //       ],
    //     },
    //     {
    //       type: "change",
    //       name: "updateContractJson",
    //       description:
    //         "Update contract IPFS hash that points to its json metadata",
    //       parameters: [
    //         {
    //           type: "string",
    //           name: "contractName",
    //           description: "Name of the contract",
    //         },
    //         {
    //           type: "string",
    //           name: "json",
    //           description: "IPFS hash of json metadata",
    //         },
    //       ],
    //     },
    //   ],
    // });
  }, []);

  useEffect(() => {
    form.reset();
  }, [selectedMethod, form]);

  function selectMethodByName(methodName: string) {
    setSelectedMethod(contractJson?.methods.find((m) => m.name === methodName));
  }

  async function onSubmit(
    data: Record<"data" | "meta", Record<string, string>>
  ) {
    console.log(data);
    if (!selectedMethod) {
      return;
    }

    const params =
      selectedMethod.type === "change" ? { args: data.data } : data.data;

    if (selectedMethod.type === "change") {
      const gasUnit = data.meta.gasUnit;
      const attachedDepositUnit = data.meta.attachedDepositUnit;
      const gas = data.meta.gas;
      const attachedDeposit = data.meta.attachedDeposit;
      const calculatedGas =
        gasUnit === "NEAR" ? utils.format.parseNearAmount(gas) : gas;
      const calculatedAttachedDeposit =
        attachedDepositUnit === "NEAR"
          ? utils.format.parseNearAmount(attachedDeposit)
          : attachedDeposit;
      // const response = await (userContract as any)[selectedMethod.name]?.(
      //   params,
      //   calculatedGas,
      //   calculatedAttachedDeposit
      // );
      // console.log({ response });

      mutateContractCall({
        type: selectedMethod.type,
        method: selectedMethod.name,
        params,
        gas: calculatedGas,
        deposit: calculatedAttachedDeposit,
      } as any);
    } else {
      // const response = await (userContract as any)[selectedMethod.name]?.(
      //   params
      //   );
      //   console.log({ response });

      mutateContractCall({
        type: selectedMethod.type,
        method: selectedMethod.name,
        params,
      } as any);
    }
  }

  const isOwner = accountId === owner;

  return (
    <Stack>
      <Group>
        <ContractHeader contract={contract} />
        {isOwner && (
          <Group>
            <Button onClick={() => push(`/${owner}/${contractName}/edit`)}>
              Edit
            </Button>
          </Group>
        )}
      </Group>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Group position="apart" grow>
          <Container size="sm" ml={0} p={0} sx={{ maxWidth: "70%" }}>
            <Grid gutter={0}>
              <Grid.Col span={7}>
                <Input
                  readOnly
                  defaultValue={contract.name}
                  width={500}
                  icon={<IconRocket size={16} />}
                  placeholder="Contract name / address"
                  styles={{
                    input: {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  }}
                />
              </Grid.Col>
              <Grid.Col span={5}>
                {contractJson && (
                  <Select
                    styles={{
                      input: {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      },
                    }}
                    placeholder="Method name"
                    data={contractJson.methods.map(
                      ({ name, description, type }) => ({
                        value: name,
                        label: name,
                        name,
                        description,
                        group: type,
                      })
                    )}
                    searchable
                    nothingFound="Cannot find that method"
                    itemComponent={ContractMethodSelectItem}
                    onChange={selectMethodByName}
                  />
                )}
              </Grid.Col>
            </Grid>
          </Container>

          <Button type="submit" sx={{ flexGrow: 0 }}>
            Send
          </Button>
        </Group>

        <Group mt="md">
          {!!selectedMethod && (
            <ContractMethodForm method={selectedMethod} form={form} />
          )}
        </Group>

        <Group mt="md">
          {!!selectedMethod && !!contractCallResponse && (
            <ContractMethodResponse response={contractCallResponse} />
          )}
        </Group>
      </form>
    </Stack>
  );
}
