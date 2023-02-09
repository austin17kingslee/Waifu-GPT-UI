import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import star from "src/assets/images/website/deco-star.png";

type FloatingStarProps = {
  speed: number,
  style?: any,
};

const FloatingStar = ({ speed, style }: FloatingStarProps) => {
  return (
    <div className="star" style={style}>
      <Parallax speed={speed} >
        <img src={star} alt="star" className="star__image" />
      </Parallax>
    </div>
  );
};
export default FloatingStar;
