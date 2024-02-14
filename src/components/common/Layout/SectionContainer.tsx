import styled from "styled-components";
import { mediaQueries } from "src/utils/responsive";

const SectionContainer = styled.div`
  margin: 120px 40px 100px 40px;
  padding-bottom: 40px;

  ${mediaQueries.tablet} {
    margin: 100px 20px 80px 20px;
  }

  ${mediaQueries.largeMobile} {
    margin: 100px 20px 40px 20px;
    padding-bottom: 20px;
  }
`;

export default SectionContainer;
