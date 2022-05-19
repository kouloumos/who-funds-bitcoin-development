import React, { useCallback, useMemo, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useWindowSize } from "src/hooks";
import { SelectEntitySource } from "src/hooks/useSelectEntity";

import { EntityType, FundingRecordType, NodeData } from "../../HomePage";
import { configureImage } from "../../utils";
import {
  DetailsContainerWrapper,
  DetailsContainer,
  EntityImageWrapper,
  EntityImage,
  TitleSection,
  Description,
  SectionTitle,
  CloseButton,
  FundingDetailsContainer,
  ToggleDetails,
  MissingTag,
} from "./SelectionDetails.style";
import { FundingRecord, SocialLinks } from "./components";


const IMAGE_HEIGHT = 70;
const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 58;

type Props = {
  onSelectionClose: () => void;
  selectedEntity: EntityType;
  onEntitySelection: (
    event: any,
    entity: NodeData,
    source: SelectEntitySource
  ) => void;
};

const SelectionDetails = ({
  selectedEntity,
  onSelectionClose: closeSelection,
  ...rest
}: Props) => {
  const [, height] = useWindowSize();
  const [showMore, setShowMore] = useState(false);

  const { grantees, employees } = useMemo(() => {
    const grantees: FundingRecordType[] = []; // who this entity supports with grants
    const employees: FundingRecordType[] = []; // who this entity employes;
    selectedEntity.grantees.forEach((grantee) => {
      if (grantee.isEmployee) employees.push(grantee);
      else grantees.push(grantee);
    });
    return { grantees, employees };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //@TODO better implementation for container sizing
  const containerMaxHeight = useCallback(() => {
    const remainingHeight =
      height - NAVBAR_HEIGHT - FOOTER_HEIGHT - IMAGE_HEIGHT / 2 - 25;
    return remainingHeight;
  }, [height]);

  //@TODO better implementation for container sizing
  const fundingDetailsHeight = () => {
    var height = containerMaxHeight() - 25 - 20;
    if (selectedEntity.entity.description) height -= 186;
    return height;
  };

  const description = useMemo(() => {
    if (!selectedEntity.entity.description) {
      return {
        text: ``,
        more: false,
      };
    }

    const descriptionParts = selectedEntity.entity.description
      .replace(/.{210}\S*\s+/g, "$&@")
      .split(/\s+@/);
    const text = descriptionParts.shift();
    const more = descriptionParts.length > 0;
    return { text, more, rest: descriptionParts.join(" ") };
  }, [selectedEntity.entity.description]);

  return (
    <DetailsContainerWrapper height={containerMaxHeight()}>
      <DetailsContainer>
        <SocialLinks
          twitter={selectedEntity.entity.twitter}
          github={selectedEntity.entity.github}
          website={selectedEntity.entity.website}
        />
        <CloseButton icon={faXmark} onClick={closeSelection} />

        <EntityImageWrapper>
          <EntityImage
            width={IMAGE_HEIGHT}
            src={configureImage(selectedEntity.entity)}
          />
        </EntityImageWrapper>

        <TitleSection>
          {selectedEntity.entity.name}{" "}
          {selectedEntity.entity.missingData && (
            <MissingTag>MISSING DATA</MissingTag>
          )}
        </TitleSection>

        {selectedEntity.entity.description && (
          <Description>
            {description.text}
            {showMore && ` ${description.rest}`}
            {description.more && (
              <ToggleDetails onClick={() => setShowMore((prev) => !prev)}>
                [{showMore ? "less" : "more"}]
              </ToggleDetails>
            )}
          </Description>
        )}

        {!showMore && (
          <FundingDetailsContainer height={fundingDetailsHeight()}>
            {employees.length > 0 && <SectionTitle>Employees</SectionTitle>}
            {employees.map((employee) => (
              <FundingRecord
                {...employee}
                {...rest}
                key={`${employee.entity.name}-${employee.year}`}
              />
            ))}
            {grantees.length > 0 && <SectionTitle>Supports</SectionTitle>}
            {grantees.map((grantee) => (
              <FundingRecord
                {...grantee}
                {...rest}
                key={`${grantee.entity.name}-${grantee.year}`}
              />
            ))}
            {selectedEntity.funders.length > 0 && (
              <SectionTitle>
                Funding Source{selectedEntity.funders.length > 1 ? "s" : ""}
              </SectionTitle>
            )}
            {selectedEntity.funders.map((funder) => (
              <FundingRecord
                {...funder}
                {...rest}
                key={`${funder.entity.name}-${funder.year}`}
              />
            ))}
          </FundingDetailsContainer>
        )}
      </DetailsContainer>
    </DetailsContainerWrapper>
  );
};

export default SelectionDetails;
