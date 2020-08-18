import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import CardMedia from '@material-ui/core/CardMedia';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Colors from "../../Styles/Colors";


import logo_cimo from "../../Assets/sidebar_logos/cimo_logo.svg";
import logo_ipb from "../../Assets/sidebar_logos/ipb_logo.svg";
import logo_anses from "../../Assets/sidebar_logos/anseslogo.jpg";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: Colors.grayUltraLight,
  },
  dividerHeader: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: 350,
  },
  tableCont: {
    marginTop: 15,
    marginBottom: 15,
  },
  cardImg: {
    borderRadius: 5,
    maxWidth: '200px',
    objectFit: 'contain',
    height: 'auto',
    backgroundColor: 'rgba(255,255,255,1)',
    opacity: 1,
    margin: "5px 50px 5px 1px",
    textAlign: 'center'
  }
}));

export default function BacteriaNew() {
  const classes = useStyles();

  const rows = [
    {food: "Meat and meat products"},
    {food: "Eggs and egg products"},
    {food: "Milk and dairy products"},
    {food: "Grains and cereal products"},
    {food: "Seafood"},
    {food: "Fruits"},
    {food: "Vegetables"},
    {food: "Legumes"},
    {food: "Beverages"},
    {food: "Sugars"},
    {food: "Multi-ingredient/composite foods"},
  ];

  const rowsAgent = [
    {agent: "Salmonella spp.,"},
    {agent: "Campylobacter spp.,"},
    {agent: "Shigatoxin producing Escherichia coli"},
    {agent: "Listeria monocytogenes"},
    {agent: "Yersinia enterocolitica"},
    {agent: "Bacillus cereus"},
    {agent: "Clostridium perfringens"},
    {agent: "Staphylococcus aureus"},
    {agent: "Norovirus"},
    {agent: "Hepatitis A virus"},
    {agent: "Hepatitis E virus"},
    {agent: "Cryptosporidium spp."},
    {agent: "Toxoplasma gondii"},
    {agent: "Giardia duodenalis"},
  ]

  return (
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
      <Grid container spacing={3}>
      
      <Grid item xs={12} md={8}>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>OVERVIEW</Typography>
        <Divider />
        <Paper className={classes.paper}>
        Pathogens-in-Foods is a database of occurrence of the most important biological hazards detected and enumerated in foods produced, commercialised and/or consumed in Europe. In the literature, there are many investigations addressing the quantification of the occurrence of biological hazards in foods surveyed at different stages in the farm-to-fork chain. Being able to access to and gather this information has become increasingly relevant in the development of pathogens’ risk assessment models, risk management tools and meta-analysis by both food researchers and food safety authorities. Nevertheless, this information is largely dispersed, disharmonised and not always accessible. Pathogens-in-Foods brings together, under a harmonised arrangement, microbiological data on the prevalence and concentration of pathogens in foods surveyed from European farms, processing facilities, retail establishments and restauration. Pathogens-in-Foods has been constructed to facilitate data access and retrieval of detection and enumeration data from food/pathogen combinations: 
        according to: survey’s country and time period, food chain stage, packing status, temperature at retail and other food attributes.
        <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <TableContainer component={Paper} className={classes.tableCont}>
        <Table className={classes.table} aria-label="simple table" size="small">
            <TableHead>
            <TableRow>
                <TableCell><b>Foods</b></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow key={row.food}>
                <TableCell component="th" scope="row">{row.food}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Grid>
        <Grid item xs={12} md={6}>
        <TableContainer component={Paper} className={classes.tableCont}>
        <Table className={classes.table} aria-label="simple table" size="small">
            <TableHead>
            <TableRow>
                <TableCell><b>Pathogens</b></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rowsAgent.map((rowAgent) => (
                <TableRow key={rowAgent.agent}>
                <TableCell component="th" scope="row">{rowAgent.agent}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Grid>
        </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Constructing Pathogens in Foods</Typography>
        <Divider />
        <Paper className={classes.paper}>
        Scientific articles are identified through systematic literature searches using key terms in English, Spanish, French and Portuguese. Once a scientific paper is considered adequate in terms of relevance and methodological quality; information on study features, food class, food chain stage, microbiological methods, and prevalence and enumeration results are excerpted. The data extracted from the published studies are: country, year and duration of survey, pathogen, serotype/serovar/phage when applicable, packing status of food (unpacked/packed), stage in the food chain (farm, mid-processing, end-processing, retail, restauration), temperature at retail (chilled, ambient, frozen, NA), food category (beverages, composite, dairy, grains, eggs, fruits, legumes, meat, seafood, vegetables and sugars), a sub-hierarchy for every food category, species for animal origin food (bovine, ovine, caprine, equine and mixed), ready-to-eat (RTE) status, sample weight, detection method, sample size, number of positive samples after enrichment, isolation (yes/no), enumeration method, limit of quantification (LoQ), number of samples above LoQ, histogram of frequencies for counts, mean microbial concentration, standard deviation, mechanism to handle substitution and other information. So far, the Pathogens-in-Foods Database contains microbiological survey results extracted from ~1000 primary studies published since 1998, and continues to grow as more relevant articles are published. Pathogens-in-Foods is still under development, and it is expected to evolve into an interface capable of executing simple statistical calculations that will help researchers to enhance their productivity regarding data analysis.

        </Paper>
      </Grid>

        <Grid item xs={12} md={12}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Maintained By</Typography>
        <Divider />
        <Paper className={classes.paper}>
            
        <Grid container direction="row">
            <CardMedia
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
        />
        </Grid>

        </Paper>
        </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
}