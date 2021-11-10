import React from 'react';

import { Image } from '@bit/xto10x.common.index';

import config from '../../utils/config';

const CustomImage = React.memo(function CustomImage(props) {
  let { src } = props;
  if (props.src?.includes('assets/images')) {
    src = `${config.publicUrl}/${src}`;
  }

  return <Image {...props} src={src} />;
});

export default CustomImage;
