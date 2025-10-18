import { useState, ReactElement, Children } from 'react';
import { Formik, Form } from 'formik';
import { Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import { NPCancelButton } from './NPCancelButton';
import { NPSubmitButton } from './NPSubmitButton';

interface PageProps {
  initialValues: any;
  validationSchema?: any;
  title: string;
  children: ReactElement;
}

interface NPWizardProps {
  onSubmit: (values: any[]) => void;
  onCancel: () => void;
  title: string;
  children: ReactElement<PageProps> | ReactElement<PageProps>[];
}

export const NPWizard: React.FC<NPWizardProps> = ({
  onSubmit,
  onCancel,
  title,
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const childrenArray = Children.toArray(children) as ReactElement<PageProps>[];
  const [pageValues, setPageValues] = useState<any[]>(
    childrenArray.map(child => child.props.initialValues)
  );

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === childrenArray.length - 1;
  const currentChild = childrenArray[currentPage];

  const handleBack = (values: any) => {
    const newPageValues = [...pageValues];
    newPageValues[currentPage] = values;
    setPageValues(newPageValues);
    setCurrentPage(currentPage - 1);
  };

  const handleNext = (values: any) => {
    const newPageValues = [...pageValues];
    newPageValues[currentPage] = values;
    setPageValues(newPageValues);
    setCurrentPage(currentPage + 1);
  };

  const handleSubmit = (values: any) => {
    const newPageValues = [...pageValues];
    newPageValues[currentPage] = values;
    onSubmit(newPageValues);
  };

  return (
    <Card>
      <CardHeader>
        <h3>{title}</h3>
      </CardHeader>
      <Formik
        initialValues={pageValues[currentPage]}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={isLastPage ? handleSubmit : handleNext}
        enableReinitialize
      >
        {({ isValid, values }) => (
          <Form>
            <CardBody>
              <h4>{currentChild.props.title}</h4>
              {currentChild.props.children}
            </CardBody>
            <CardFooter className="d-flex gap-2">
              <NPCancelButton onClick={onCancel}>
                Отмена
              </NPCancelButton>
              <NPCancelButton
                onClick={() => handleBack(values)}
                disabled={isFirstPage}
              >
                Назад
              </NPCancelButton>
              {isLastPage ? (
                <NPSubmitButton type="submit" disabled={!isValid}>
                  Сохранить
                </NPSubmitButton>
              ) : (
                <NPSubmitButton type="submit" disabled={!isValid}>
                  Далее
                </NPSubmitButton>
              )}
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
