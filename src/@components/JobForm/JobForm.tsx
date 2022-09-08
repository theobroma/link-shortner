import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
  email: string;
  password: string;
};

const JobForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // watch input value by passing the name of it
  //   console.log(watch('example'));

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <label
          htmlFor="email"
          className={`mb-2 block text-sm font-bold ${
            errors.email ? 'text-red-400' : 'text-purple-400'
          }`}
        >
          Email
        </label>
        <input
          type="text"
          //   name="email"
          id="email"
          placeholder="hey@chrisoncode.io"
          className={`block w-full border-b-2 bg-transparent py-2 px-4 outline-none  placeholder:text-purple-500 focus:bg-purple-600 ${
            errors.email
              ? 'border-red-400 text-red-300'
              : 'border-purple-400 text-purple-200'
          }`}
          {...register('email')}
          //   ref={register}
        />
        {!!errors.email && (
          <p className="mt-2 text-sm text-red-500">
            A valid email is required.
          </p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="password"
          className={`mb-2 block text-sm font-bold ${
            errors.password ? 'text-red-400' : 'text-purple-400'
          }`}
        >
          Password
        </label>
        <input
          type="password"
          //   name="password"
          id="password"
          placeholder="superduperpassword"
          className={`block w-full border-b-2 bg-transparent py-2 px-4 text-purple-200 outline-none placeholder:text-purple-500 focus:bg-purple-600 ${
            errors.password ? 'border-red-400' : 'border-purple-400'
          }`}
          {...register('password')}
          //   ref={register()}
        />
        {!!errors.password && (
          <p className="mt-2 text-sm text-red-500">
            Your password is required.
          </p>
        )}
      </div>

      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register('example')} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register('exampleRequired', { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {!!errors.exampleRequired && <span>This field is required</span>}

      {/* <input type="submit" /> */}

      <button
        type="submit"
        className="inline-block rounded bg-yellow-500 py-2 px-5 text-sm text-yellow-800 shadow"
      >
        Submit
      </button>
    </form>
  );
};

export default JobForm;
