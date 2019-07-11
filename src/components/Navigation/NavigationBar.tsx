import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { MenuList, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    content: {
      paddingLeft: theme.spacing(6),
    },
  }),
);
interface NavigationBarProps {
  location: any;
  routesList: any;
}

export const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  useStyles();
  return (
    <MenuList>
      {props.routesList.map((route: any, key: number) => {
        return (
          <MenuItem component={Link} to={route.path}
                    selected={props.location.pathname === route.path}
                    key={key}>
            {route.name}<br/>
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default withRouter(NavigationBar);
