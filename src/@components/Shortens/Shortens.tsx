import React from 'react';
import { useAppSelector } from '../../@store/configureStore';
import { linksSelector } from '../../@store/link/selectors';
import { LinkResultType } from '../../@types';
import classes from './Shortens.module.scss';

const Shortens = () => {
  const links = useAppSelector(linksSelector).items;
  //   const links = [] as LinkResultType[];

  if (!links.length) return null;

  return (
    <section className={classes.Shortens}>
      <div className="container">
        {links.map((item) => (
          <div key={item.code} className={classes.item}>
            <span>{item.original_link}</span>
            <span>{item.full_short_link2}</span>
            <button
              type="submit"
              className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm"
            >
              Copy
            </button>
            {/* <Button variant="square">Copy</Button> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export { Shortens };
