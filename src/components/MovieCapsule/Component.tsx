import React from "react";

interface Props {
  title: string;
  onClick: () => void;
  onClickImg: () => void;
  keyComponent: any;
  refComponent?: any;
  imgSrc: string;
}

import "./style.scss";

const Component = ({
  onClickImg,
  onClick,
  keyComponent,
  refComponent,
  imgSrc,
  title,
}: Props) => {
  return (
    <div key={keyComponent} ref={refComponent} className="movie">
      <div className="movie-content">
        <img
          src={imgSrc}
          onClick={(e) => {
            e.preventDefault();
            onClickImg && onClickImg();
          }}
          className="movie-image"
        />
        <div className="movie-info">
          <span onClick={onClick} className="movie-title">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

Component.defaultProps = {
  refComponent: null,
};

export default Component;
