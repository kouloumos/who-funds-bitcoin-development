import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { FundingRecordType, NodeData } from "src/pages/HomePage/HomePage";
import { SelectEntitySource } from "src/hooks/useSelectEntity";
import { configureImage } from "src/pages/HomePage/utils";

import { nFormatter } from "../utils";
import {
  EntityImage,
  FundingRecordWrapper,
  FundTag,
  InfoTag,
  Name,
  NameTagWrapper,
  TagWrapper,
} from "./FundingRecord.style";

type Props = {
  onEntitySelection: (
    event: any,
    entity: NodeData,
    source: SelectEntitySource
  ) => void;
} & FundingRecordType;

const FundingRecord = ({
  amount,
  btc,
  details,
  year,
  src,
  entity,
  onEntitySelection: selectEntity,
}: Props) => {
  const renderYear = () => {
    if (Array.isArray(year)) {
      if (year.length === 2) return `${year[0]}-${year[1]}`;
      return `since ${year[0]}`;
    } else return year;
  };

  const renderDetailsTags = () => {
    const isGrant = amount;
    if (isGrant) {
      // grant
      if (details === undefined) return ["GRANT"];
      if (Array.isArray(details)) return details;
      return [details];
    } else {
      // employe record
      if (details === undefined) return [];
      if (Array.isArray(details)) return details;
      return [details];
    }
  };

  return (
    <FundingRecordWrapper key={entity.name}>
      <EntityImage width={20} src={configureImage(entity)} />
      <NameTagWrapper>
        <Name onClick={() => selectEntity(undefined, entity, "record")}>
          {entity.name}
        </Name>
        <TagWrapper>
          {renderDetailsTags().map((tag) => (
            <FundTag>{tag.toUpperCase()}</FundTag>
          ))}
          {btc && <FundTag>{`${btc} BTC`}</FundTag>}
          {amount && <FundTag>{`$${nFormatter(amount)}`}</FundTag>}
          {year && <FundTag>{renderYear()}</FundTag>}
        </TagWrapper>
      </NameTagWrapper>
      {src && (
        <a href={src} target="_blank" rel="noreferrer">
          <InfoTag icon={faInfoCircle} />
        </a>
      )}
    </FundingRecordWrapper>
  );
};

export default FundingRecord;
