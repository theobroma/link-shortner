import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../@store/configureStore';
import { createShortLinkTC } from '../../@store/link/linkSlice';

// import { Button } from 'components/Button';
// import { createShortLink, selectLoading } from 'store/slice/linkSlice';
import classes from './AppForm.module.scss';

type Inputs = {
  Url: string;
};

const AppForm = () => {
  // const loading = useSelector(selectLoading);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<Inputs> = ({ Url }) => {
    dispatch(createShortLinkTC(Url));
    reset();
  };

  return (
    <section className={classes.section}>
      <div className="container">
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="url"
            placeholder="Shorten a link here..."
            className={classes.input}
            {...register('Url', {
              required: 'Please add a link',
              pattern: {
                value:
                  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
                message: 'Please enter a valid url',
              },
            })}
            style={{
              outlineColor: errors.Url
                ? 'var(--secondary-300)'
                : 'currentColor',
              outlineWidth: errors.Url ? '4px' : '1px',
            }}
            // disabled={loading === 'loading'}
          />
          <button
            type="submit"
            className="inline-block rounded bg-yellow-500 py-2 px-5 text-sm text-yellow-800 shadow"
          >
            Shorten it!
          </button>
          {/* <Button
            variant="square"
            type="submit"
            size="medium"
            disabled={loading === 'loading'}
          >
            Shorten it!
          </Button> */}
          {!!errors.Url && (
            <div className={classes.error}>{errors.Url.message}</div>
          )}
        </form>
      </div>
    </section>
  );
};

export { AppForm };
