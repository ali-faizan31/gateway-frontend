import React, { useEffect, useState } from "react";
import eitherConverter from "ether-converter";
import toast, { Toaster } from "react-hot-toast";
import { FContainer } from "ferrum-design-system";
import { useParams, useLocation } from "react-router-dom";
import MultiTokenLeaderboardInformation from "./MultiTokenLeaderboard";
import {
  getLeaderboardById,
  getLeaderboardByIdForPublicUser,
  getTokenPriceFrom1Inch,
} from "../../_apis/LeaderboardCrud";
import { 
  tokenUSDCBSCMainnet,
  TOKEN_TAG,
} from "../../utils/const.utils";

export default function MultiTokenLeaderboardIndex() {
  const { id } = useParams();
  let token = localStorage.getItem(TOKEN_TAG);
  const { pathname } = useLocation();
  const isPublicUser = pathname.includes("/pub");
  const [leaderboardData, setLeaderboardData] = useState({});
  const [frmUsdcValue, setFrmUsdcValue] = useState(null);
  const [frmxUsdcValue, setFrmxUsdcValue] = useState(null);

  useEffect(() => {
    if (id !== ":id" || token) {
      if (isPublicUser) {
        getPublicLeaderboard();
      } else {
        getLeaderboard();
      }
    }
  }, [id, token]);

  const getFrmTokenUSDCValue = ( chainId, fromToken, toToken, leaderboardData ) => {
    getTokenPriceFrom1Inch(chainId, fromToken, toToken)
      .then((res) => {
        if (res?.data) {
          const { toTokenAmount } = res.data;
          const convertedAmount = eitherConverter(toTokenAmount, "wei").ether;
          setFrmUsdcValue(convertedAmount);
          getFrmxTokenUSDCValue( leaderboardData.frmxCabn.chainId, leaderboardData.frmxCabn.tokenContractAddress, tokenUSDCBSCMainnet );
        }
      })
      .catch((e) => {
        if (e?.response?.data?.error_message) {
          toast.error(e.response.data.error_message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getFrmxTokenUSDCValue = (chainId, fromToken, toToken) => {
    getTokenPriceFrom1Inch(chainId, fromToken, toToken)
      .then((res) => {
        if (res?.data) {
          const { toTokenAmount } = res.data;
          const convertedAmount = eitherConverter(toTokenAmount, "wei").ether;
          setFrmxUsdcValue(convertedAmount);
        }
      })
      .catch((e) => {
        if (e?.response?.data?.error_message) {
          toast.error(e.response.data.error_message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getPublicLeaderboard = () => { 
    getLeaderboardByIdForPublicUser(id, token)
      .then((res) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          const cabn1 = res?.data?.body?.leaderboard?.leaderboardCurrencyAddressesByNetwork[0];
          const cabn2 = res?.data?.body?.leaderboard?.leaderboardCurrencyAddressesByNetwork[1];
          if (cabn1 && cabn1.currencyAddressesByNetwork && cabn1.currencyAddressesByNetwork.tokenContractAddress && cabn1.currencyAddressesByNetwork.networkDex.dex.url &&
            cabn2 && cabn2.currencyAddressesByNetwork && cabn2.currencyAddressesByNetwork.tokenContractAddress && cabn2.currencyAddressesByNetwork.networkDex.dex.url){
              const tempObj = {
              name: leaderboard?.name,
              exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
              frmCabn: {
                tokenContractAddress: cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
                dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
                chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
                id: cabn1?.currencyAddressesByNetwork?._id
              },
              frmxCabn: {
                tokenContractAddress: cabn2?.currencyAddressesByNetwork?.tokenContractAddress,
                dexUrl: cabn2?.currencyAddressesByNetwork?.networkDex?.dex?.url,
                chainId: cabn2?.currencyAddressesByNetwork?.network?.chainId,
                id: cabn2?.currencyAddressesByNetwork?._id
              },
            };
            console.log(leaderboard, tempObj)
            getFrmTokenUSDCValue( tempObj.frmCabn.chainId, tempObj.frmCabn.tokenContractAddress, tokenUSDCBSCMainnet, tempObj );
            setLeaderboardData(tempObj);
          } else { 
            toast.error(`Error occured: Leaderboard Information is not correct`)
          }
        }
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getLeaderboard = () => { 
    getLeaderboardById(id, token)
      .then((res) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          const cabn1 = res?.data?.body?.leaderboard?.leaderboardCurrencyAddressesByNetwork[0];
          const cabn2 = res?.data?.body?.leaderboard?.leaderboardCurrencyAddressesByNetwork[1];
          if (cabn1 && cabn1.currencyAddressesByNetwork && cabn1.currencyAddressesByNetwork.tokenContractAddress && cabn1.currencyAddressesByNetwork.networkDex.dex.url &&
            cabn2 && cabn2.currencyAddressesByNetwork && cabn2.currencyAddressesByNetwork.tokenContractAddress && cabn2.currencyAddressesByNetwork.networkDex.dex.url){
            const tempObj = {
              name: leaderboard?.name,
              exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
              frmCabn: {
                tokenContractAddress: cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
                dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
                chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
                id: cabn1?.currencyAddressesByNetwork?._id
              },
              frmxCabn: {
                tokenContractAddress: cabn2?.currencyAddressesByNetwork?.tokenContractAddress,
                dexUrl: cabn2?.currencyAddressesByNetwork?.networkDex?.dex?.url,
                chainId: cabn2?.currencyAddressesByNetwork?.network?.chainId,
                id: cabn2?.currencyAddressesByNetwork?._id
              },
            };
            getFrmTokenUSDCValue( tempObj.frmCabn.chainId, tempObj.frmCabn.tokenContractAddress, tokenUSDCBSCMainnet, tempObj ); 
            setLeaderboardData(tempObj);
          } else { 
            toast.error(`Error occured: Leaderboard Information is not correct`)
          }
        }
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  return (
    <> 
        <Toaster /> 
      <FContainer type="fluid">
        <FContainer>
          {frmUsdcValue && frmxUsdcValue && (
            <MultiTokenLeaderboardInformation
              leaderboardData={leaderboardData}
              frmUsdcValue={frmUsdcValue}
              frmxUsdcValue={frmxUsdcValue}
            />
          )}
        </FContainer>
      </FContainer>
    </>
  );
}
