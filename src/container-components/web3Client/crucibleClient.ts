import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import Web3 from "web3";
import {Web3Helper} from "./web3Helper";
import {crucibleApi} from '../../_apis/CrucibleApi';

export class CrucibleClient {
    public web3Client: Web3Helper

	constructor(Web3Client: Web3Helper
        ) { this.web3Client = Web3Client }

	__name__() { return 'CrucibleClient'; }

    async getContractAllocation(userAddress: string, contractAddress: string, currency: string):Promise<any>{
        const Api = new crucibleApi()
        await Api.signInToServer(userAddress)
		return  Api.crucibleApi({
            command: 'getContractAllocation', data: {userAddress, contractAddress, currency},
			params: [] });
	}

	async setContractAllocation(dispatch:any,userAddress: string, contractAddress: string, currency: string,network:string, amount?: string)
	: Promise<string> {
        const Api = new crucibleApi()
        await Api.signInToServer(userAddress)
		const requests = await Api.crucibleApi({
			command: 'approveAllocationGetTransaction',
			data: {currency, amount: amount || '1', userAddress, contractAddress}, params: [] });
		console.log('About to submit request', {requests});

        if(requests.data){
            const requestId = await this.web3Client.sendTransactionAsync(dispatch,requests.data,{currency, amount, userAddress, contractAddress})            
            return requestId.split('|')[0]; // Convert the requestId to transction Id. TODO: Do this a better way
            //showmodal          
        }
		return ''

	}

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
                console.log(request.data,'datataatat')
                const web3Helper = await this.web3Client.sendTransactionAsync(dispatch,[request.data]) 
                console.log(web3Helper,'web3helepep')
                return web3Helper 
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

    async unwrapCrucible(
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
                command: "withdrawGetTransaction",
                data: {network, currency, crucible:crucibleAddress, amount}
            })

            if(request.data.data){
                console.log(request.data,'datataatat')
                const web3Helper = await this.web3Client.sendTransactionAsync(dispatch,[request.data]) 
                console.log(web3Helper,'web3helepep')
                return web3Helper 
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
				command: 'getUserCrucibleInfo',
				data: {crucible:crucibleAddress, userAddress},
				params: [],
			} );
			if (!!userCrucibleInfo) {
                return userCrucibleInfo;
			}
			return 
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async getLPStakingInfo(
        dispatch: Dispatch<AnyAction>,
        crucibleAddress: string,
        userAddress:string,
        stakingAddress: string,
        network:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
			const userCrucibleInfo = await Api.crucibleApi({
				command: 'userStakeInfo',
				data: {
                    crucible:crucibleAddress,
                    "stakeType": "openEnded",
                    "stakeId": crucibleAddress,
                    "network": network ,
                    "stakingAddress": stakingAddress,
                    userAddress},
				params: [],
			} );
			if (!!userCrucibleInfo) {
                return userCrucibleInfo;
			}
			return 
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async  stakeLPToken(
        dispatch: Dispatch<AnyAction>,
        LpAddress: string,
        userAddress:string,
        stakingAddress: string,
        network:string,
        amount:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
			const request = await Api.crucibleApi({
				command: 'stakeGetTransaction',
				data: {
                    currency : `${network}:${LpAddress}`,
                    "stakeType": "openEnded",
                    "stakeId": LpAddress,
                    "network": network ,
                    amount,
                    "stakingAddress": stakingAddress,
                    userAddress},
				params: [],
			} );
            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])    
                return web3Helper        
            }

			return 
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async  unstakeLPToken(
        dispatch: Dispatch<AnyAction>,
        LpAddress: string,
        userAddress:string,
        amount:string,
        stakingAddress: string,
        network:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
			const request = await Api.crucibleApi({
				command: 'withdrawStakeGetTransaction',
				data: {
                    currency : `${network}:${LpAddress}`,
                    "stakeType": "openEnded",
                    "stakeId": LpAddress,
                    "network": network ,
                    amount,
                    "stakingAddress": stakingAddress,
                    userAddress},
				params: [],
			} );
			if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])    
                return web3Helper        
            }
			return 
			return 
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async  withdrawRewardsLPToken(
        dispatch: Dispatch<AnyAction>,
        LpAddress: string,
        userAddress:string,
        stakingAddress: string,
        network:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
			const request = await Api.crucibleApi({
				command: 'takeRewardsGetTransaction',
				data: {
                    "stakeType": "openEnded",
                    "stakeId": LpAddress,
                    "network": network ,
                    "stakingAddress": stakingAddress,
                    userAddress},
				params: [],
			} );

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])    
                return web3Helper        
            }
			return 
		} catch (e) {
            console.log(e)
            // UI handle Errors
		}finally{
            // Handle Modal Close
		}
	
	}

    async getPairPrice(dispatch:Dispatch,crucible:string,base:string,userAddress: string){
		try {
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
			const cruciblePairPrice = await Api.crucibleApi({
				command: 'getCruciblePricing',
				data: {crucible, base },
				params: [],
			});
			if(!!cruciblePairPrice){
				console.log(cruciblePairPrice)
				return cruciblePairPrice.data
			}
            return cruciblePairPrice
		} catch (e) {
			console.log(e)
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
		stakingAddress: string,
        userAddress:string,
        network:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            const request = await Api.crucibleApi({
                command: 'stakeForGetTransaction',
                data:  {
					currency: LPorCruciblecurrency,
					stake: (stakingAddress),
                    network,
					amount,
				}, params: []
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])    
                return web3Helper        
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
		LPorCruciblecurrency: string,
		amount: string,
		stakingAddress: string,
        userAddress:string,
        network:string
    ) {
		try {
            
            const Api = new crucibleApi()
            await Api.signInToServer(userAddress)
            const request = await Api.crucibleApi({
                command: 'unStakeGetTransaction',
                data:  {
                    crucible: LPorCruciblecurrency,
					staking: (stakingAddress),
                    network,
					amount,
				}, params: []
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])    
                return web3Helper        
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
                    crucible:`${LPorCruciblecurrency}`,
					staking: (stakingAddress),
					amount,
				}, params: []
            })

            if(request.data.data){
                const web3Helper = this.web3Client.sendTransactionAsync(dispatch,[request.data])
                return web3Helper          
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

