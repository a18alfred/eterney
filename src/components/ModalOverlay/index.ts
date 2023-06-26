import styled from 'styled-components';
import { appearance } from '../../theme/annimations';

export const MenuModalOverlay = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  background: transparent;
`;

export const ModalOverlay = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, .33);
  z-index: 99;
  animation: ${appearance} 1s linear forwards;
`;