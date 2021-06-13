import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { Pressable, View } from "react-native";
import styled from "styled-components/native";

import { LocationContext } from "../../../services/location/location.context";
import { Text } from "react-native";
import { locations } from "../../../services/location/location.mock";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 10px;
  width: 100%;
`;

function getMatchingOptions(text: string): string[] {
  let filteredKeys = Object.keys(locations).filter((x) =>
    x.toLowerCase().includes(text.toLowerCase())
  );
  return filteredKeys.sort(levenshteinDistance);
};

function levenshteinDistance (s, t) {
  if (!s.length) return t.length;
  if (!t.length) return s.length;

  return Math.min(
      levenshteinDistance(s.substr(1), t) + 1,
      levenshteinDistance(t.substr(1), s) + 1,
      levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
  ) + 1;
}

export const Search = () => {
  const { search, keyword } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [matchingOptions, setMatchingOptions] = useState([]);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword])

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a place"
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        icon="map"
        value={searchKeyword}
        style={{}}
        onChangeText={(text) => {
          let options = getMatchingOptions(text);
          setMatchingOptions(options);
          setSearchKeyword(text);
        }}
      />
      {matchingOptions.length > 0 && searchKeyword.length > 0 && (
        <View style={{backgroundColor: 'grey', flex: 1}}>
          {matchingOptions.map(x => (
            <Pressable onPress={() => {
              setSearchKeyword(x);
              search(x);
              setMatchingOptions([]);
            }}
              key={`press-${x}`}
            >
              <Text key={`press-text-${x}`}>{x}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </SearchContainer>
  );
};
