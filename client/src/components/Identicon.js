import React, { useRef, useEffect } from 'react';
import { update } from 'jdenticon';

const Identicon = ({ value, size, ...rest }) => {
  const icon = useRef(null);
  useEffect(() => {
    update(icon.current, value);
  }, [value]);

  return (
    <svg {...rest} data-jdenticon-value={value} height={size} ref={icon} width={size} />
  );
};

export default Identicon;