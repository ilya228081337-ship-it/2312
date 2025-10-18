import { useState, ReactElement, Children, cloneElement } from 'react';
import { Formik, Form } from 'formik';
import { Card, CardBody, CardHeader, CardFooter, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { NPCancelButton } from './NPCancelButton';
import { NPSubmitButton } from './NPSubmitButton';

interface TabProps {
  initialValues: any;
  validationSchema?: any;
  title: string;
  children: ReactElement;
}

interface NPTabbedFormProps {
  isReadOnly?: boolean;
  isEdit?: boolean;
  onSubmit: (values: any[]) => void;
  onCancel: () => void;
  title: string;
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

export const NPTabbedForm: React.FC<NPTabbedFormProps> = ({
  isReadOnly = false,
  isEdit = false,
  onSubmit,
  onCancel,
  title,
  children,
}) => {
  const [editMode, setEditMode] = useState(isEdit);
  const [activeTab, setActiveTab] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const childrenArray = Children.toArray(children) as ReactElement<TabProps>[];
  const [tabValues, setTabValues] = useState<any[]>(
    childrenArray.map(child => child.props.initialValues)
  );

  const handleEdit = () => {
    setHasInteracted(false);
    setFormKey(prev => prev + 1);
    setEditMode(true);
  };

  const handleTabChange = async (newTab: number, validateForm: any, values: any, setTouched: any) => {
    if (editMode) {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        const newTabValues = [...tabValues];
        newTabValues[activeTab] = values;
        setTabValues(newTabValues);
        setActiveTab(newTab);
      } else {
        const touchedFields: any = {};
        Object.keys(errors).forEach(key => {
          touchedFields[key] = true;
        });
        setTouched(touchedFields);
      }
    } else {
      setActiveTab(newTab);
    }
  };

  const handleSubmit = (values: any) => {
    const newTabValues = [...tabValues];
    newTabValues[activeTab] = values;
    onSubmit(newTabValues);
    if (!isReadOnly) {
      setEditMode(false);
      setHasInteracted(false);
    }
  };

  const isEditing = isReadOnly ? false : editMode;
  const currentChild = childrenArray[activeTab];

  return (
    <Card>
      <CardHeader>
        <h3>{title}</h3>
      </CardHeader>
      <Formik
        key={`${formKey}-${activeTab}`}
        initialValues={tabValues[activeTab]}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount={false}
        validateOnChange={hasInteracted}
        validateOnBlur={hasInteracted}
      >
        {({ validateForm, values, setTouched, isSubmitting, errors }) => (
          <Form>
            <Nav tabs>
              {childrenArray.map((child, index) => (
                <NavItem key={index}>
                  <NavLink
                    className={activeTab === index ? 'active' : ''}
                    onClick={() => handleTabChange(index, validateForm, values, setTouched)}
                    style={{ cursor: 'pointer' }}
                  >
                    {child.props.title}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <CardBody>
              <div onChange={() => isEditing && setHasInteracted(true)} onBlur={() => isEditing && setHasInteracted(true)}>
              <TabContent activeTab={activeTab}>
                {childrenArray.map((child, index) => (
                  <TabPane key={index} tabId={index}>
                    {activeTab === index && cloneElement(child.props.children, { disabled: !isEditing })}
                  </TabPane>
                ))}
              </TabContent>
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
