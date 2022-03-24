import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import Web3 from "web3";
import {Web3Helper} from "./web3Helper";
import {crucibleApi} from '../../_apis/CrucibleApi';

export class CrucibleClient {
    public web3Client: Web3Helper

	constructor(Web3Client: Web3Helper
        ) { this.web3Client = Web3Client }

	__name__() { return 'CrucibleClient'; }

	async mintCrucible(
        dispatch: Dispatch<AnyAction>,
		currency: string,
		crucibleAddress: string,
		amount: string,
		isPublic: boolean,
        network: string,
        userAddress:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            const request = await Api.crucibleApi({
                command: isPublic ? 'depositPublicGetTransaction' : 'depositGetTransaction',
                data: {network, currency, crucible:crucibleAddress, amount}
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])  
                //showmodal          
            }
           
			return
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async getConfiguredCrucibleRouters(
        dispatch: Dispatch<AnyAction>,
        userAddress:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)

            const response = await Api.crucibleApi({
                command: 'getConfiguredRouters',data: {userAddress},params: [],
			})

			return response

		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async getUserCrucibleInfo(
        dispatch: Dispatch<AnyAction>,
        crucibleAddress: string,
        userAddress:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            
            const userCrucibleInfo = await Api.crucibleApi({
                command: 'getConfiguredRouters',data: {crucible:crucibleAddress, userAddress},params: [],
			})

			return userCrucibleInfo

		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async getAllCruciblesFromDb(
        dispatch: Dispatch<AnyAction>,
        network: string,
        userAddress: string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            
            const crucibles = await Api.crucibleApi(
                {
                    command: 'getAllCruciblesFromDb',
                    data: {network},
                    params: [],
                }
            )

			return crucibles || [];

		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    // async getAllCrucibles(
    //     dispatch: Dispatch<AnyAction>,
    //     network: string,
    //     userAddress: string
    // ) {
	// 	try {
            
    //         const cs = await this.getAllCruciblesFromDb(dispatch, network,userAddress) as any;
	// 		console.log(cs,"crucible")
    //         if(cs?.length){
	// 			for(const c of cs) {
	// 				this.updateCrucible(dispatch, network, c.contractAddress,userAddress);
	// 			}
	// 		}
	// 		return

	// 	} catch (e) {
    //         console.log(e)
    //         // UI handle Errors
	// 	}finally{
    //         // Handle Modal Close
	// 	}
	
	// }

    async getCrucibleDetails(dispatch: Dispatch<AnyAction>, network: string, contractAddress: string,userAddress:string) {
		const Api = new crucibleApi()
        await Api.signInToServer(userAddress)
            
        const crucible = await Api.crucibleApi({
			command: 'getCrucible',
			data: {crucible: `${network.toUpperCase()}:${contractAddress}`},
			params: [],
		});
		
		return crucible;
	}

    async mintAndStakeCrucible(
        dispatch: Dispatch<AnyAction>,
		currency: string,
		crucibleAddress: string,
		amount: string,
		stakeAddress: boolean,
        network: string,
        userAddress:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            const request = await Api.crucibleApi({
                command: 'depositAndStakeGetTransaction',
                data: {network, currency,crucible:crucibleAddress, stake: stakeAddress, amount}, params: []
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])            
            }
           
			return
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async StakeCrucible(
        dispatch: Dispatch<AnyAction>,
		LPorCruciblecurrency: string,
		amount: string,
		stakingAddress: boolean,
        userAddress:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            const request = await Api.crucibleApi({
                command: 'stakeForGetTransaction',
                data:  {
					currency: LPorCruciblecurrency,
					stake: (stakingAddress),
					amount,
				}, params: []
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])            
            }
           
			return
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async UnStakeCrucible(
        dispatch: Dispatch<AnyAction>,
		network: string,
		amount: string,
		LPorCruciblecurrency: string,
        stakingAddress:string,
        userAddress:string,
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            const request = await Api.crucibleApi({
                command: 'unStakeGetTransaction',
                data:  {
                    crucible:`${network}:${LPorCruciblecurrency}`,
					stake: (stakingAddress),
					amount,
				}, params: []
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])            
            }
           
			return
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async withdrawRewards(
        dispatch: Dispatch<AnyAction>,
		network: string,
		amount: string,
		LPorCruciblecurrency: string,
        stakingAddress:string,
        userAddress:string,
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            const request = await Api.crucibleApi({
                command: 'withdrawRewardsGetTransaction',
                data:  {
                    crucible:`${network}:${LPorCruciblecurrency}`,
					stake: (stakingAddress),
					amount,
				}, params: []
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])            
            }
           
			return
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async contract(userAddress:string,network: string) {
        //@ts-ignore
        const Api = new crucibleApi()
        await Api.signInToServer(userAddress)
        const response = await Api.crucibleApi({
            command: 'getCrucible',
            data:  {}, params: []
        })

		return response;
	}

}

