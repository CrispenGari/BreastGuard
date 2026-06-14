import React from "react";
import { Stack } from "expo-router";
import PredictHeader from "@/src/components/Headers/PredictHeader";
import ResultsHeader from "@/src/components/Headers/ResultsHeader";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="predict"
        options={{
          header: () => <PredictHeader />,
        }}
      />
      <Stack.Screen
        name="results"
        options={{
          header: () => <ResultsHeader />,
        }}
      />
      <Stack.Screen name="image-viewer" />
    </Stack>
  );
};

export default Layout;
