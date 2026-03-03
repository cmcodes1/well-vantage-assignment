/**
 * Chevron right icon rendered via react-native-svg.
 */

import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface ChevronRightIconProps {
  size?: number;
  color?: string;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  size = 24,
  color = '#333333',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"
      fill={color}
    />
  </Svg>
);

export default ChevronRightIcon;
