/**
 * Trash/delete icon rendered via react-native-svg.
 */

import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface DeleteIconProps {
  size?: number;
  color?: string;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({
  size = 20,
  color = '#D32F2F',
}) => (
  <Svg width={size} height={size} viewBox="0 0 26 30" fill="none">
    <Path
      d="M1 6.5H3.58333M3.58333 6.5H24.25M3.58333 6.5V25.75C3.58333 26.4793 3.8555 27.1788 4.33997 27.6945C4.82444 28.2103 5.48152 28.5 6.16667 28.5H19.0833C19.7685 28.5 20.4256 28.2103 20.91 27.6945C21.3945 27.1788 21.6667 26.4793 21.6667 25.75V6.5M7.45833 6.5V3.75C7.45833 3.02065 7.73051 2.32118 8.21497 1.80546C8.69944 1.28973 9.35652 1 10.0417 1H15.2083C15.8935 1 16.5506 1.28973 17.035 1.80546C17.5195 2.32118 17.7917 3.02065 17.7917 3.75V6.5M10.0417 13.375V21.625M15.2083 13.375V21.625"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DeleteIcon;
