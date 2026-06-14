import { COLORS, FONTS } from "@/src/constants";
import { useAssessmentStore } from "@/src/store/assessmentStore";
import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import Card from "../Card/Card";
import LegendItem from "../LegendItem/LegendItem";
import { ILIFACODE_LESSONS } from "@/src/data/ilifacode-lessons";

const QuizAssessmentAnalyticsChart = () => {
  const { assessments } = useAssessmentStore();

  const plotsData = React.useMemo(() => {
    const complete = (assessments.length / ILIFACODE_LESSONS.length) * 100;
    const incomplete = 100 - complete;
    return [
      { value: complete, color: COLORS.tertiary, label: "Completed" },
      { value: incomplete, color: COLORS.red, label: "Incomplete" },
    ];
  }, [assessments]);

  return (
    <Card
      style={{
        backgroundColor: COLORS.white,
        width: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.bold,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        Quiz Assessment Analytics
      </Text>

      <View
        style={{
          marginVertical: 20,
          alignItems: "center",
        }}
      >
        <PieChart
          donut
          isAnimated
          animationDuration={300}
          innerRadius={65}
          data={plotsData}
          radius={100}
          centerLabelComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {(
                    (assessments.length / ILIFACODE_LESSONS.length) *
                    100
                  ).toFixed(0)}
                  % {"\n"}Complete
                </Text>
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            flex: 1,
          }}
        >
          {plotsData.map((data, index) => (
            <LegendItem
              label={data.label}
              key={index}
              color={data.color}
              dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
              labelStyle={{
                fontSize: 14,
                fontFamily: FONTS.bold,
              }}
            />
          ))}
        </View>
      </View>
    </Card>
  );
};

export default QuizAssessmentAnalyticsChart;
