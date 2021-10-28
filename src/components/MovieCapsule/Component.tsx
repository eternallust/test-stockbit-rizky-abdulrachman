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
    <div
      onClick={onClick}
      key={keyComponent}
      ref={refComponent}
      className="movie"
    >
      <div className="movie-content">
        <img src={imgSrc} onClick={onClickImg} className="movie-image" />
        <div className="movie-info">
          <span className="movie-title">{title}</span>
        </div>
      </div>
    </div>
  );
};

Component.defaultProps = {
  refComponent: null,
};

export default Component;
