import React from "react";

type ResultCardProps = {
  variant: "points" | "hearts";
  values: number;
};

const ResultCard = ({ values, variant }: ResultCardProps) => {
  return <div>{variant}</div>;
};

export default ResultCard;
