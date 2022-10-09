/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";

import { FundingType, LinkData, NodeData } from "src/pages/HomePage/HomePage";
import entitiesData from "src/data/entities.json";

import miscFundingData from "src/data/funding/funding.json";
import BrinkData from "src/data/funding/Brink.json";
import OKCoinData from "src/data/funding/OKCoin.json";
import HRFData from "src/data/funding/HRF.json";
import GeminiData from "src/data/funding/Gemini.json";
import SpiralData from "src/data/funding/Spiral.json";
import BitMexData from "src/data/funding/BitMex.json";
import CoinbaseData from "src/data/funding/Coinbase.json";
import VinteumData from "src/data/funding/Vinteum.json";

import miscEmploymentData from "src/data/funding/employment.json";
import ChaincodeData from "src/data/funding/Chaincode.json";
import BlockstreamData from "src/data/funding/Blockstream.json";
import DCIData from "src/data/funding/DCI.json";

interface FundingJsonType extends FundingType {
  source: string;
  target: string;
}

const employmentSources = {
  Chaincode: ChaincodeData.employs,
  Blockstream: BlockstreamData.employs,
  DCI: DCIData.employs,
  Spiral: SpiralData.employs,
};

const grantSources = {
  Chaincode: ChaincodeData.funding,
  Brink: BrinkData.funding,
  OKCoin: OKCoinData.funding,
  HRF: HRFData.funding,
  Gemini: GeminiData.funding,
  Spiral: SpiralData.funding,
  BitMex: BitMexData.funding,
  Coinbase: CoinbaseData.funding,
  VinteumData: VinteumData.funding,
};

const useCalculateFunding = (year: number) => {
  const sortedFunding = useMemo(() => {
    // helper function to get the year for the sorting function
    const extractComparisonYear = (year: number | number[]) => {
      if (Array.isArray(year)) {
        // year is specified as array [start] | [start, end]
        if (year.length === 1) return present;
        return year[year.length - 1];
      }
      return year;
    };

    const present = new Date().getFullYear();

    // add json data
    var filteredFunding: FundingJsonType[] = miscFundingData.funding.concat(
      miscEmploymentData.employment
    );
    // grants
    for (const [, fundingSource] of Object.entries(grantSources)) {
      filteredFunding.push(...fundingSource);
    }
    // employees
    for (const [, employmentSource] of Object.entries(employmentSources)) {
      filteredFunding.push(
        ...employmentSource.map((obj) => ({ ...obj, isEmployee: true }))
      );
    }

    // filter by year
    if (year !== 0) {
      filteredFunding = filteredFunding.filter((funding: FundingJsonType) => {
        if (Array.isArray(funding.year)) {
          // year is specified as array [start] | [start, end]
          if (funding.year.length === 1) return present >= year;
          return funding.year[funding.year.length - 1] >= year;
        }
        return funding.year === year;
      });
    }

    // sort by year
    return filteredFunding.sort((a, b) => {
      if (a.year && !b.year) return -1;
      if (!a.year && b.year) return 1;
      if (a.year && b.year) {
        return extractComparisonYear(b.year) - extractComparisonYear(a.year);
      }
      // year is not specify
      return 0;
    });
  }, [year]);

  const { entityGranteesNames, maxConnections } = useMemo(() => {
    var maxConnections = 0;
    // set up dictionary of grantees per entity
    var entityGranteesNames: { [entityName: string]: string[] } = {};
    for (var i = 0; i < entitiesData.entities.length; i++) {
      const entityName = entitiesData.entities[i].name;
      const entityGrants = sortedFunding.filter(
        (grant) => grant.source === entityName
      );
      entityGranteesNames[entityName] = entityGrants.map(
        (grant) => grant.target
      );

      if (entityGranteesNames[entityName].length > maxConnections) {
        maxConnections = entityGranteesNames[entityName].length;
      }
    }
    return { entityGranteesNames, maxConnections };
  }, [year]);

  const entityFundersNames = useMemo(() => {
    // set u dictionary of funders per entity
    var entityFundersNames: { [entityName: string]: string[] } = {};
    for (var i = 0; i < entitiesData.entities.length; i++) {
      const entityName = entitiesData.entities[i].name;
      entityFundersNames[entityName] = sortedFunding
        .filter((grant) => grant.target === entityName)
        .map((grant) => grant.source);
    }
    return entityFundersNames;
  }, [year]);

  const funding: LinkData[] = useMemo(
    () => sortedFunding.map((d) => Object.create(d)),
    [year]
  );
  const entities: NodeData[] = useMemo(
    () => entitiesData.entities.map((d) => Object.create(d)),
    []
  );

  return [
    maxConnections,
    entities,
    funding,
    entityGranteesNames,
    entityFundersNames,
  ] as const;
};

export default useCalculateFunding;
