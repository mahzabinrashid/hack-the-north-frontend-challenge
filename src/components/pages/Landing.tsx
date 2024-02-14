import styled from "styled-components";
import { mediaQueries } from "src/utils/responsive";
import { FlickerAnimationKeyframes } from "../common/UI/Animation";
import { LeftStarsAndGears, RightStarsAndGears } from "src/assets/img";
import Button from "../common/UI/Button";
import theme from "src/styles/theme";
import { Link } from "react-router-dom";
import GlowText from "../common/UI/GlowText";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Heading = styled.h1`
  margin: 0px;
  line-height: 0.9em;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 600;
  text-align: center;
`;

const SubHeading = styled.p`
  font-size: clamp(16px, 5vw, 18px);
  font-weight: 400;
  margin: 40px 0px 40px 0px;
  text-align: center;

  ${mediaQueries.largeMobile} {
    margin: 30px 0px 30px 0px;
  }
`;

const Glitch = styled.img`
  max-width: 40vw;
  width: 450px;
  ${mediaQueries.large} {
    width: 35vw;
  }
  position: relative;
`;

const LeftStarsGears = styled(Glitch)`
  position: absolute;
  right: calc(50% + 290px);
  width: 300px;
  height: auto;
  animation: ${FlickerAnimationKeyframes} 1.5s infinite;
  z-index: -1;
  overflow: hidden;
  ${mediaQueries.tablet} {
    width: 250px;
    right: calc(50% + 220px);
  }
  @media (max-width: 600px) {
    width: 170px;
    right: calc(50% + 150px);
  }

  ${mediaQueries.largeMobile} {
    width: 100px;
    right: calc(50% + 85px);
  }
`;

const RightStarsGears = styled(Glitch)`
  position: absolute;
  left: calc(50% + 280px);
  width: 300px;
  height: auto;
  animation: ${FlickerAnimationKeyframes} 1.2s infinite;
  z-index: -1;
  overflow-x: hidden;
  ${mediaQueries.tablet} {
    width: 300px;
    left: calc(50% + 180px);
  }
  @media (max-width: 600px) {
    width: 200px;
    left: calc(50% + 150px);
  }
  ${mediaQueries.largeMobile} {
    width: 100px;
    left: calc(50% + 80px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  ${mediaQueries.tablet} {
    flex-direction: column;
    justify-content: center;
  }
`;

function Landing() {
  return (
    <LandingContainer>
      <Heading>
        <GlowText color={theme.colors.primary.blue}>Hack the North</GlowText>
      </Heading>
      <SubHeading>
        View events taking place. Log in to view exclusive hackers only events!
      </SubHeading>
      <LeftStarsGears src={LeftStarsAndGears} alt="" />
      <RightStarsGears src={RightStarsAndGears} alt="" />

      <ButtonContainer>
        <Link to={`/login`}>
          <Button
            gradientStartColor={theme.colors.hover.blue}
            gradientEndColor={theme.colors.hover.cyan}
            hoverGradientStartColor={theme.colors.primary.blue}
            hoverGradientEndColor={theme.colors.primary.cyan}
            boxShadow={theme.colors.primary.cyan}
            width={240}
            aria-label="Login button"
          >
            LOG IN
          </Button>
        </Link>{" "}
        <Link to={"/events"}>
          {" "}
          <Button
            gradientStartColor={theme.colors.hover.blue}
            gradientEndColor={theme.colors.hover.purple}
            hoverGradientStartColor={theme.colors.primary.blue}
            hoverGradientEndColor={theme.colors.primary.purple}
            boxShadow={theme.colors.primary.cyan}
            width={240}
            aria-label="Login button"
          >
            PUBLIC EVENTS
          </Button>
        </Link>
      </ButtonContainer>
    </LandingContainer>
  );
}

export default Landing;
