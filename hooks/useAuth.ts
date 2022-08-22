import { useMemo } from "react";
import useNearContext from "../context/NearContext";

export default function useAuth() {
  const { network, walletConnection, reset } = useNearContext();

  const accountId = useMemo(
    () => walletConnection?.getAccountId(),
    [walletConnection]
  );

  function signOut() {
    walletConnection?.signOut();
    reset();
  }

  function signIn() {
    return walletConnection?.requestSignIn({
      successUrl: `${window?.location.origin}?connected=true`,
    });
  }

  function getAccountId() {
    return walletConnection?.getAccountId();
  }

  function isSignedIn() {
    return walletConnection?.isSignedIn();
  }

  return { signOut, signIn, getAccountId, accountId, isSignedIn };
}
