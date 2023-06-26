import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { animNames } from '../../theme/annimations';
import { NAME_SPEED_LOOP } from '../../constants/settings';

const NamesWrapper = styled.div<{ top?: number }>`
  z-index: 1;
  position: absolute;
  animation: ${animNames} ${NAME_SPEED_LOOP}s linear infinite;
  top: ${(props) => props.top || 0}px;

  --webkit-transform: translateZ(0);
  --moz-transform: translateZ(0);
  --ms-transform: translateZ(0);
  --o-transform: translateZ(0);
`;

interface NamesProps {
	nameElements: ReactNode[];
	height: number;
}

const Names = React.memo(({ nameElements, height }: NamesProps) => {
	return (
		<>
			<NamesWrapper>
				{nameElements}
			</NamesWrapper>
			<NamesWrapper top={height}>
				{nameElements}
			</NamesWrapper>
		</>
	);
});

export default Names;
