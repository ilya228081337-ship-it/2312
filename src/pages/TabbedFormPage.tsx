import * as Yup from 'yup';
import { ReactElement } from 'react';
import { NPTabbedForm } from '../components/NPTabbedForm';
import { NPTestForm1 } from '../components/NPTestForm1';
import { NPTestForm2 } from '../components/NPTestForm2';
import { NPTestForm3 } from '../components/NPTestForm3';

interface TabProps {
  title: string;
  initialValues: any;
  validationSchema: any;
  children: ReactElement;
}

const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

export const TabbedFormPage: React.FC = () => {
  const handleSubmit = (values: any[]) => {
    console.log('firstName:', values[0].firstName);
    console.log('lastName:', values[1].lastName);
    console.log('email:', values[2].email);
  };

  const handleCancel = () => {
    console.log('onCancel');
  };

  return (
    <NPTabbedForm
      title="Форма с вкладками"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={false}
    >
      <Tab title="NPTestForm1" initialValues={{ firstName: '' }} validationSchema={Yup.object({ firstName: Yup.string().required('Обязательное поле') })}>
        <NPTestForm1 />
      </Tab>
      <Tab title="NPTestForm2" initialValues={{ lastName: '' }} validationSchema={Yup.object({ lastName: Yup.string().required('Обязательное поле') })}>
        <NPTestForm2 />
      </Tab>
      <Tab title="NPTestForm3" initialValues={{ email: '' }} validationSchema={Yup.object({ email: Yup.string().required('Обязательное поле') })}>
        <NPTestForm3 />
      </Tab>
    </NPTabbedForm>
  );
};
