import { useState, ReactElement, cloneElement } from 'react';
import { Formik, Form } from 'formik';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { NPCancelButton } from './NPCancelButton';
import { NPSubmitButton } from './NPSubmitButton';

interface NPSimpleFormProps {
  isReadOnly?: boolean;
  isEdit?: boolean;
  initialValues: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  validationSchema?: any;
  title: string;
  children: ReactElement;
}

export const NPSimpleForm: React.FC<NPSimpleFormProps> = ({
  isReadOnly = false,
  isEdit = false,
  initialValues,
  onSubmit,
  onCancel,
  validationSchema,
  title,
  children,
}) => {
  const [editMode, setEditMode] = useState(isEdit);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleEdit = () => {
    setHasInteracted(false);
    setFormKey(prev => prev + 1);
    setEditMode(true);
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
    if (!isReadOnly) {
      setEditMode(false);
      setHasInteracted(false);
    }
  };

  const isEditing = isReadOnly ? false : editMode;

  return (
    <Card>
      <CardHeader>
        <h3>{title}</h3>
      </CardHeader>
      <Formik
        key={formKey}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount={false}
        validateOnChange={hasInteracted}
        validateOnBlur={hasInteracted}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <CardBody>
              <div onChange={() => isEditing && setHasInteracted(true)} onBlur={() => isEditing && setHasInteracted(true)}>
                {cloneElement(children, { disabled: !isEditing })}
              </div>
            </CardBody>
            <CardFooter className="d-flex gap-2">
              <NPCancelButton onClick={onCancel}>
                Отмена
              </NPCancelButton>
              {!isReadOnly && (
                <>
                  {!isEditing ? (
                    <NPSubmitButton type="button" onClick={handleEdit}>
                      Изменить
                    </NPSubmitButton>
                  ) : (
                    <NPSubmitButton type="submit" disabled={Object.keys(errors).length > 0 || isSubmitting}>
                      Сохранить
                    </NPSubmitButton>
                  )}
                </>
              )}
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
