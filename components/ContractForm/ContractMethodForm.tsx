import {
  Badge,
  Code,
  Group,
  Input,
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
  const attachedDepositParameter = {
    name: "attachedDeposit",
    type: "number",
    description: "Attach NEAR with your contract call",
  };

  const gasParameter = {
    name: "gas",
    type: "number",
    description: "Attach gas with your contract call (in yocto NEAR)",
  };

  const metaParameters =
    method.type === "change"
      ? [attachedDepositParameter, gasParameter]
      : [gasParameter];

  return (
    <Stack>
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
      <Tabs
        defaultValue="Data"
        variant="outline"
        classNames={
          {
            // root: classes.tabs,
            // tabsList: classes.tabsList,
            // tab: classes.tab,
          }
        }
      >
        <Tabs.List>
          <Tabs.Tab value="Data" key="Data">
            Data
          </Tabs.Tab>
          <Tabs.Tab value="Meta" key="Meta">
            Meta
          </Tabs.Tab>
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
              {metaParameters.map((metaParameter, index) => (
                <tr key={index}>
                  <td>
                    <Code>{metaParameter.name}</Code>
                  </td>
                  <td>
                    <Group>
                      <Badge>{metaParameter.type}</Badge>
                      <Controller
                        defaultValue={""}
                        control={form.control}
                        name={`meta.${metaParameter.name}`}
                        render={({ field }) => (
                          <Input {...field} placeholder={metaParameter.name} />
                        )}
                      />
                    </Group>
                  </td>
                  <td>{metaParameter.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
