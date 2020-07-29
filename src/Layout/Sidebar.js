import React, { useMemo, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ListSubheader,
  Collapse,
  withStyles
} from "@material-ui/core";
import _ from "lodash";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import TagIcon from "@material-ui/icons/LocalOffer";
import CategoryIcon from "@material-ui/icons/Label";
import WineIcon from "@material-ui/icons/LocalBar";
import LayersIcon from "@material-ui/icons/Layers";
import DoneIcon from "@material-ui/icons/Done";
import GroupIcon from "@material-ui/icons/Group";
import LockIcon from "@material-ui/icons/Lock";
import StoreIcon from "@material-ui/icons/Storefront";
import { useHistory } from "react-router-dom";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CardMedia from '@material-ui/core/CardMedia';
import SvgIcon from '@material-ui/core/SvgIcon';

import Colors from '../Styles/Colors';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import drawerBG from "../Assets/cimo_bg_menu2.jpg";
import logo_menu from "../Assets/logo_menu.png";

import logo_cimo from "../Assets/sidebar_logos/cimo_logo.svg";
import logo_ipb from "../Assets/sidebar_logos/ipb_logo.svg";
import logo_anses from "../Assets/sidebar_logos/anseslogo.jpg";

import ViewListIcon from '@material-ui/icons/ViewList';

import {Divider} from '@material-ui/core';

import { ReactComponent as Bacteria } from "../Assets/Icons/bacteria.svg";
import { ReactComponent as Virus } from "../Assets/Icons/virus.svg";
import { ReactComponent as Parasite } from "../Assets/Icons/parasite.svg";


function BacteriaIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    backgroundImage: 'url(' + drawerBG + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: theme.spacing(1),
  },
  itemIcon: {
    color: '#ffffff',
  },
  /*logoImg: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    minHeight: '100px',
    backgroundImage: 'url(' + logo_menu + ')',
  },
  dividerOpacity: {
    
  },*/
  subList: {
    paddingLeft: theme.spacing(2),
  },
  itemHeader: {
    color: Colors.secondaryLight,
    fontSize: '16px',
  },
  collapseStyled: {
  },
  cardImg: {
    borderRadius: 5,
    width: '80%',
    height: 'auto',
    backgroundColor: 'rgba(255,255,255,1)',
    opacity: 0.4,
    margin: "5px 1px 5px 1px",
    textAlign: 'center'
  }
}));

const StyledListItem = withStyles({
  root: {
    color: '#ffffff',
    borderRadius: '5px',
    marginTop: '5px',
    border: `double ${Colors.transparentWhite}`,
    borderWidth: '1px 0px 0px 0px',
    "&$selected": {
      backgroundColor: Colors.secondaryDark,
      "&:hover": {
        backgroundColor: Colors.secondary,
      }
    },
    "&:hover": {
      backgroundColor: Colors.grayDark
    }
  },
  selected: {}
})(ListItem);

const StyledSubListItem = withStyles({
  root: {
    color: '#ffffff',
    borderRadius: '5px',
    "&$selected": {
      backgroundColor: Colors.secondaryDark,
      "&:hover": {
        backgroundColor: Colors.secondary,
      }
    },
    "&:hover": {
      backgroundColor: Colors.grayDark
    }
  },
  selected: {}
})(ListItem);

export default function SideBar({ isOpen, setTitle }) {
  const classes = useStyles();
  const { location, ...history } = useHistory();
  const [open, setOpen] = useState({
    db_bacteria: false,
    db_virus: false,
    db_parasite: false,
    db_study: false,
    tree_bacteria: false,
    tree_study: false,
    tree_food: false,
  });

  const routes = useMemo(
    () => [
      {
        name: "Database Management",
        listItems: [
        {
          name: "Study",
          icon: <DescriptionIcon />,
          state: "db_study",
          subListItems: [
            {
              name: "Search",
              icon: <SearchOutlinedIcon />,
              path: "/search/study",
            },
            {
              name: "Register New",
              icon: <AddCircleOutlineOutlinedIcon />,
              path: "/new/study",
            },
            {
              name: "Manage Data",
              icon: <ViewListIcon />,
              path: "/manage/study",
            }
          ]
        },
        {
          name: "Bacteria",
          icon: <SvgIcon component={Bacteria} fontSize="large" viewBox="0 0 600 476.6" className={classes.itemIcon} />,
          state: "db_bacteria",
          subListItems: [
            {
              name: "Search",
              icon: <SearchOutlinedIcon />,
              path: "/bacteria/search",
            },
            {
              name: "Register New",
              icon: <AddCircleOutlineOutlinedIcon />,
              path: "/new/bacteria",
            },
            {
              name: "Manage Data",
              icon: <ViewListIcon />,
              path: "/manage/bacteria",
            }
          ]
        },
        {
          name: "Virus",
          icon: <SvgIcon component={Virus} fontSize="large" viewBox="0 0 600 476.6" className={classes.itemIcon} />,
          state: "db_virus",
          subListItems: [
            {
              name: "Search",
              icon: <SearchOutlinedIcon />,
              path: "/search/virus",
            },
            {
              name: "Register New",
              icon: <AddCircleOutlineOutlinedIcon />,
              path: "/new/virus",
            },
            {
              name: "Manage Data",
              icon: <ViewListIcon />,
              path: "/manage/virus",
            }
          ]
        },
        {
          name: "Parasite",
          icon: <SvgIcon component={Parasite} fontSize="large" viewBox="0 0 600 476.6" className={classes.itemIcon} />,
          state: "db_parasite",
          subListItems: [
            {
              name: "Search",
              icon: <SearchOutlinedIcon />,
              path: "/search/parasite",
            },
            {
              name: "Register New",
              icon: <AddCircleOutlineOutlinedIcon />,
              path: "/new/parasite",
            },
            {
              name: "Manage Data",
              icon: <ViewListIcon />,
              path: "/manage/parasite",
            }
          ]
        },
        ]
      },
      {
        name: "Tree Management",
        listItems: [
        {
          name: "Study",
          icon: <DescriptionIcon/>,
          state: "tree_study",
          subListItems: [
            {
              name: "Study Tree",
              icon: <AccountTreeIcon />,
              path: "/tree/study/",
            },
          ]
        },
        {
          name: "Food Class",
          icon:  <FastfoodIcon />,
          state: "tree_food",
          subListItems: [
            {
              name: "Food Tree",
              icon: <AccountTreeIcon />,
              path: "/tree/food/",
            },
          ]
        },
        {
          name: "Bacteria",
          icon: <SvgIcon component={Bacteria} fontSize="large" viewBox="0 0 600 476.6" className={classes.itemIcon} />,
          state: "tree_bacteria",
          subListItems: [
            {
              name: "Agents Tree",
              icon: <AccountTreeIcon />,
              path: "/tree/bacteria/agents",
            },
            {
              name: "Count Tree",
              icon: <AccountTreeIcon />,
              path: "/tree/bacteria/count",
            },
            {
              name: "Prevalence Tree",
              icon: <AccountTreeIcon />,
              path: "/tree/bacteria/prevalence",
            },
            {
              name: "General Tree",
              icon: <AccountTreeIcon />,
              path: "/tree/bacteria/general",
            },
          ]
        },
        
        ]
      }
    ]
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{ paper: classes.drawerPaper }}
      elevation={0}
    >
      <CardMedia
          image={logo_menu}
          component="img"
          title="Logo"
        />
      <List>
      <Divider className={classes.dividerOpacity} />
      {routes.map(({ name, listItems }) => (
          <React.Fragment key={name}>
            <ListSubheader className={classes.itemHeader} component="div" disableSticky>{name}</ListSubheader>
            {listItems.map((item) => {
            return (<React.Fragment key={item.name}>
            <StyledListItem
              button
              onClick={(e) => setOpen({...open, [item.state]: !open[item.state]})}
              >
              <ListItemIcon className={classes.itemIcon}> {item.icon} </ListItemIcon>
              <ListItemText primary={item.name} />
              {open[item.state] ? <ExpandLess /> : <ExpandMore />}
            </StyledListItem>
            <Collapse in={open[item.state]} className={classes.subList} timeout="auto" unmountOnExit>
            <List component="div" className={classes.collapseStyled} disablePadding>
            {item.subListItems.map((subItem) => {
              return (<StyledSubListItem
              selected={location.pathname === subItem.path}
              key={subItem.name}
              button
              onClick={() => {history.push(subItem.path); setTitle(subItem.name+" ("+item.name+")")}}
              >
              <ListItemIcon className={classes.itemIcon}>{subItem.icon}</ListItemIcon>
              <ListItemText primary={subItem.name} />
            </StyledSubListItem>)
            })}
            </List>
            </Collapse>
            </React.Fragment>)
            })}
            <Divider className={classes.dividerOpacity} />
          </React.Fragment>
      ))}

      </List>
      
      {/*<CardMedia
          className={classes.cardImg}
          image={logo_cimo}
          component="img"
          title="Logo"
        />
        <CardMedia
          className={classes.cardImg}
          image={logo_ipb}
          component="img"
          title="Logo"
        />
        <CardMedia
          className={classes.cardImg}
          image={logo_anses}
          component="img"
          title="Logo"
      />*/}
    </Drawer>
  );
}

/*
  const routes = useMemo(
    () => [
      {
        name: "Home",
        path: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Search Database",
        group: [
          {
            name: "Bacteria",
            path: "/search/bacteria",
            icon: <SearchOutlinedIcon />,
          },
          {
            name: "Virus",
            path: "/search/virus",
            icon: <SearchOutlinedIcon />,
          },
          {
            name: "Parasite",
            path: "/search/parasite",
            icon: <SearchOutlinedIcon />,
          },
        ],
      },
      {
        name: "Register Items",
        group: [
          {
            name: "Studies",
            path: "/new/study",
            icon: <AddCircleOutlineOutlinedIcon />,
          },
          {
            name: "Bacteria",
            path: "/new/bacteria",
            icon: <AddCircleOutlineOutlinedIcon />,
          },
          {
            name: "Virus",
            path: "/new/virus",
            icon: <AddCircleOutlineOutlinedIcon />,
          },
          {
            name: "Parasite",
            path: "/new/parasite",
            icon: <AddCircleOutlineOutlinedIcon />,
          },
        ],
      },
      {
        name: "System Management",
        group: [
          {
            name: "Users",
            path: "/users",
            icon: <GroupIcon />,
          },
        ],
      },
    ],
    []
  );

  const Item = ({ name, path, icon }) => (
    <StyledListItem
      selected={location.pathname === path}
      button
      onClick={() => {history.push(path); setTitle(name)}}
    >
      <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </StyledListItem>
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{ paper: classes.drawerPaper }}
      elevation={0}
    >
      <CardMedia
          image={logo_menu}
          component="img"
          title="Logo"
        />
      <List>
        {routes.map(({ name, path, icon, group }) =>
          _.isEmpty(group) ? (
            <Item key={path} name={name} path={path} icon={icon} />
          ) : (
            <React.Fragment key={name}>
              <ListSubheader className={classes.itemIcon} component="div">{name}</ListSubheader>
              {group.map((props) => (
                <Item key={props.path} {...props} />
              ))}
            </React.Fragment>
          )
        )}
      </List>
    </Drawer>
  );
}
*/