import { Field } from 'formik';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

interface NPTestForm3Props {
  disabled?: boolean;
}

export const NPTestForm3: React.FC<NPTestForm3Props> = ({ disabled = false }) => {
  return (
    <FormGroup>
      <Label for="email">Электронная почта</Label>
      <Field name="email">
        {({ field, meta }: any) => (
          <>
            <Input
              name={field.name}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              type="text"
              id="email"
              disabled={disabled}
              invalid={meta.touched && !!meta.error}
            />
            {meta.touched && meta.error && (
              <FormFeedback>{meta.error}</FormFeedback>
            )}
          </>
        )}
      </Field>
    </FormGroup>
  );
};
