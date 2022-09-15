import React from "react";
import ChartLayout from "../Chart/ChartLayout";

export default function LineChartFancy({ item_name, labels_array, children }) {
  return (
    <>
      <ChartLayout item_name={item_name} labels_array={labels_array}>
        {children}
      </ChartLayout>
    </>
  );
}
