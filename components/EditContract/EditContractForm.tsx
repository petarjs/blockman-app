import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Code,
  Group,
  Input,
  Menu,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconDots, IconMinus, IconTrash } from "@tabler/icons";
import { watch } from "fs";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import useMainContract from "../../hooks/useMainContract";
import { Contract } from "../../interfaces/Contract";
import useIpfsMutation from "../../queries/useIpfsMutation";
import useIpfsQuery from "../../queries/useIpfsQuery";
import ContractParametersForm from "./ContractParametersForm";

interface Props {
  contractIpfsData: any;
}

export default function EditContractForm({ contractIpfsData }: Props) {
  const newMethodTemplate = {
    name: "yourMethodName",
    description: "Describe what your method does",
    type: "view",
    parameters: [
      {
        name: "youParameterName",
        description: "Your parameter description",
        type: "string",
      },
    ],
  };

  const { register, control, handleSubmit, reset, trigger, setError, watch } =
    useForm({
      defaultValues: contractIpfsData ?? {
        methods: [newMethodTemplate],
      },
    });

  const { query } = useRouter();
  const { contractName } = query;
  const { mutate: saveToIpfs, isLoading } = useIpfsMutation();
  const { contract: mainContract } = useMainContract();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "methods",
  });

  async function onSubmit(data) {
    saveToIpfs(data, {
      async onSuccess(response) {
        const json = response.data.path;
        (mainContract as any).updateContractJson({
          contractName,
          json,
        });
      },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group position="apart" mb="md">
          <Title order={2} size="h1">
            Methods
          </Title>

          <Button onClick={() => append({ ...newMethodTemplate })}>
            Add new
          </Button>

          <Button type="submit" loading={isLoading}>
            Save
          </Button>
        </Group>

        <Stack>
          <Accordion variant="filled" radius="md">
            {fields.map((item, index) => (
              <Accordion.Item key={item.id} value={item.id}>
                <Accordion.Control>
                  <Group>
                    <Tooltip label="Remove method">
                      <ActionIcon size="lg" onClick={() => remove(index)}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Text weight={500}>Method</Text>
                    <Code sx={{ fontSize: "18px" }} color="violet">
                      {watch(`methods.${index}.name`)}
                    </Code>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack>
                    <Controller
                      control={control}
                      name={`methods.${index}.name`}
                      render={({ field }) => (
                        <TextInput label="Name" {...field} />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`methods.${index}.description`}
                      render={({ field }) => (
                        <Textarea label="Description" {...field} />
                      )}
                    />

                    <Controller
                      control={control}
                      name={`methods.${index}.type`}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Method type"
                          placeholder="view"
                          data={[
                            { value: "view", label: "View" },
                            { value: "change", label: "Change" },
                          ]}
                        />
                      )}
                    />

                    <ContractParametersForm
                      index={index}
                      control={control}
                      value={item}
                      watch={watch}
                    />
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Stack>
      </form>
    </>
  );
}
