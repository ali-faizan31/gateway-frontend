import Web3 from "web3";
import FerrumJson from "../../utils/FerrumToken.json";
import { Big } from "big.js";
import { AbiItem } from "web3-utils";

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
      console.log(txId);
      txIds.push(txId.transactionHash);
    }
    console.log(txIds, "txIdstxIds");
    return txIds.join(",") + "|" + JSON.stringify(payload || "");
  }

  async getTokenData (walletAddress:string,tokenAddr:string) {
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
    return {symbol,decimals,balance}
    // console.log("symbolsymbolsymbol",symbol,balance)
  }
}
