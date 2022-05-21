import React, { useState } from "react";
import { Autocomplete } from "@mui/material";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { SelectEntitySource } from "src/hooks/useSelectEntity";
import { trackEvent } from "src/utils/umami";

import { NodeData } from "../../HomePage";
import {
  FeedbackLink,
  FooterWrapper,
  SearchButton,
  SearchInput,
  SearchListBox,
} from "./Footer.style";


type Props = {
  entities: NodeData[];
  onEntitySelection: (
    event: any,
    entity: NodeData,
    source: SelectEntitySource
  ) => void;
};
const Footer = ({ entities, onEntitySelection: selectEntity }: Props) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleEntitySelection = (
    event: React.SyntheticEvent<Element, Event>,
    entity: NodeData | null
  ) => {
    if (entity !== null) {
      setShowSearch(false);
      selectEntity(undefined, entity, "search");
    }
  };

  const handleSearch = () => {
    trackEvent("search", "click");
    setShowSearch(true);
  };

  return (
    <FooterWrapper>
      <FeedbackLink
        href={`https://github.com/kouloumos/who-funds-bitcoin-development`}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("data", "click")}
      >
        data?
      </FeedbackLink>
      {showSearch ? (
        <Autocomplete
          style={{ alignSelf: "flex-start" }}
          disablePortal
          openOnFocus
          id="combo-box-demo"
          options={entities}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderInput={(params) => (
            <SearchInput
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              placeholder="Search"
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          )}
          ListboxComponent={SearchListBox}
          onChange={handleEntitySelection}
        />
      ) : (
        <SearchButton icon={faSearch} onClick={handleSearch} />
      )}
    </FooterWrapper>
  );
};

export default Footer;
