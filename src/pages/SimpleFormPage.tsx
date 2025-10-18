import * as Yup from 'yup';
import { NPSimpleForm } from '../components/NPSimpleForm';
import { NPTestForm1 } from '../components/NPTestForm1';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Обязательное поле'),
});

export const SimpleFormPage: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log('firstName:', values.firstName);
  };

  const handleCancel = () => {
    console.log('onCancel');
  };

  return (
    <NPSimpleForm
      title="Простая форма"
      initialValues={{ firstName: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={false}
    >
      <NPTestForm1 />
    </NPSimpleForm>
  );
};
