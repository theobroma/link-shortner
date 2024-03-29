import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../../@store/configureStore';
import { createShortLinkTC } from '../../@store/link/linkSlice';
import { linksSelector } from '../../@store/link/selectors';

import classes from './AppForm.module.scss';

const schema = z.object({
  Url: z.string().url({ message: 'Invalid url' }),
});

type SchemaType = z.infer<typeof schema>;

const AppForm = () => {
  const dispatch = useAppDispatch();
  const { items: links } = useAppSelector(linksSelector);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SchemaType>({
    // mode: 'onSubmit',
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = ({ Url }) => {
    const index = links.findIndex(
      (link) => link.original_link === `http://'${Url}`,
    );
    const isExist = index !== -1;
    // console.log('Url', Url);
    // console.log('index :>> ', index);
    // console.log('isExist', isExist);
    if (!isExist) {
      dispatch(createShortLinkTC(Url));
    }
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
            {...register('Url')}
            type="url"
            placeholder="Shorten a link here..."
            className={classes.input}
            style={{
              outlineColor: errors.Url ? 'red' : 'currentColor',
              outlineWidth: errors.Url ? '4px' : '1px',
            }}
          />
          <button
            type="submit"
            className="inline-block rounded bg-yellow-500 py-2 px-5 text-sm text-yellow-800 shadow"
          >
            Shorten it!
          </button>
          {!!errors.Url && (
            <span className={classes.error}>{errors.Url.message}</span>
          )}
        </form>
      </div>
    </section>
  );
};

export { AppForm };
