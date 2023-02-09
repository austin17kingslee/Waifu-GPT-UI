import { useEffect, useState } from 'react';
import { selectAccount, selectGlobal, useAppDispatch, useAppSelector } from "src/app/redux";
import { broadcastTx } from "src/app/redux/tx/txThunks";
import { TX_ACTION } from "src/app/configs/constants";
import Web3Service from "src/app/services/web3/Web3Service";

export default function useFetchingAllowance(
  spender: string,
  tokenAddress: string
) {
  const dispatch = useAppDispatch();
  const { address } = useAppSelector(selectAccount);
  const { web3Service } = useAppSelector(selectGlobal);
  const [needApprove, setNeedApprove] = useState(false);

  useEffect(() => {
    if (!address || !web3Service) {
      setNeedApprove(false);
      return;
    }

    checkAllowance(web3Service, address);
  }, [address, web3Service]);

  async function checkAllowance(web3Service: Web3Service, address: string) {
    try {
      const allowance = await web3Service.fetchTokenAllowance(address, spender, tokenAddress);
      setNeedApprove(+allowance === 0);
    } catch (e) {
      console.log(e);
    }
  }

  function sendApproveTx() {
    dispatch(broadcastTx(
      TX_ACTION.APPROVE_TOKEN,
      { spender, tokenAddress },
      onApproveSuccess
    ))
  }

  function onApproveSuccess() {
    setNeedApprove(false);
  }

  return [needApprove, sendApproveTx as any];
}
