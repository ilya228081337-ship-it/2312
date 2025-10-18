import * as Yup from 'yup';
import { ReactElement } from 'react';
import { NPWizard } from '../components/NPWizard';
import { NPTestForm1 } from '../components/NPTestForm1';
import { NPTestForm2 } from '../components/NPTestForm2';
import { NPTestForm3 } from '../components/NPTestForm3';

interface PageProps {
  title: string;
  initialValues: any;
  validationSchema: any;
  children: ReactElement;
}

const Page: React.FC<PageProps> = ({ children }) => <>{children}</>;

export const WizardPage: React.FC = () => {
  const handleSubmit = (values: any[]) => {
    console.log('firstName:', values[0].firstName);
    console.log('lastName:', values[1].lastName);
    console.log('email:', values[2].email);
  };

  const handleCancel = () => {
    console.log('onCancel');
  };

  return (
    <NPWizard
      title="Многостраничная форма (Wizard)"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <Page title="NPTestForm1" initialValues={{ firstName: '' }} validationSchema={Yup.object({ firstName: Yup.string().required('Обязательное поле') })}>
        <NPTestForm1 />
      </Page>
      <Page title="NPTestForm2" initialValues={{ lastName: '' }} validationSchema={Yup.object({ lastName: Yup.string().required('Обязательное поле') })}>
        <NPTestForm2 />
      </Page>
      <Page title="NPTestForm3" initialValues={{ email: '' }} validationSchema={Yup.object({ email: Yup.string().required('Обязательное поле') })}>
        <NPTestForm3 />
      </Page>
    </NPWizard>
  );
};
