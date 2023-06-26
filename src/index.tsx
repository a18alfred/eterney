import '@fontsource/roboto';
import './i18nextConf';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorkerRegistration';
import App from './App';
import { OnlineStatusProvider } from './context/online/online';
import { PWAInstallProvider } from './context/pwa/pwa';
import { Provider } from 'react-redux';
import store from './state';
import Web3Provider from './context/web3/web3';
import { FontProvider } from './context/font/font';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { HelmetProvider } from 'react-helmet-async';

//************
const projectId = process.env.REACT_APP_WALLETCONNECT as string;
const chains = [mainnet];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	provider
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);

const app = document.getElementById('root');
if (!app) throw new Error('Failed to find the root element');
const root = createRoot(app);

root.render(
	<OnlineStatusProvider>
		<Provider store={store}>
			<WagmiConfig client={wagmiClient}>
				<PWAInstallProvider>
					<Web3Provider>
						<FontProvider>
							<HelmetProvider>
								<App />
							</HelmetProvider>
						</FontProvider>
					</Web3Provider>
				</PWAInstallProvider>
			</WagmiConfig>
		</Provider>
		<Web3Modal projectId={projectId} ethereumClient={ethereumClient} themeMode='dark' />
	</OnlineStatusProvider>
);

serviceWorker.register({});
export { SearchInputLabel } from './theme/elements';
export { SearchIconStyled } from './theme/elements';
export { SearchButtonWrapper } from './theme/elements';
export { SearchFormStyled } from './theme/elements';
export { InputStyled } from './theme/elements';
export { ScrollableDiv } from './theme/elements';
export { TextButtonWithBorder } from './theme/elements';
export { TextButton } from './theme/elements';
export { LightButton } from './theme/elements';
export { DarkButton } from './theme/elements';