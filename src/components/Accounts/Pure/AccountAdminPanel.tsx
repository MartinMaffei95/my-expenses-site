import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type AccountAdminPanelProps = {
  redirectFx: Function;
};
const AccountAdminPanel = ({ redirectFx }: AccountAdminPanelProps) => {
  return (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }} onClick={() => redirectFx('/account/add')}>
        <ListItemIcon>
          <MdAdd />
        </ListItemIcon>
        <ListItemText primary="Nueva cuenta" />
      </ListItemButton>
    </List>
  );
};

export default AccountAdminPanel;
