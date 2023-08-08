'use client'
import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { ChartConfiguration } from "chart.js/dist/types";
import { darkOptions, lightOptions } from "./Themes";
import { months } from "@/helper/Util";
import { useTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const DataChart = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme()
  const [currentTheme, setCurrentTheme] = useState(lightOptions)

  
  function isCurrentThemeDark(mode: PaletteMode) : boolean {
    console.log(`current mode is : ${mode}`)
    return mode === 'dark'
  }

  const labels = months({ count: 7 });
  useEffect(() => {
    let themeToSet = isCurrentThemeDark(theme?.palette?.mode) ? darkOptions : lightOptions
    console.log(themeToSet)
    setCurrentTheme(themeToSet)

    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
          ...themeToSet,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [data,theme?.palette?.mode]);
  return <canvas ref={chartRef} />;
};
Chart.register(...registerables);

export default DataChart;