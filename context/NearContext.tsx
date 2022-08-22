import { connect, keyStores, Near, WalletConnection } from "near-api-js";
import { NearConfig } from "near-api-js/lib/near";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getNearConfig, NEAR_ENV } from "../config/near";
import { removeQueryParamsFromRouter } from "../utils/removeQueryParams";

interface Context {
  near: Near | undefined;
  walletConnection: WalletConnection | undefined;
  accountId: any;
  nearConfig: any;
  nearLoading: boolean;
  reset(): void;
  network: string;
  setNetwork: Dispatch<SetStateAction<string>>;
}

export const NearContext = createContext<Context | undefined>(undefined);

export default function useNearContext(): Context {
  return useContext(NearContext) ?? ({} as Context);
}

export function NearProvider({ children }: PropsWithChildren<unknown>) {
  const router = useRouter();

  const [near, setNear] = useState<Near>();
  const [network, setNetwork] = useState<NEAR_ENV | null>(null);
  const [nearLoading, setNearLoading] = useState(true);
  const [nearConfig, setNearConfig] = useState<NearConfig>();
  const [walletConnection, setWalletConnection] = useState<WalletConnection>();
  const [accountId, setAccountId] = useState();

  useEffect(() => {
    if (router.query.connected) {
      removeQueryParamsFromRouter(router, [
        "account_id",
        "all_keys",
        "connected",
      ]);
    }
  }, [router.query]);

  async function initNear() {
    if (!network) {
      return;
    }

    const nearConfig = {
      ...getNearConfig(network),
      deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
      headers: {},
    };
    const near = await connect(nearConfig);

    const walletConnection = new WalletConnection(near, "blockman");

    setNear(near);
    setNearConfig(nearConfig);
    setWalletConnection(walletConnection);
    setAccountId(walletConnection.getAccountId());
  }

  async function init() {
    if (!network) {
      return;
    }

    setNearLoading(true);
    await initNear();
    setNearLoading(false);
  }

  useEffect(() => {
    init();
  }, [network]);

  useEffect(() => {
    const savedNetwork = window.localStorage.getItem("blockman-near-env");

    if (savedNetwork === "undefined") {
      setNetwork(NEAR_ENV.TESTNET);
    }

    setNetwork((savedNetwork as NEAR_ENV) || NEAR_ENV.TESTNET);
  }, []);

  useEffect(() => {
    if (!network) {
      return;
    }

    window.localStorage.setItem("blockman-near-env", network);
  }, [network]);

  function reset() {
    setNear(undefined);
    setNearConfig(undefined);
    setWalletConnection(undefined);
    setAccountId(undefined);

    init();
  }

  const value = {
    near,
    walletConnection,
    accountId,
    nearConfig,
    nearLoading,
    reset,
    network,
    setNetwork,
  };

  return <NearContext.Provider value={value}>{children}</NearContext.Provider>;
}
