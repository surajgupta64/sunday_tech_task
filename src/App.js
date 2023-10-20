import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
} from "@mui/material";
import "./App.css";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import data from "./data.json";

function App() {
  const [value1, setValue1] = useState("1");
  const [all, setAll] = useState(false);
  const [checked1, setChecked1] = React.useState(data.map((item) => false));
  const [allFlatPayouts, setAllFlatPayouts] = React.useState("");
  const [FlatPayouts, setFlatPayouts] = React.useState(
    data.map((_, index) => ({ sub_product_id: index + 1, percentage: "" }))
  );

  const handleAllFlatPayouts = (e) => {
    setAllFlatPayouts(e.target.value);
    const updatedChecked = data.map((_, index) => ({
      sub_product_id: index + 1,
      percentage: e.target.value,
    }));
    setFlatPayouts(updatedChecked);
    console.log([]);
  };

  const handleFlatPayouts = (e) => {
    const updatedFlatPayouts = FlatPayouts.map((item, index) => {
      if (`${index + 1}` === e.target.name) {
        // Subtract 1 to match the 0-based array index
        return { ...item, percentage: Number(e.target.value) }; // Update the percentage for the specified index
      }
      return item; // Return the unchanged item for other indices
    });
    setFlatPayouts(updatedFlatPayouts);
  };

  useEffect(() => {
    var trueIndexes = [];
    checked1.forEach(function (value, index) {
      if (value === true) {
        trueIndexes.push(index);
      }
    });

    var filteredData = FlatPayouts.filter(
      (item, index) =>
        trueIndexes.includes(index) &&
        item.percentage !== "" &&
        item.percentage !== null
    );
    console.log(filteredData);
  }, [checked1, FlatPayouts]);

  const handleChange = (event) => {
    setValue1(event.target.value);
    if (event.target.value !== "1") {
      const updatedChecked = data.map((_, index) => ({
        sub_product_id: index + 1,
        percentage: "",
      }));
      setFlatPayouts(updatedChecked);
    } else {
      const updatedChecked = data.map((_, index) => ({
        sub_product_id: index + 1,
        percentage: allFlatPayouts,
      }));
      setFlatPayouts(updatedChecked);
    }
  };

  const handleChange1 = (e) => {
    const updatedChecked = data.map(() => true);
    setChecked1(updatedChecked);
    setAll(false);
  };
  const handleChange2 = () => {
    const updatedChecked = data.map(() => false);
    setChecked1(updatedChecked);
    setAll(true);
  };

  const handleCategoryClick = (e) => {
    const updatedChecked = [...checked1];
    updatedChecked[e.target.name] = !updatedChecked[e.target.name];
    setChecked1(updatedChecked);
    if (updatedChecked[e.target.name]) {
      const updatedFlatPayouts = FlatPayouts.map((item, index) => {
        if (`${index}` === e.target.name) {
          // Subtract 1 to match the 0-based array index
          return { ...item, percentage: allFlatPayouts }; // Update the percentage for the specified index
        }
        return item; // Return the unchanged item for other indices
      });
      setFlatPayouts(updatedFlatPayouts);
    } else {
      const updatedFlatPayouts = FlatPayouts.map((item, index) => {
        if (`${index}` === e.target.name) {
          // Subtract 1 to match the 0-based array index
          return { ...item, percentage: "" }; // Update the percentage for the specified index
        }
        return item; // Return the unchanged item for other indices
      });
      setFlatPayouts(updatedFlatPayouts);
    }
    
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {data?.map((item, index) => (
        <div
          className="d-flex justify-content-between align-items-center mb-2"
          key={item.id}
        >
          <FormControlLabel
            label={item.category_name}
            control={
              <Checkbox
                name={`${index}`}
                checked={checked1[index] ? true : false}
                onChange={(e) => handleCategoryClick(e)}
              />
            }
          />

          <div className="d-flex align-items-center gap-2">
            <input
              className="form-control form-control-sm"
              style={{ width: "50px", border: "1px solid #898888" }}
              disabled={checked1[index] ? false : true}
              name={`${index + 1}`}
              value={FlatPayouts[index].percentage}
              onChange={(e) => handleFlatPayouts(e)}
              aria-label=".form-control-sm example"
            ></input>
            <span style={{ fontWeight: "600" }}>%</span>
          </div>
        </div>
      ))}
    </Box>
  );

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-2">
      <div style={{ width: "500px" }}>
        <div className="d-flex gap-3 mx-2">
          <ClearIcon color="primary" />
          <span style={{ fontWeight: "700" }}>
            Add Proposed Products & Payout
          </span>
        </div>
        <select
          className="form-select mt-3 mb-1 mx-2"
          aria-label="Default select example"
        >
          <option defaultValue>OneAndro Manager</option>
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
        </select>
        <div
          className="d-flex justify-content-center "
          style={{ borderBottom: "1px solid #DAD9D9" }}
        >
          <Tabs value={0} aria-label="disabled tabs example">
            <Tab label="LOAN" />
          </Tabs>
        </div>
        <div className="mt-1 mx-2">
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group "
            name="controlled-radio-buttons-group"
            value={value1}
            onChange={(e) => handleChange(e)}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Set flat payout % for all sub-products"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Set payout % per sub-products"
            />
          </RadioGroup>
        </div>
        {value1 === "1" && (
          <div className="d-flex justify-content-between align-items-center  mt-1 mb-1 mx-2">
            <span style={{ fontWeight: "600" }}>Enter Flat payout</span>
            <div className="d-flex align-items-center gap-2">
              <input
                className="form-control form-control-sm"
                style={{ width: "50px", border: "1px solid #898888" }}
                value={allFlatPayouts}
                onChange={(e) => handleAllFlatPayouts(e)}
                aria-label=".form-control-sm example"
              ></input>
              <span style={{ fontWeight: "600" }}>%</span>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center  mt-1 mb-1 mx-2">
          <span style={{ color: "#898888", fontWeight: "600" }}>
            Sub Product
          </span>
          <span style={{ color: "#898888", fontWeight: "600" }}>Payout %</span>
        </div>

        <div className="mx-2">
          <FormControlLabel
            label="Select All"
            style={{ color: "#898888" }}
            control={
              <Checkbox
                checked={checked1.map((item) => item === true) ? true : false}
                indeterminate={!checked1.every((value) => value === true)}
                onChange={
                  all ? (e) => handleChange1(e) : (e) => handleChange2(e)
                }
              />
            }
          />
          {children}
        </div>
        <div className="mx-2 mt-2">
          <Button
            variant="contained"
            style={{
              width: "100%",
              borderRadius: "50px",
              backgroundColor: "#6a9fed",
              textTransform: "none",
              color: "#fff",
            }}
            disabled
            size="medium"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
