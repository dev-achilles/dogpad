import { useWeb3Provider } from "@trustpad/launchpad";
import throttle from "lodash/throttle";
import { useEffect, useMemo } from "react";

export function useContractSubscription(
  address: string,
  onUpdate: VoidFunction,
  isActive = true
) {
  const { web3 } = useWeb3Provider();
  const throttledHandler = useMemo(() => {
    return throttle(onUpdate, 5000);
  }, [onUpdate]);

  useEffect(() => {
    if (!address || !web3 || !isActive) return;

    const handler = (error, result) => {
      if (error) {
        // console.error("subscription error", error);
        return;
      }
      if (
        web3.utils.isBloom(result?.logsBloom) &&
        web3.utils.isContractAddressInBloom(result.logsBloom, address)
      ) {
        throttledHandler();
        // debug("Subscription update triggered", address, result);
      }
    };

    const subscription = web3.eth.subscribe("newBlockHeaders", handler);
    return () => {
      subscription.unsubscribe(handler);
    };
  }, [web3, address, throttledHandler, isActive]);
}
