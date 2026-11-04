import { forwardRef, useState } from 'react';
import { assetUrl, swapProtocol } from '../config.js';

/**
 * Image that loads from the institute server (or /public for local paths).
 * On error it retries once with the other protocol (http/https), then hides itself.
 */
const Img = forwardRef(function Img({ path, alt = '', className = '', onBroken, lazy = true, ...rest }, ref) {
  const [src, setSrc] = useState(() => assetUrl(path));
  const [retried, setRetried] = useState(false);
  const [bad, setBad] = useState(false);

  function handleError() {
    if (!retried && /^https?:/.test(src)) {
      setRetried(true);
      setSrc(swapProtocol(src));
      return;
    }
    setBad(true);
    onBroken && onBroken();
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      className={[className, bad ? 'bad' : ''].filter(Boolean).join(' ') || undefined}
      onError={handleError}
      {...rest}
    />
  );
});

export default Img;
