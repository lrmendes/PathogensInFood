import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { Scope } from "@unform/core";
import { Form } from "@unform/web";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MaterialInput from "../../../Components/Inputs/MaterialInput";
//import MaterialSelect from "../../../Components/Selects/MaterialSelect";
import MaterialNativeSelect from "../../../Components/Selects/MaterialNativeSelect";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import CustomSelect from "../../../Components/Selects/CustomSelect";

import CustomAutoComplete from "../../../Components/Selects/CustomAutoComplete";

//import json_agent_count from '../../../Json/Bacteria/agent_count_tree.json';
import json_general_info from "../../../Json/Bacteria/food_characteristics.json";
//import json_agent_prevalence from '../../../Json/Bacteria/agent_prevalence_tree.json';
import json_foods from "../../../Json/Bacteria/foodclass_tree.json";
import json_agent from "../../../Json/Bacteria/agent_tree.json";
import json_general_results from "../../../Json/Bacteria/general_results.json";

import json_general_prevalence from "../../../Json/Bacteria/prevalence_data_tree.json";
import json_general_count from "../../../Json/Bacteria/count_data_tree.json";

import Colors from "../../../Styles/Colors";
import Texts from "../../../Styles/Texts";

import * as Yup from 'yup';

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
  disabledHeader: {
    backgroundColor: Colors.grayMedium,
  },
  expandedHeader: {
    
  },
  doneStepIcon: {
    color: Colors.primaryDarkHigh
  },
  selectEmpty: {
    textAlign: "left",
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  inputLabel: {
    marginTop: theme.spacing(1),
    color: Colors.grayDark,
    fontWeight: 'bold',
  },
  textInputControl: {
    fontSize: "25px",
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(1),
  },
  customBTNBack: {
    backgroundColor: Colors.grayDark,
    color: Colors.white,
    marginRight: theme.spacing(1),
    minWidth: "100px",
    "&:hover": {
      backgroundColor: Colors.grayHigh,
    },
  },
  customBTNNextRegister: {
    backgroundColor: Colors.secondaryDark,
    color: Colors.white,
    marginRight: theme.spacing(1),
    minWidth: "200px",
    "&:hover": {
      backgroundColor: Colors.secondaryUltraDark,
    },
  },
  formWide: {
    width: "100%",
  },
  heading: {
    fontWeight: "bold",
  },
}));

export default function BacteriaNew() {
  const blank_text = Texts.leave_blank;
  const required_text = Texts.required;
  const blank_text_error = Texts.blank_error;

  const form1Ref = useRef(null);
  const form2Ref = useRef(null);
  const form3Ref = useRef(null);

  const formRef = useRef(null);

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [formData,setFormData] = useState({
    form1: null,
    form2: null,
    form3: null
  })

  const [formExpanded, setFormExpanded] = useState(1); // 1: Form1 ; 2: Form2 ; 3: Form3

  const [selectedStudy, setSelectedStudy] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Tree & State of FOODS
  const jsonFoods = json_foods;
  const [data, setData] = useState(null);
  const [dataAux, setDataAux] = useState([jsonFoods]);

  // 0: Prevalence  | 1: Count | 2: Both
  const [essayType, setEssayType] = useState(-1);

  // Tree & State of PREVALENCE GENERAL
  const jsonPrevalenceGeneralInfo = json_general_prevalence;
  const [dataPrevalenceGeneralInfo, setDataPrevalenceGeneralInfo] = useState(
    {}
  );

  // Tree & State of RESULTS GENERAL
  const jsonResultsGeneral = json_general_results;

  // Tree & State of COUNT GENERAL
  const jsonCountGeneralInfo = json_general_count;
  const [dataCountGeneralInfo, setDataCountGeneralInfo] = useState({});

  // Tree & State of AGENTS
  const jsonAgent = json_agent;
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Tree & State of PREVALENCE
  const [jsonEssayPrevalence, setJsonEssayPrevalence] = useState(null);
  const [dataPrevalenceEssay, setDataPrevalenceEssay] = useState(null);
  const [dataAuxEssayPrevalence, setDataAuxEssayPrevalence] = useState([
    jsonEssayPrevalence,
  ]);

  // Tree & States of COUNT
  const [jsonEssayCount, setJsonEssayCount] = useState(null);
  const [dataCountEssay, setDataCountEssay] = useState(null);
  const [dataAuxEssayCount, setDataAuxEssayCount] = useState([jsonEssayCount]);

  // Tree & General Info
  const jsonGeneralInfo = json_general_info;
  const [dataGeneralInfo, setDataGeneralInfo] = useState({});

  const handleAgent = (event) => {
    if (event == "null" || event == "") {
      setEssayType(-1);
      setSelectedAgent(null);

      setJsonEssayCount(null);
      setDataAuxEssayCount([null]);

      setJsonEssayPrevalence(null);
      setDataAuxEssayPrevalence([null]);

    } else {
      setJsonEssayCount(jsonAgent[event].count);
      setDataAuxEssayCount([jsonAgent[event].count]);

      setJsonEssayPrevalence(jsonAgent[event].prevalence);
      setDataAuxEssayPrevalence([jsonAgent[event].prevalence]);

      setSelectedAgent(event);
    }
  };
  
  async function handleSubmitForm1(data, { reset }, event) {
    console.log(data);

    let resErrors = {}
    let haveErrors = false;
    Object.keys(data).map((value,index) => {
        let isTextField = form1Ref.current.getFieldRef(value).current || form1Ref.current.getFieldRef(value).props || true;

        if (typeof isTextField != 'boolean') {
          if (data[value] === "") {
            form1Ref.current.setFieldError(value, true);
            haveErrors = true;
            resErrors[value] = Yup.string().required();
          } else {
            form1Ref.current.setFieldError(value, false);
          }
        } else {
          if (data[value] === "") {
            if (form1Ref.current.getFieldRef(value).required) {
              form1Ref.current.setFieldError(value, true);
              haveErrors = true;
              resErrors[value] = Yup.string().required();
            }
          } else {
            form1Ref.current.setFieldError(value, false);
          }
        }
    });

    if (!haveErrors) {
      // Set Form1 Data
      setFormData({...formData, form1: data });
      // Open Form2
      setFormExpanded(2);
    }
  }

  async function handleSubmitForm2(data, { reset }, event) {
    console.log(data);

    let resErrors = {}
    let haveErrors = false;
    Object.keys(data).map((value,index) => {
        let isTextField = form2Ref.current.getFieldRef(value).current || form2Ref.current.getFieldRef(value).props || true;

        if (typeof isTextField != 'boolean') {
          if (data[value] === "") {
            form2Ref.current.setFieldError(value, true);
            haveErrors = true;
            resErrors[value] = Yup.string().required();
          } else {
            form2Ref.current.setFieldError(value, false);
          }
        } else {
          if (data[value] === "") {
            if (form2Ref.current.getFieldRef(value).required) {
              form2Ref.current.setFieldError(value, true);
              haveErrors = true;
              resErrors[value] = Yup.string().required();
            }
          } else {
            form2Ref.current.setFieldError(value, false);
          }
        }
    });

    if (!haveErrors) {
      // Set Form1 Data
      setFormData({...formData, form2: data });
      // Open Form2
      setFormExpanded(3);
    }
  }

  const handleBackForm2 = () => {
    setFormData({...formData, form1: null, form2: null });
    // Open Form2
    setFormExpanded(1);
  }

  const handleBackForm3 = () => {
    setFormData({...formData, form2: null, form3: null });
    // Open Form2
    setFormExpanded(2);
  }
  

  async function handleSubmit(data, { reset }, event) {
    //console.log(Yup.object());
    //event.preventDefault();
    //event.stopPropagation();
    //event.nativeEvent.stopImmediatePropagation();

    console.log(data);

    let resErrors = {}
    Object.keys(data).map((value,index) => {
        //console.log(value,"->",formRef.current.getFieldRef(value));
        //console.log(typeof formRef.current.getFieldRef(value));
        //console.log(value,"->",);
        //console.log("-----");

        let isTextField = formRef.current.getFieldRef(value).current || formRef.current.getFieldRef(value).props || true;
        //console.log(value," -> ",isTextField);

        if (typeof isTextField != 'boolean') {
          if (data[value] === "") {
            formRef.current.setFieldError(value, true);
            resErrors[value] = Yup.string().required();
          } else {
            formRef.current.setFieldError(value, false);
            //console.log(formRef.current);
          }
        } else {
          if (data[value] === "") {
            if (formRef.current.getFieldRef(value).required) {
              formRef.current.setFieldError(value, true);
              resErrors[value] = Yup.string().required();
            }
          } else {
            formRef.current.setFieldError(value, false);
            //console.log(formRef.current);
          }
        }
        

       /* if (typeof isTextField != 'boolean') {
          if (data[value] == "") {
            formRef.current.setFieldError(value, true);
            resErrors[value] = Yup.string().required();
          } else {
            formRef.current.setFieldError(value, false);
            //console.log(formRef.current);
          }
        } else {
        }*/
    });
  }

  const handleChange = (label, index, event) => {
    //console.log("[", index, "] Alterou: ", label, " - ", event);
    if (event != "null") {
      setData({ ...data, [label]: event });

      if (dataAux[index][event] != null) {
        let newData = dataAux;
        newData = newData.slice(0, index + 1);

        newData[index]["selected"] = event;
        newData.push(newData[index][event]);
        newData[index][event]["selected"] = "null";

        setDataAux(newData);
        /*} else {
            console.log("Tentou Alterar");
          }*/
      } else {
        let newData = dataAux;
        //console.log("Entrada: ",newData);
        newData = newData.slice(0, index + 1);
        newData[index]["selected"] = event;
        //console.log("Saida: ",newData);
        setDataAux(newData);
      }
    } else {
      //console.log("entrou1")
      let newData = dataAux;
      //console.log("Entrada: ",newData);
      newData[index]["selected"] = "null";
      newData = newData.slice(0, index + 1);
      //console.log("Saida: ",newData);
      setDataAux(newData);
    }
  };

  const handleEssayType = (event) => {
    setEssayType(event.target.value);
  };

  const handleGeneralInfo = (key, value) => {
    if (value == "null") {
      value = null;
    }
    setDataGeneralInfo({ ...dataGeneralInfo, [key]: value });
  };

  const handlePrevalenceGeneralInfo = (key, value) => {
    if (value == "null") {
      value = null;
    }
    setDataPrevalenceGeneralInfo({
      ...dataPrevalenceGeneralInfo,
      [key]: value,
    });
  };

  const handleCountGeneralInfo = (key, value) => {
    if (value == "null") {
      value = null;
    }
    setDataCountGeneralInfo({ ...dataCountGeneralInfo, [key]: value });
  };

  const validateForm = () => {
    let finalJson = {};

    //console.log("Study Info:",selectedStudy);
    finalJson["studyID"] = selectedStudy;

    //console.log("Agent Info:",selectedAgent,"Size: ",dataAux.length);
    finalJson["agent"] = selectedAgent;

    if (essayType == 0 || essayType == 2) {
      //console.log("Prevalence Info:",dataPrevalenceEssay,"Size: ",dataAux.length);
      finalJson["prevalence"] = {};
      Object.keys(dataPrevalenceEssay).map((key, value) => {
        finalJson["prevalence"][key] = dataPrevalenceEssay[key];
      });

      console.log("Prevalence General Info:", dataPrevalenceGeneralInfo);
      Object.keys(jsonPrevalenceGeneralInfo).map((key, value) => {
        finalJson["prevalence"][key] = dataPrevalenceGeneralInfo[key] || "NA";
      });
    }

    if (essayType == 1 || essayType == 2) {
      //console.log("Count Info:",dataCountEssay,"Size: ",dataAux.length);
      finalJson["count"] = {};
      Object.keys(dataCountEssay).map((key, value) => {
        finalJson["count"][key] = dataCountEssay[key];
      });

      console.log("Count General Info:", dataCountGeneralInfo);
      Object.keys(jsonCountGeneralInfo).map((key, value) => {
        finalJson["count"][key] = dataCountGeneralInfo[key] || "NA";
      });
    }
    //console.log("Food Info:",data,"Size: ",data.length);
    Object.keys(data).map((key, value) => {
      finalJson[key] = data[key];
    });

    //console.log("Food Country:",selectedCountry);
    finalJson["food_origin"] = selectedCountry;

    //console.log("General Info:",dataGeneralInfo,"Size: ",dataAux.length);
    Object.keys(jsonGeneralInfo).map((key) => {
      finalJson[key] = dataGeneralInfo[key] || "NA";
    });

    //console.log("\n\n\nFIM:");

    console.log(finalJson);
  };

  const handleEssayPrevalence = (label, index, event) => {
    console.log("[", index, "] Alterou: ", label, " - ", event);
    if (event != "null") {
      setDataPrevalenceEssay({ ...dataPrevalenceEssay, [label]: event });
      if (dataAuxEssayPrevalence[index][event] != null) {
        let newData = dataAuxEssayPrevalence;
        console.log("Entrada: ", newData);
        newData = newData.slice(0, index + 1);
        console.log("MeioTermo", newData);
        newData[index]["selected"] = event;
        newData.push(newData[index][event]);
        newData[index][event]["selected"] = "null";
        console.log("Saida: ", newData);
        setDataAuxEssayPrevalence(newData);
      } else {
        let newData = dataAuxEssayPrevalence;
        newData = newData.slice(0, index + 1);
        newData[index]["selected"] = event;
        setDataAuxEssayPrevalence(newData);
      }
    } else {
      let newData = dataAuxEssayPrevalence;
      newData[index]["selected"] = "null";
      newData = newData.slice(0, index + 1);
      setDataAuxEssayPrevalence(newData);
    }
  };

  const handleEssayCount = (label, index, event) => {
    console.log("[", index, "] Alterou: ", label, " - ", event);
    if (event != "null") {
      setDataCountEssay({ ...dataCountEssay, [label]: event });
      if (dataAuxEssayCount[index][event] != null) {
        let newData = dataAuxEssayCount;
        console.log("Entrada: ", newData);
        newData = newData.slice(0, index + 1);
        console.log("MeioTermo", newData);
        newData[index]["selected"] = event;
        newData.push(newData[index][event]);
        newData[index][event]["selected"] = "null";
        console.log("Saida: ", newData);
        setDataAuxEssayCount(newData);
      } else {
        let newData = dataAuxEssayCount;
        newData = newData.slice(0, index + 1);
        newData[index]["selected"] = event;
        setDataAuxEssayCount(newData);
      }
    } else {
      let newData = dataAuxEssayCount;
      newData[index]["selected"] = "null";
      newData = newData.slice(0, index + 1);
      setDataAuxEssayCount(newData);
    }
  };

  const jsonstudies = [
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
    "Abay_AUVFD_2012",
    "Abay_LWTFST_2017",
    "Abrahim_JAFPT_2010",
    "Agren_PVM_2016",
    "Aguado_JFP_2001",
    "Akineden_IJFM_2008",
    "Akpolat_VRC_2004",
    "Alessandria_IJFM_2010",
    "Alexopoulos_Anaerobe_2011",
    "Beaufort_LAM_2007",
    "Bolocan_JFP_2015",
    "Cetinkaya_JFS_2014",
    "Ceylan_JFQ_2008",
  ];

  const jsonCountries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American_Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua_and_Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia_and_Herzegovina",
    "Botswana",
    "Bouvet_Island",
    "Brazil",
    "British_Indian_Ocean_Territory",
    "Brunei_Darussalam",
    "Bulgaria",
    "Burkina_Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape_Verde",
    "Cayman_Islands",
    "Central_African_Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas_Island",
    "Cocos_(Keeling)_Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook_Islands",
    "Costa_Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech_Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican_Republic",
    "East_Timor",
    "Ecuador",
    "Egypt",
    "El_Salvador",
    "Equatorial_Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland_Islands_(Malvinas)",
    "Faroe_Islands",
    "Fiji",
    "Finland",
    "France",
    "France,_Metropolitan",
    "French_Guiana",
    "French_Polynesia",
    "French_Southern_Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Guernsey",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard_and_Mc_Donald_Islands",
    "Honduras",
    "Hong_Kong",
    "Hungary",
    "Iceland",
    "India",
    "Isle_of_Man",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory_Coast",
    "Jersey",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea,_Democratic_People's_Republic_of",
    "Korea,_Republic_of",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Lao_People's_Democratic_Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan_Arab_Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall_Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia,_Federated_States_of",
    "Moldova,_Republic_of",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands_Antilles",
    "New_Caledonia",
    "New_Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk_Island",
    "Northern_Mariana_Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua_New_Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto_Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian_Federation",
    "Rwanda",
    "Saint_Kitts_and_Nevis",
    "Saint_Lucia",
    "Saint_Vincent_and_the_Grenadines",
    "Samoa",
    "San_Marino",
    "Sao_Tome_and_Principe",
    "Saudi_Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra_Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon_Islands",
    "Somalia",
    "South_Africa",
    "South_Georgia_South_Sandwich_Islands",
    "Spain",
    "Sri_Lanka",
    "St._Helena",
    "St._Pierre_and_Miquelon",
    "Sudan",
    "Suriname",
    "Svalbard_and_Jan_Mayen_Islands",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian_Arab_Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania,_United_Republic_of",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad_and_Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks_and_Caicos_Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United_Arab_Emirates",
    "United_Kingdom",
    "United_States",
    "United_States_minor_outlying_islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican_City_State",
    "Venezuela",
    "Vietnam",
    "Virgin_Islands_(British)",
    "Virgin_Islands_(U.S.)",
    "Wallis_and_Futuna_Islands",
    "Western_Sahara",
    "Yemen",
    "Zaire",
    "Zambia",
    "Zimbabwe",
    "North_Europe",
    "Wales",
    "South_Europe",
    "Scotland",
    "West_Europe",
    "East_Europe",
    "Northern_Ireland",
    "EU",
  ];

  //const [jsontree,setJsonTree] = useState(jsonFoods);

  const clearData = () => {
    setDataAux([jsonFoods]);
    //setJsonTree(jsonFoods);
    setData(null);
  };

  return (
    <Grid container spacing={3}>
    </Grid>
  );
}