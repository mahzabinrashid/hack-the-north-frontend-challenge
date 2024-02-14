import React from "react";
import styled from "styled-components";

interface EventSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  eventTypeFilter: string;
  setEventTypeFilter: (filter: string) => void;
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;


  option {
 
    cursor: pointer;
  }
`;

const EventSearchFilter: React.FC<EventSearchFilterProps> = React.memo(
  ({ searchQuery, setSearchQuery, eventTypeFilter, setEventTypeFilter }) => {
    return (
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterSelect
          value={eventTypeFilter}
          onChange={(e) => setEventTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="workshop">Workshop</option>
          <option value="tech_talk">Tech Talk</option>
          <option value="activity">Activity</option>
        </FilterSelect>
      </SearchContainer>
    );
  }
);

export default EventSearchFilter;
