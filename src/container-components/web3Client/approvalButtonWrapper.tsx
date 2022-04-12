import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React, { Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApprovalState } from "./types";
import { BigUtils, parseCurrency } from "./types";
import { CrucibleClient } from "./../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "./../../container-components/web3Client/web3Helper";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { ChainEventBase, ChainEventItem } from "./chainEventItem";
export interface IApprovableButtonWrapperViewProps {
  isApprovalMode: boolean;
  pendingApproval: boolean;
  approvalTransactionId: string;
  error?: string;
  onApproveClick: () => void;
}
export interface IApprovableButtonWrapperOwnProps {
  currency: string;
  contractAddress: string;
  userAddress: string;
  amount: string;
  View: (props: IApprovableButtonWrapperViewProps) => any;
}
function mapStateToProps(state: any): ApprovalState {
  return state.approval;
}
export function approvalKey(userAddress: string, contractAddress: string, currency: string) {
  return `${userAddress}|${contractAddress}|${currency}`;
}
export const doGetApproval = createAsyncThunk(
  "approveButton/doGetApproval",
  async (
    payload: {
      userAddress: string;
      contractAddress: string;
      currency: string;
      networkClient: any;
    },
    ctx
  ) => {
    const { userAddress, contractAddress, currency, networkClient } = payload;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const allocation = await client.getContractAllocation(userAddress, contractAddress, currency);
    if (!!allocation && allocation.data) {
      ctx.dispatch(
        approvableButtonSlice.actions.allocationUpdated({
          contractAddress,
          userAddress,
          currency,
          allocation: allocation.data.allocation,
        })
      );
    }
    // const api = inject<ApiClient>(ApiClient);
    // const allocation = await api.getContractAllocation(userAddress, contractAddress, currency);
    // console.log('doGetApproval', payload, {allocation});
    // if (!!allocation) {
    //  ctx.dispatch(approvableButtonSlice.actions.allocationUpdated({
    //    contractAddress, userAddress, currency, allocation: allocation.allocation }))
    // }
  }
);
export const doApprove = createAsyncThunk(
  "approveButton/doApprove",
  async (
    payload: {
      userAddress: string;
      contractAddress: string;
      currency: string;
      networkClient: any;
    },
    ctx
  ) => {
    const { userAddress, contractAddress, currency, networkClient } = payload;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const transactionId = client.setContractAllocation(ctx.dispatch, userAddress, contractAddress, currency, "");
    if (!!transactionId) {
      ctx.dispatch(
        approvableButtonSlice.actions.approveTransactionReceived({
          transactionId,
        })
      );
    }
  }
);
//Action.approvableButtonSlice/approveTransactionReceived
export const approvableButtonSlice = createSlice({
  name: "approvableButton",
  initialState: {
    approveTransactionId: "",
    pending: false,
    approvals: {},
  } as ApprovalState,
  reducers: {
    allocationUpdated: (state, action) => {
      const { userAddress, contractAddress, currency, allocation } = action.payload;
      state.approvals[approvalKey(userAddress, contractAddress, currency)] = allocation;
    },
    transactionFailed: (state, action) => {
      state.error = action.payload.message || "Error while getting transaction";
      state.pending = false;
      state.status = "failed";
    },
    transactionCompleted: (state, action) => {
      state.error = undefined;
      state.pending = false;
      state.status = "completed";
    },
    approveTransactionReceived: (state, action) => {
      state.approveTransactionId = action.payload.transactionId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doApprove.pending, (state, action) => {
      state.pending = true;
      state.error = undefined;
      state.approveTransactionId = "";
      state.status = "pending";
    });
    builder.addCase(doApprove.fulfilled, (state, action) => {
      state.pending = false;
      state.error = undefined;
      // state.status = 'completed';
    });
    builder.addCase(doApprove.rejected, (state, action) => {
      state.pending = false;
      console.log("Error running approval", action.payload);
      state.error = (action.payload || ({} as any)).toString();
      state.status = "failed";
    });
  },
});
async function updateEvent(dispatch: Dispatch<AnyAction>, e: ChainEventBase, networkClient: any): Promise<ChainEventBase> {
  try {
    const t = await networkClient.eth.getTransaction(e.id);
    console.log("Checking the transloota ", t);
    if (t && t.blockNumber) {
      console.log("Translo iso componte ", t);
      dispatch(
        approvableButtonSlice.actions.transactionCompleted({
          transactionId: e.id,
        })
      );
      return { ...e, status: "completed" }; // TODO: Check for failed
    }
    console.log("Noting inderezding ", e);
    return { ...e, status: "pending" };
  } catch (ex) {
    console.error("ApprovableButton.updateEvent", ex, e);
    dispatch(
      approvableButtonSlice.actions.transactionFailed({
        message: (ex as any).message,
      })
    );
    return { ...e, status: "failed" };
  }
}
export function ApprovableButtonWrapper(ownProps: IApprovableButtonWrapperOwnProps) {
  const dispatch = useDispatch();
  const props = useSelector(mapStateToProps);
  const [network] = parseCurrency(ownProps.currency || "");
  const { userAddress, contractAddress, currency } = ownProps;
  const { status } = props;
  const currentApproval = props.approvals[approvalKey(userAddress, contractAddress, currency)];
  const [networkClient, setNetworkClient] = useState<Web3 | undefined>(undefined);
  const { library } = useWeb3React();
  useEffect(() => {
    if (userAddress && contractAddress && currency) {
      dispatch(doGetApproval({ userAddress, contractAddress, currency, networkClient }));
    }
    if (library && !networkClient) {
      // console.log("web3 react connect set network client");
      setNetworkClient(library);
    }
    // eslint-disable-next-line
  }, [userAddress, contractAddress, currency, status, networkClient]); 
  
  return (
    <>
      <div>
        <ChainEventItem
          id={props.approveTransactionId}
          network={network as any}
          initialStatus={"pending"}
          eventType={"approval"}
          updater={(e: any) => updateEvent(dispatch, e, networkClient)}
        >
          <ownProps.View
            isApprovalMode={BigUtils.safeParse(currentApproval).lt(BigUtils.safeParse(ownProps.amount || "0.0001"))}
            pendingApproval={props.status === "pending"}
            approvalTransactionId={props.approveTransactionId}
            onApproveClick={() => dispatch(doApprove({ networkClient, ...ownProps }))}
          />
        </ChainEventItem>
      </div>
    </>
  );
}
