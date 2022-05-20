const STAGING_PREFIXES = ['dev', 'qa', 'uat', 'staging'];

export type AppUiStage = 'local' | 'dev' | 'staging' | 'prod';

export type UiStageEndpoint = { [k in AppUiStage]: object };

export class Environment {
	static DEFAULT_ENDPOINTS: UiStageEndpoint = {
		local: {
			baseUrl: "https://api-leaderboard.dev.svcs.ferrumnetwork.io",
			apiKeyForApplicationUser: "b63d9502-1ddd-4ccb-b0bd-e59a3531d7f6",
			crucibleBaseUrl: "https://22phwrgczz.us-east-2.awsapprunner.com/",
		},
		dev: {
			baseUrl: "https://api-leaderboard.dev.svcs.ferrumnetwork.io",
			apiKeyForApplicationUser: "b63d9502-1ddd-4ccb-b0bd-e59a3531d7f6",
			crucibleBaseUrl: "https://22phwrgczz.us-east-2.awsapprunner.com/"
			// crucibleBaseUrl: "https://xxda22hwpy.us-east-2.awsapprunner.com/"
		},
		staging: {
			baseUrl: "https://api-gateway-v1.stage.svcs.ferrumnetwork.io",
			apiKeyForApplicationUser: "66fadbfe-b625-48d1-9255-2c6317adf0bf",
			crucibleBaseUrl: "https://22phwrgczz.us-east-2.awsapprunner.com/"
		},
		prod: {
			baseUrl: "https://api-gateway-v1.svcs.ferrumnetwork.io",
			apiKeyForApplicationUser: "66fadbfe-b625-48d1-9255-2c6317adf0bf",
			crucibleBaseUrl: "https://22phwrgczz.us-east-2.awsapprunner.com/"
		},
	};

	static uiStage(): AppUiStage {
		// console.log(process.env.OVERRIDE_UI_STAGE)
		if (!!process.env.OVERRIDE_UI_STAGE) {
			return process.env.OVERRIDE_UI_STAGE as any;
		}
		const base = (window.location?.origin || '').toLowerCase();
		// console.log(base)
		// console.log(process.env.NODE_ENV)
		const isCompiled = process.env.NODE_ENV === 'production';
		if (!isCompiled) {
			// console.log('local')
			return 'local';
		}
		const prefix = STAGING_PREFIXES.find(p => base.includes(`-${p}` || `https://${p}`));
		if (prefix) {
			// console.log(prefix,'current-prefix')
			return prefix as AppUiStage;
		}
		// console.log('prod')
		return 'prod';
	}

	static defaultEndPoint(): object {
		const ep = Environment.DEFAULT_ENDPOINTS[Environment.uiStage()];
		// console.log(ep)
		return ep!;
	}
}