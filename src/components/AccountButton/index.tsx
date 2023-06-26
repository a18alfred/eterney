import { MouseEvent } from 'react';
import styled from 'styled-components';
import LoginIcon from '@mui/icons-material/Login';
import { selectUserConnected } from '../../state/user/slice';
import { headerBtnBg, headerBtnBgHover } from '../../theme/colors';
import { useWeb3Modal } from '@web3modal/react';
import AvatarIcon from '../AvatarIcon';
import useModal from '../../hooks/useModal';
import { MODAL_ROUTE } from '../../constants/routing';
import { useAppSelector } from '../../state/hooks';

const LoginIconStyled = styled(LoginIcon)`
  color: ${headerBtnBg};
  cursor: pointer;
  height: 20px !important;
  width: 20px !important;
  padding: 5px;
  border-radius: 50%;
  border: 2px solid ${headerBtnBg};
  outline: none;
  background: transparent;
  margin-right: 0.5rem;

  @media (hover: hover) {
    :hover {
      color: ${headerBtnBgHover};
      border: 2px solid ${headerBtnBgHover};
    }
  }
`;

const AccountButton = () => {
	const connected = useAppSelector(selectUserConnected);
	const { open: openConnect } = useWeb3Modal();
	const { open } = useModal();

	const onAccount = (e: MouseEvent<HTMLImageElement>) => {
		e.preventDefault();
		open(MODAL_ROUTE.ACCOUNT);
	};

	const onConnect = (e: MouseEvent<SVGSVGElement>) => {
		e.preventDefault();
		openConnect();
	};

	if (connected) return (
		<AvatarIcon
			isButton={true}
			clickHandler={onAccount}
		/>
	);

	return (
		<LoginIconStyled onClick={onConnect} />
	);
};

export default AccountButton;
