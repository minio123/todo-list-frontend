import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

// MUI Components
import { Typography } from "@mui/material";

const Charts = () => {
  const data = [
    { label: "Done", value: 10, color: "#00C49F" },
    { label: "Pending", value: 10, color: "#FFBB28" },
    { label: "Overdue", value: 10, color: "#ff4242ff" },
  ];

  const sizing = {
    margin: 0,
    hideLegend: true,
  };
  //   const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    return `${params.label} - ${params.value}`;
    // const percent = params.value / TOTAL;
    // return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "600" }}>
        November 2025 Todo's
      </Typography>
      <PieChart
        series={[
          {
            outerRadius: "90%",
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
            fontWeight: 600,
          },
        }}
        {...sizing}
      />
    </>
  );
};

export default Charts;
