import React, { memo } from "react";
import { Select, SelectChangeEvent } from "@mui/material";
import { faChevronDown /** faGear */ } from "@fortawesome/free-solid-svg-icons";

import theme from "src/theme/theme";

import {
  FundingMenuItem,
  FundingOutlinedInput,
  NavbarWrapper,
  OptionsChevron,
  // SettingsButton,
  Title,
  TotalFundingWrapper,
} from "./Navbar.style";

const availableYearOptions = [2022, 2021, 2020, 2019];

type Props = {
  selectedYear: number;
  onYearSelection: (newSelection: number) => void;
};
const Navbar = ({ onYearSelection: selectYear, selectedYear }: Props) => {
  // const [openModal, setOpenModal] = useState(false);

  const handleYearSelection = (event: SelectChangeEvent<number>) => {
    selectYear(event.target.value as number);
  };

  return (
    <>
      {/* <Modal open={openModal} onClose={() => setOpenModal(false)} /> */}
      <NavbarWrapper>
        <Title>Who Funds Bitcoin Development</Title>

        <TotalFundingWrapper>
          <Select
            input={<FundingOutlinedInput />}
            IconComponent={() => null}
            inputProps={{ sx: { padding: "0 !important" } }}
            renderValue={(value) => {
              return (
                <div>
                  {value === 0 ? "Overall" : value}
                  <OptionsChevron icon={faChevronDown} />
                </div>
              );
            }}
            MenuProps={{
              MenuListProps: {
                style: {
                  padding: "0px",
                  backgroundColor: theme.colors.black,
                },
              },
            }}
            value={selectedYear}
            onChange={handleYearSelection}
          >
            <FundingMenuItem value={0} selected={selectedYear === 0}>
              Overall
            </FundingMenuItem>

            {availableYearOptions.map((year) => (
              <FundingMenuItem
                key={year}
                value={year}
                selected={selectedYear === year}
              >
                {year}
              </FundingMenuItem>
            ))}
          </Select>
          {/* <SettingsButton icon={faGear} onClick={() => setOpenModal(true)} /> */}
        </TotalFundingWrapper>
      </NavbarWrapper>
    </>
  );
};

export default memo(Navbar);
