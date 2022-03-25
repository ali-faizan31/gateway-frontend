import { Big } from 'big.js';

export type ChainEventStatus = '' | 'pending' | 'failed' | 'completed';

export interface ApprovalState {
	pending: boolean;
	approveTransactionId: string;
	approvals: { [key: string]: string };
	status?: ChainEventStatus;
	error?: string;
}

export const parseCurrency = (cur: string): [string, string] => {
    const pars = cur.split(':', 2);
    return [pars[0], pars[1]];
}

export const toCurrency = (network: string, address: string): string | undefined => {
    if (!network || !address) return undefined;
    return `${network.toUpperCase()}:${address.toLowerCase()}`
}

export const isCurrencyValid = (cur: string): boolean => {
    if (!cur) { return false; }
    const [network, token] = parseCurrency(cur);
    if (!token) { return false; }
    if (!network) { return false; }
    if (!token.startsWith('0x')) {
        return false;
    }
    if (token.length != 42) {
        return false;
    }
    if (!network) {
        return false;
    }
    return true;
}

export class ParseBigError extends Error { }

export class BigUtils {
	static truthy(b?: Big): boolean {
		return !!b && !(new Big(0).eq(b));
	}

	static safeParse(s: string): Big {
		try {
			return new Big(s);
		} catch (e) {
			return new Big('0');
		}
	}

	static parseOrThrow(s: string, varName: string): Big {
		try {
			return new Big(s);
		} catch (e) {
			throw new ParseBigError(`Error parsing ${varName}. "${s}" is not a valid number`);
		}
	}
}

export interface ChainEventBase {
    id: string;
		userAddress: string;
    network: string;
		application: string;
    status: ChainEventStatus;
    callback?: any,
    eventType: string;
		transactionType: string;
		createdAt: number;
		lastUpdate: number;
		reason?: string;
		retry: number;
}

export interface MultiSigActor {
	groupId: number;
	quorum: string;
	address: string;
	contractAddress: string;
}

export interface MultiSigSignature {
    creationTime: number;
    creator: string;
    signature: string;
  }

export interface MultiSignable {
	signatures: MultiSigSignature[];
}

export interface AllocationSignature extends MultiSignable {
	actor: MultiSigActor;
	salt: string;
	expirySeconds: number;
	from: string;
	to: string;
}

export interface UserContractAllocation {
	signature?: AllocationSignature;
	network: string;
	contractAddress: string;
	method: string;
	userAddress: string;
	currency: string;
	allocation: string;
	expirySeconds: number;
}