import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import React, { Suspense } from 'react';
import Stars from './layers/Stars';
import OnlineSwitcher from './components/OnlineSwitcher';
import MemoryWall from './layers/MemoryWall';
import Header from './layers/Header';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ModalViewer from './layers/ModalViewer';

const NameOpener = React.lazy(() => import('./components/NameOpener'));

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  font-size: 16px;
  position: fixed;
  top: 0;
  overflow: hidden;
`;

function App() {
	const { t } = useTranslation();
	return (
		<AppContainer>
			<Stars />
			<Router>
				<OnlineSwitcher>
					<Header />
					<MemoryWall />
					<ModalViewer />
					<Switch>
						<Route exact path='/:id'>
							<Suspense fallback={null}>
								<NameOpener />
							</Suspense>
						</Route>
						<Redirect to='/' />
					</Switch>
				</OnlineSwitcher>
			</Router>
			<Helmet>
				<title>ETERNEY</title>
				<meta
					name='description'
					content={t('project_description1')}
				/>
			</Helmet>;
		</AppContainer>
	);
}

export default App;
