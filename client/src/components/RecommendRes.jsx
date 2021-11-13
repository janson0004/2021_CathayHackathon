import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { FaStar } from "react-icons/fa";
import Restaurant from "../views/images/restaurant.jpg";
const RecommendRes = ({ restaurant }) => {
  useEffect(() => {
    console.log(restaurant.name);
  }, [restaurant]);
  return (
    <div>
      <Wrapper>
        <PhotoDiv src={Restaurant} />
        <Information>
          <Title>{restaurant.name}</Title>
          <RatingWrapper>
            <Rating>{restaurant.rating}</Rating>
            {[...Array(Math.round(restaurant.rating))].map((star, index) => (
              <CustomFaStar key={index} active={true ? 1 : 0} />
            ))}

            {[...Array(5 - Math.round(restaurant.rating))].map(
              (star, index) => (
                <CustomFaStar key={index} active={false ? 1 : 0} />
              )
            )}
          </RatingWrapper>
          <Text>{restaurant.address}</Text>
        </Information>
      </Wrapper>
    </div>
  );
};

export default RecommendRes;

const Wrapper = styled.div`
  display: flex;
  padding: 8px 8px;
  height: 120px;
  width: 286px;
  box-shadow: 0px 1px 5px 0px #0000001a;
  overflow-x: hidden;
  overflow: hidden;
`;

const PhotoDiv = styled.img`
  border-radius: 4px;
  margin-right: 10px;

  /* width: 80px; */
  flex-basis: 35%;
`;

const Information = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #4c4c4c;
  flex-basis: 65%;
  padding-top: 10px;
`;

const Title = styled.span`
  font-size: 14px;
`;

const RatingWrapper = styled.div`
  display: flex;
  padding: 8px 8px 0px 0px;
`;
const Rating = styled.span`
  font-size: 12px;
  margin-right: 8px;
`;

const CustomFaStar = styled(FaStar)`
  font-size: 11px;
  color: ${(props) => (props.active ? "#ffb800" : "#aab8c2")};
  margin-right: 1px;
`;

const Text = styled.div`
  word-wrap: break-word;
`;
