import { useBuyFormNFT, useUser } from "@trustpad/launchpad";
import { useCurrencyApproval } from "@trustpad/launchpad/dist/pool";
import React from "react";
import { Button } from "react-bootstrap";
import { BsArrowDown } from "react-icons/bs";
import { FaCircleNotch } from "react-icons/fa";
import { toast } from "react-toastify";
import { usePool } from "~features/pools";
import { ItemsBalance } from "~features/pools/components/BuyNftForm/ItemsBalance";
import { ApproveButton } from "~features/pools/components/BuyTokensForm/ApproveButton";
import { ValidationError } from "~features/pools/components/BuyTokensForm/ValidationError";
import { fNum } from "~utils";
import { NftPoolConfig, SaleStatus } from "../../types";
import { ComplexInput } from "../BuyTokensForm/ComplexInput";
import { InputTokenInfo } from "../BuyTokensForm/InputTokenInfo";
import { MaxButton } from "../BuyTokensForm/MaxButton";
import { InventoryInput } from "./InventoryInput";

export function BuyNftForm() {
  const user = useUser();
  const { pool } = usePool<NftPoolConfig>();
  const { sale, token, fundToken } = pool;
  const { status } = sale;

  const {
    isLoading,
    isDisabled,
    isSoldOut,
    validationErrors,
    userWhitelisted,
    currencyValue,
    tokenValue,
    onTokenValueChange,
    buyTokens,
    getMaxAvailableTokens,
    setMaxTokens,
    userCurrencyBalance,
    userContribution,
    userPoolBalance,
    isUserReachedLimit,
    tierAllowsToBuy,
    userAllocationLeft,
    // nft
    onSelectedItemChange,
    selectedItem,
  } = useBuyFormNFT();
  const { isApprovalRequired, isApproved } = useCurrencyApproval();

  const isPresaleRunning = status === SaleStatus.open;

  const ButtonText = ({ progressLabel, isLoading, children }) =>
    isLoading ? (
      <>
        <FaCircleNotch size={20} className="inline fa-spin" />
        <span className="ml-2">{progressLabel}</span>
      </>
    ) : status === SaleStatus.init || status === SaleStatus.register ? (
      <>Not open yet</>
    ) : status === SaleStatus.finished ? (
      <>Presale is closed</>
    ) : !userWhitelisted && !tierAllowsToBuy && !sale.isPublic ? (
      <>Cannot buy</>
    ) : isSoldOut ? (
      <>Sold out!</>
    ) : (
      children
    );

  return (
    <div className="space-y-3 py-2">
      <div className="space-y-1">
        <div className="flex items-center space-x-1">
          <span className="text-gray-400">Balance:</span>{" "}
          <span>
            {fNum(userCurrencyBalance)} {fundToken.symbol}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-gray-400">Allocation left:</span>{" "}
          <span>
            {fNum(userAllocationLeft)} {fundToken.symbol}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <InventoryInput
          items={sale.inventory}
          active={selectedItem}
          onChange={onSelectedItemChange}
          balance={userPoolBalance}
          getMaxItems={getMaxAvailableTokens}
        />

        {(selectedItem.limit === 0 || selectedItem.limit > 3) && (
          <>
            <div>
              <BsArrowDown className="text-main" size="1em" />
            </div>
            <ComplexInput
              name="tokensValue"
              value={tokenValue}
              disabled={isLoading}
              onChange={onTokenValueChange}
              icon={<InputTokenInfo imageSrc={token.imageSrc} />}
              topLabel={`Amount`}
              topRight={user.account && `Max. ${fNum(getMaxAvailableTokens())}`}
              className="w-full"
              placeholder={"0"}
              button={
                sale.wholeTokens ? null : <MaxButton onClick={setMaxTokens} />
              }
              wholeNumber
            />
          </>
        )}
      </div>

      {isPresaleRunning && <ValidationError {...validationErrors} />}

      <div className="text-center">
        {isApprovalRequired && !isApproved ? (
          <ApproveButton symbol={fundToken.symbol} />
        ) : (
          <Button
            variant={isDisabled ? "secondary" : "primary"}
            disabled={isDisabled}
            onClick={() =>
              buyTokens().then((message) => {
                if ("error" in message) {
                  toast.error(`Failed to buy: ${message.error}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                } else {
                  toast.success(
                    `Success! You purchased ${message.amount} tokens`,
                    {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    }
                  );
                }
              })
            }
          >
            <ButtonText progressLabel="Buying" isLoading={isLoading}>
              Buy {fNum(parseInt(tokenValue) || 0)} {selectedItem.name} for{" "}
              {currencyValue} {fundToken.symbol}
            </ButtonText>
          </Button>
        )}
      </div>

      <ItemsBalance items={sale.inventory} balance={userPoolBalance} />
    </div>
  );
}
