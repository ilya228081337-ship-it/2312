import { Button } from 'reactstrap';

interface NPSubmitButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const NPSubmitButton: React.FC<NPSubmitButtonProps> = ({
  type = 'submit',
  onClick,
  disabled,
  children
}) => {
  return (
    <Button color="primary" type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};
