const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config(); // Load .env file

module.exports = {
	networks: {
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*' // Match any network id
		},
		goerli: {
			provider: () => new HDWalletProvider({
				privateKeys: [process.env.PRIVATE_KEY_GOERLI],
				providerOrUrl: process.env.INFURIA_URL_GOERLI,
				numberOfAddresses: 1
			}),
			networkCheckTimeout: 1000000,
			network_id: 5,
			// gas: 4465030,
			// gasPrice: 10000000000,
			confirmations: 1,
			timeoutBlocks: 50000,
			skipDryRun: true
		}
	},
	mocha: {
		// timeout: 100000
	},

	contracts_directory: './src/contracts/',
	contracts_build_directory: './src/abis/',
	compilers: {
		solc: {
			version: '^0.8.15',
			settings: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			}
		}
	}
};
