import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  // direction: 'rtl',
  palette: {
    type: 'dark',
    primary: blue,
  },
});

export default theme;