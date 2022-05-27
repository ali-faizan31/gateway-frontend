import Web3 from "web3";
import FerrumJson from "../../utils/FerrumToken.json";
import ApeRouterJson from '../../utils/ApeRouterAbi.json'
import { Big } from "big.js";
import { AbiItem } from "web3-utils";
import { cFRMxTokenContractAddress } from "../../utils/const.utils";

export class Web3Helper {
  web3Client: Web3;

  constructor(web3: Web3) {
    this.web3Client = web3;
  }

  async sendTransactionAsync(
    dispatch: any,
    transactions: any[],
    payload?: any
  ): Promise<string> {
    const txIds: string[] = [];
    for (const tx of transactions) {
      const txId = await new Promise<{ [k: string]: string }>(
        (resolve, reject) =>
          this.web3Client.eth
            .sendTransaction({
              from: tx.from,
              to: tx.contract,
              value: tx.value || "0x",
              data: tx.data,
              gas: tx.gas?.gasLimit,
              // gasPrice: tx.gas?.gasPrice,
              // chainId: this.connection.netId()
            })
            // .on("confirmation", function (part1, part2) {
            //   console.log("confirmation", part1, part2);
            // })
            .on("transactionHash", (transactionHash) => {
              //dispatch(transactionHash);
            })
            .then((h: any) => {
              resolve(h);
            })
            .catch(reject)
      );
      // console.log(txId);
      txIds.push(txId.transactionHash);
    }
    // console.log(txIds, "txIdstxIds");
    return txIds.join(",") + "|" + JSON.stringify(payload || "");
  }

  async getTokenData(walletAddress: string, tokenAddr: string) {
    const tokenContract = new this.web3Client.eth.Contract(
      FerrumJson.abi as AbiItem[],
      tokenAddr
    );
    let symbol = await tokenContract.methods.symbol().call();
    let decimals = (await tokenContract.methods.decimals().call()) as any;
    // let name = await tokenContract.methods.name().call();
    let balance = await tokenContract.methods.balanceOf(walletAddress).call();
    const decimalFactor = 10 ** Number(decimals);
    balance = new Big(balance).div(decimalFactor).toFixed();
    return { symbol, decimals, balance }
    // console.log("symbolsymbolsymbol",symbol,balance)
  }

  async getTokenPriceFromRouter(currency = "0xaf329a957653675613D0D98f49fc93326AeB36Fc") {
    try {
      const ApeContract = new this.web3Client.eth.Contract(ApeRouterJson.abi as AbiItem[],
        "0x10ED43C718714eb63d5aA57B78B54704E256024E"
      );

      let pricingRoute = [currency, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"];
      if (currency.toLowerCase() === cFRMxTokenContractAddress.toLowerCase()) {
        pricingRoute = [currency, "0x8523518001ad5d24b2a04e8729743c0643a316c0", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"]
      }
      const response = await ApeContract.methods.getAmountsOut(
        "1000000000000000000", pricingRoute
      ).call()
      if (response.length > 0) {
        return await this.amountToHuman(response[response.length - 1], 18)
      }
      return 0
    } catch (e) {
      // console.log(e)
    }
  }

  async amountToHuman(amount: string, decimal: number) {
    const decimalFactor = 10 ** decimal;
    return new Big(amount).div(decimalFactor).toFixed();
  }
}



