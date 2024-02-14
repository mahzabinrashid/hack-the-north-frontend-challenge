import styled from "styled-components";

interface GlowTextProps {
  color: string;
}

const GlowText = styled.span<GlowTextProps>`
  text-shadow: 0 0 10px ${(props) => props.color};

  .numbered-heading::after {
    background-color: white;
    box-shadow: 0 0 10px ${(props) => props.color};
  }
`;

export default GlowText;
