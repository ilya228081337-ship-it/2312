import { Field } from 'formik';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

interface NPTestForm1Props {
  disabled?: boolean;
}

export const NPTestForm1: React.FC<NPTestForm1Props> = ({ disabled = false }) => {
  return (
    <FormGroup>
      <Label for="firstName">Имя</Label>
      <Field name="firstName">
        {({ field, meta }: any) => (
          <>
            <Input
              name={field.name}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              type="text"
              id="firstName"
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
