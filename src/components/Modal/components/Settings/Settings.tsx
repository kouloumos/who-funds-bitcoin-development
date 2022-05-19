import React, { useState } from "react";
import { Select, SelectChangeEvent } from "@mui/material";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import {
  OptionsChevron,
  SelectionContent,
  SelectionWrapper,
  SettingsMenuItem,
  SettingsOutlinedInput,
  Title,
} from "./Settings.style";

const Settings = () => {
  const [projects, setProjects] = useState<string[]>([]);
  const options = [
    "Bitcoin Core",
    "Lightning",
    "Research",
    "Lightning Dev Kit",
    "rust-bitcoin",
    "Bitcoin Dev Kit",
  ];

  const handleChange = (event: SelectChangeEvent<typeof projects>) => {
    const {
      target: { value },
    } = event;
    setProjects(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <>
      <Title>Filter by Work</Title>
      <Select
        input={<SettingsOutlinedInput />}
        multiple
        displayEmpty
        IconComponent={() => null}
        inputProps={{ sx: { padding: "0 !important" } }}
        renderValue={(selected) => {
          return (
            <SelectionWrapper>
              {selected.length === 0 ? (
                <em>Show All</em>
              ) : (
                <SelectionContent>
                  {selected.map((value, index) => (
                    <span>{`${value}${
                      selected.length - 1 !== index ? ", " : ""
                    }`}</span>
                  ))}
                </SelectionContent>
              )}
              <OptionsChevron icon={faChevronDown} />
            </SelectionWrapper>
          );
        }}
        MenuProps={{
          // MenuListProps: {
          //   style: {
          //     padding: "0px",
          //     backgroundColor: "red",
          //   },
          // },
          PaperProps: {
            style: {
              // backgroundColor: theme.colors.black,
              marginTop: "10px",
            },
          },
        }}
        value={projects}
        onChange={handleChange}
      >
        {options.map((option) => (
          <SettingsMenuItem value={option}>{option}</SettingsMenuItem>
        ))}
      </Select>
    </>
  );
};

export default Settings;
