/**
 * Chevron left icon rendered via react-native-svg.
 */

import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface ChevronLeftIconProps {
  size?: number;
  color?: string;
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({
  size = 24,
  color = '#333333',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
      fill={color}
    />
  </Svg>
);

export default ChevronLeftIcon;
