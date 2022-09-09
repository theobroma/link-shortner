import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { nanoid } from '@reduxjs/toolkit';

import { useAppSelector } from '../../@store/configureStore';
import { linksSelector } from '../../@store/link/selectors';
import AppError from '../UI/AppError/AppError';
import LoadingPage from '../UI/LoadingPage/LoadingPage';

import classes from './Shortens.module.scss';

const Shortens = () => {
  const [copiedLinks, setCopiedLink] = useState<string | null>(null);
  const {
    items: links,
    error,
    isError,
    // isFetching,
    isLoading,
    // isSuccess,
  } = useAppSelector(linksSelector);

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLink(link);
    });
  };

  return (
    <section className={classes.Shortens}>
      <div className="container">
        {/* loading */}
        {!!isLoading && <LoadingPage />}
        {/* error */}
        {!!isError && <AppError error={error} />}
        {/* results */}
        {links.length > 0 &&
          links.map((item) => (
            <AnimatePresence key={nanoid()}>
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
