import { COLORS, FONTS, PLOT_COLORS } from "@/src/constants";
import React from "react";
import { View } from "react-native";
import Card from "../Card/Card";

import { useAssessmentStore } from "@/src/store/assessmentStore";
import { BarChart, CurveType } from "react-native-gifted-charts";
import LegendItem from "../LegendItem/LegendItem";
const QuizzesChart = () => {
  const { assessments } = useAssessmentStore();
  const plotsData = React.useMemo(() => {
    return assessments
      .filter((ass) => ass.type !== "exam")
      .map((item, index) => {
        return {
          value: (item.score / item.total) * 100,
          frontColor: PLOT_COLORS[index],
          label: item.title.split(":")[0],
        };
      });
  }, [assessments]);

  return (
    <Card
      style={{
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          paddingBottom: 30,
          marginTop: 20,
        }}
      >
        <BarChart
          barWidth={20}
          noOfSections={3}
          barBorderRadius={4}
          minHeight={5}
          frontColor={COLORS.gray}
          data={plotsData}
          yAxisThickness={0}
          xAxisThickness={0}
          width={320}
          isAnimated
          animationDuration={300}
          gradientColor={COLORS.red}
          xAxisLabelTextStyle={{
            fontFamily: FONTS.bold,
            color: COLORS.black,
            display: "none",
          }}
          yAxisTextStyle={{
            fontFamily: FONTS.bold,
            color: COLORS.black,
          }}
          yAxisLabelSuffix="%"
          showLine
          rotateLabel
          roundToDigits={1}
          lineConfig={{
            curved: true,
            color: COLORS.red,
            curveType: CurveType.QUADRATIC,
            isAnimated: true,
            dataPointsColor: COLORS.red,
            animationDuration: 300,
            thickness: 2,
          }}
        />
      </View>
      <View
        style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", padding: 10 }}
      >
        {plotsData.map((data, index) => (
          <LegendItem label={data.label} key={index} color={data.frontColor} />
        ))}
      </View>
    </Card>
  );
};

export default QuizzesChart;
