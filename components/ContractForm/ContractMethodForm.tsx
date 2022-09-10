import {
  Badge,
  Code,
  Group,
  Input,
  SegmentedControl,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  ContractMethod,
  ContractMethodParameter,
} from "../../interfaces/Contract";

interface Props {
  method: ContractMethod;
  form: UseFormReturn;
}

export default function ContractMethodForm({ method, form }: Props) {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stack>
        <Group spacing="sm" align="center">
          <Title size="h1">{method.name}</Title>
          <Badge variant="dot" size="lg" mt={5}>
            {method.type}
          </Badge>
        </Group>
        <Text italic lineClamp={2}>
          {method.description}
        </Text>
      </Stack>
      <Tabs defaultValue="Data" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="Data" key="Data">
            Data
          </Tabs.Tab>
          {method.type === "change" && (
            <Tabs.Tab value="Meta" key="Meta">
              Meta
            </Tabs.Tab>
          )}
        </Tabs.List>
        <Tabs.Panel value="Data">
          <Table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {method.parameters.map((methodParameter, index) => (
                <tr key={index}>
                  <td>
                    <Code>{methodParameter.name}</Code>
                  </td>
                  <td>
                    <Group>
                      <Badge>{methodParameter.type}</Badge>
                      <Controller
                        defaultValue={""}
                        control={form.control}
                        name={`data.${methodParameter.name}`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder={methodParameter.name}
                          />
                        )}
                      />
                    </Group>
                  </td>
                  <td>{methodParameter.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tabs.Panel>

        {method.type === "change" && (
          <Tabs.Panel value="Meta">
            <Table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Code>gas</Code>
                  </td>
                  <td>
                    <Group>
                      <Badge>number</Badge>
                      <Controller
                        defaultValue={""}
                        control={form.control}
                        name={`meta.gas`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="gas"
                            rightSectionWidth={135}
                            rightSection={
                              <Controller
                                defaultValue={"NEAR"}
                                control={form.control}
                                name={`meta.gasUnit`}
                                render={({ field }) => (
                                  <SegmentedControl
                                    {...field}
                                    size="xs"
                                    transitionDuration={200}
                                    transitionTimingFunction="linear"
                                    data={[
                                      { label: "NEAR", value: "NEAR" },
                                      {
                                        label: "yoctoNEAR",
                                        value: "yoctoNEAR",
                                      },
                                    ]}
                                  />
                                )}
                              />
                            }
                          />
                        )}
                      />
                    </Group>
                  </td>
                  <td>Attach gas with your contract call</td>
                </tr>

                <tr>
                  <td>
                    <Code>attachedDeposit</Code>
                  </td>
                  <td>
                    <Group>
                      <Badge>number</Badge>
                      <Controller
                        defaultValue={""}
                        control={form.control}
                        name={`meta.attachedDeposit`}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="attachedDeposit"
                            rightSectionWidth={135}
                            rightSection={
                              <Controller
                                defaultValue={"NEAR"}
                                control={form.control}
                                name={`meta.attachedDepositUnit`}
                                render={({ field }) => (
                                  <SegmentedControl
                                    {...field}
                                    size="xs"
                                    transitionDuration={200}
                                    transitionTimingFunction="linear"
                                    data={[
                                      { label: "NEAR", value: "NEAR" },
                                      {
                                        label: "yoctoNEAR",
                                        value: "yoctoNEAR",
                                      },
                                    ]}
                                  />
                                )}
                              />
                            }
                          />
                        )}
                      />
                    </Group>
                  </td>
                  <td>Attach NEAR with your contract call</td>
                </tr>
              </tbody>
            </Table>
          </Tabs.Panel>
        )}
      </Tabs>
    </Stack>
  );
}
