import { keyframes } from 'styled-components';

export const appearance = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const animNames = keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-${
            window.innerHeight
    }px);
  }
`;

export const animStar = (height: number) => keyframes`
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-${height}px);
  }
`;
