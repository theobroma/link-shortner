import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
          className={`block font-bold text-sm mb-2 ${
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
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
            errors.email
              ? 'text-red-300 border-red-400'
              : 'text-purple-200 border-purple-400'
          }`}
          {...register('email')}
          //   ref={register}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">
            A valid email is required.
          </p>
        )}
      </div>

      <div className="mb-8">
        <label
          htmlFor="password"
          className={`block font-bold text-sm mb-2 ${
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
          className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-purple-200 focus:bg-purple-600 placeholder-purple-500 ${
            errors.password ? 'border-red-400' : 'border-purple-400'
          }`}
          {...register('password')}
          //   ref={register()}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-2">
            Your password is required.
          </p>
        )}
      </div>

      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register('example')} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register('exampleRequired', { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      {/* <input type="submit" /> */}

      <button
        type="submit"
        className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm"
      >
        Submit
      </button>
    </form>
  );
};

export default JobForm;
