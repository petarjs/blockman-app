import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Code,
  Group,
  Menu,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons";
import { Controller, useFieldArray } from "react-hook-form";

export default function ContractParametersForm({
  update,
  index,
  value,
  control,
  watch,
}: any) {
  const newParameterTemplate = {
    name: "yourParameterName",
    description: "Your parameter description",
    type: "string",
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: `methods.${index}.parameters`,
  });

  return (
    <Stack>
      <Group position="apart" mb="md">
        <Title order={3} size="h3">
          Parameters
        </Title>

        <Button onClick={() => append({ ...newParameterTemplate })}>
          Add new
        </Button>
      </Group>

      <Accordion variant="filled" radius="md">
        {fields.map((item, paramIndex) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Control>
              <Group>
                <Tooltip label="Remove method">
                  <ActionIcon size="lg" onClick={() => remove(index)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip>
                <Text weight={500}>Parameter</Text>
                <Code sx={{ fontSize: "18px" }} color="violet">
                  {watch(`methods.${index}.parameters.${paramIndex}.name`)}
                </Code>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack key={index} mt="sm">
                <Controller
                  control={control}
                  name={`methods.${index}.parameters.${paramIndex}.name`}
                  render={({ field }) => (
                    <TextInput label="Parameter Name" {...field} />
                  )}
                />

                <Controller
                  control={control}
                  name={`methods.${index}.parameters.${paramIndex}.description`}
                  render={({ field }) => (
                    <Textarea label="Parameter Description" {...field} />
                  )}
                />

                <Controller
                  control={control}
                  name={`methods.${index}.parameters.${paramIndex}.type`}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Parameter type"
                      placeholder="E.g. String"
                      data={[
                        { value: "string", label: "String" },
                        { value: "number", label: "Number" },
                      ]}
                    />
                  )}
                />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
}
