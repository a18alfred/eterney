import { css } from 'styled-components';
import { lightGreyBg, secondaryText } from './colors';

export const logoStyle = css`
  svg {
    height: 34px;
    width: 147px;
  }
`;

export const buttonStyle = css`
  width: 100%;
  border-radius: 5px;
  padding: 0 0.5rem;
  min-height: 3.5rem;
`;

export const scrollStyle = css`
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 7px;
  }

  @media (hover: hover) {
    :hover {
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export const inputStyle = css`
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border: none;
  background: ${lightGreyBg};
  flex: 1;
  padding: 0.7rem 0.5rem;
  box-sizing: border-box;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-input-placeholder {
    color: ${secondaryText}
  }

  ::-moz-placeholder {
    color: ${secondaryText}
  }

  :-moz-placeholder {
    color: ${secondaryText}
  }

  :-ms-input-placeholder {
    color: ${secondaryText}
  }
`;