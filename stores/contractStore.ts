import create from "zustand";

export const useContractStore = create(() => ({
  network: "testnet",
  contract: "rock-paper-scissors-v3.petarjs.testnet",
  methods: [
    {
      type: "view",
      name: "getGameByPin",
      description: "Load game data by passing in a unique pin",
      parameters: [
        {
          type: "string",
          name: "gamePin",
          description: "Pin of the game to get",
        },
      ],
    },
  ],
}));

// export const inc = () =>
//   useContractStore.setState((state) => ({ count: state.count + 1 }));
