import React from 'react';
import {withResizeDetector} from 'react-resize-detector';
import Theme from './themes'

const CustomComponent = ({width, height}) => <Theme width={width} height={height}/>;

export default withResizeDetector(CustomComponent);