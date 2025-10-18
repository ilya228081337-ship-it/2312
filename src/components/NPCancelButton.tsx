import { Button } from 'reactstrap';

interface NPCancelButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const NPCancelButton: React.FC<NPCancelButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <Button color="secondary" onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};
