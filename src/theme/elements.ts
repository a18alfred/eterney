import styled from 'styled-components';
import {
	errorBorder,
	extraLightBorder,
	lightGreyBg,
	lightBorder,
	mainText,
	mainTextHover,
	secondaryText,
	lightGreyBgHover,
	mainTextInverted
} from './colors';
import SearchIcon from '@mui/icons-material/Search';
import { buttonStyle, inputStyle, logoStyle, scrollStyle } from './style';

export const HeaderLogoWrapper = styled.span`
  opacity: 0.2;
  cursor: pointer;
  padding: 0 0.5rem;

  @media (hover: hover) {
    :hover {
      opacity: 1;
    }
  }

  ${logoStyle}
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${logoStyle};
`;

export const ScrollableDiv = styled.div`
  ${scrollStyle}
`;

export const NothingFound = styled.p`
  width: 100%;
  text-align: center;
  color: ${secondaryText};
  margin-bottom: 0.5rem;
`;

export const InputStyled = styled.input<{ error?: boolean, width?: string }>`
  ${inputStyle};
  border-bottom: 2px solid ${(props) => props.error ? errorBorder : extraLightBorder};
  width: ${({ width }) => width ? width : '100%'};
`;

export const InputSearch = styled.input`
  ${inputStyle};
`;

export const InputTextArea = styled.textarea<{ error?: boolean, height?: string }>`
  font: inherit;
  ${scrollStyle};
  outline: none;
  border: none;
  background: ${lightGreyBg};
  width: 100%;
  height: 100px;
  resize: none;
  padding: 0.7rem 0.5rem;
  overflow:hidden!important;
  border-bottom: 2px solid ${(props) => props.error ? errorBorder : extraLightBorder};
`;

export const SearchFormStyled = styled.form`
  display: flex;
  justify-content: space-between;
  background: ${lightGreyBg};
  border-bottom: 2px solid ${extraLightBorder};
  margin-bottom: 0.5rem;
`;

export const SearchButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;

export const SearchIconStyled = styled(SearchIcon)`
  color: ${secondaryText};
  height: 21px !important;
  width: 21px !important;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      color: ${mainText};
    }
  }
`;

export const SearchInputLabel = styled.p`
  margin-top: 0.5rem;
`;

export const DarkButton = styled.button`
  ${buttonStyle};
  font-weight: 800;
  background: ${mainText};
  color: ${mainTextInverted};

  @media (hover: hover) {
    &:hover {
      background: ${mainTextHover};
    }
  }
`;

export const LightButton = styled.button`
  ${buttonStyle};
  background: ${lightGreyBg};

  @media (hover: hover) {
    &:hover {
      background: ${lightGreyBgHover};
      color: ${mainTextHover};
    }
  }
`;

export const TextButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media (hover: hover) {
    :hover {
      color: ${mainTextHover};
    }
  }
`;

export const TextButtonWithBorder = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${secondaryText};
  border-radius: 18px;
  border: 1px solid ${lightBorder};
  padding: 6px;

  @media (hover: hover) {
    :hover {
      color: ${mainText};
      border: 1px solid ${mainText};
    }
  }
`;