import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useAppSelector } from '../../@store/configureStore';
import { linksSelector } from '../../@store/link/selectors';

import classes from './Shortens.module.scss';

const Shortens = () => {
  const [copiedLinks, setCopiedLink] = useState<string | null>(null);
  const links = useAppSelector(linksSelector).items;

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLink(link);
    });
  };

  if (!links.length) return null;

  return (
    <section className={classes.Shortens}>
      <div className="container">
        {links.map((item) => (
          <AnimatePresence key={item.code}>
            <motion.div
              className={classes.item}
              data-active={copiedLinks === item.full_short_link2}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <span>{item.original_link}</span>
              <span>{item.full_short_link2}</span>
              <button
                type="submit"
                className="inline-block rounded bg-yellow-500 py-2 px-5 text-sm text-yellow-800 shadow"
                onClick={() => copyToClipboard(item.full_short_link2)}
              >
                {copiedLinks === item.full_short_link2 ? 'Copied!' : 'Copy'}
              </button>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
};

export { Shortens };
