import { PasswordField, TextareaField, TextField } from '@/components/form-field';
import { createFormHookContexts, createFormHook } from '@tanstack/react-form';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    TextareaField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
