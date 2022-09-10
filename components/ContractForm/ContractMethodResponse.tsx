import { Code, Stack, Tabs } from "@mantine/core";

interface Props {
  response: unknown;
}

export default function ContractMethodResponse({ response }: Props) {
  console.log({ response });

  return (
    <Stack sx={{ width: "100%" }}>
      <Tabs defaultValue="Response" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="Response" key="Response">
            Response
          </Tabs.Tab>
          {/* {method.type === "change" && (
            <Tabs.Tab value="Meta" key="Meta">
              Meta
            </Tabs.Tab>
          )} */}
        </Tabs.List>
        <Tabs.Panel value="Response">
          <Code block>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </Code>
          {/* <Table>
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
          </Table> */}
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
