import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import type { ReactNode } from 'react';

interface FormMethods {
  register: UseFormReturn<any>['register'];
  errors: UseFormReturn<any>['formState']['errors'];
  isSubmitting: boolean;
}

interface FormProps<T> {
  schema: ZodType<T>;
  onSubmit: (data: T) => void;
  children: (methods: FormMethods) => ReactNode;
  defaultValues?: T;
  className?: string;
}

function Form<T>({ schema, onSubmit, children, defaultValues, className = '' }: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className={className}>
      {children({ register: register as any, errors: errors as any, isSubmitting })}
    </form>
  );
}

export default Form;
