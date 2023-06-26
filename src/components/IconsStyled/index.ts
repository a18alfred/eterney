import styled from 'styled-components';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { mainText, mainTextHover } from '../../theme/colors';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

export const CloseIconStyled = styled(CloseIcon)`
  color: ${mainText};
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: ${mainTextHover};
    }
  }
`;

export const ShareIconStyled = styled(LogoutOutlinedIcon)`
  color: ${mainText};
  cursor: pointer;
  transform: rotate(-90deg);

  @media (hover: hover) {
    :hover {
      color: ${mainTextHover};
    }
  }
`;

export const CancelIconStyled = styled(CancelIcon)`
  color: ${mainText};
  height: 75px !important;
  width: 75px !important;
`;

export const ArrowBackStyled = styled(ArrowBackIosIcon)`
  color: ${mainText};
  cursor: pointer;
  height: 18px !important;
  width: 18px !important;
`;

export const SuccessIconStyled = styled(CheckCircleOutlineIcon)`
  color: ${mainText};
  height: 75px !important;
  width: 75px !important;
`;

export const RefreshIconStyled = styled(RefreshIcon)`
  color: ${mainText};
  cursor: pointer;
  height: 22px !important;
  width: 22px !important;
`;