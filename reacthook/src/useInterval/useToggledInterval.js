import React from "react";

import useInterval from "./useInterval";

export const useToggledInterval = ({
  iterate,
  interval = 1000,
}) => {
  const [isAutoIterating, setIsAutoIterating] = React.useState(false);

  const onAutoIteratingChange = React.useCallback(
    ({ target: { checked } }) => setIsAutoIterating(checked),
    [setIsAutoIterating]
  );

  const autoIterate = React.useCallback(() => isAutoIterating && iterate(), [
    isAutoIterating,
    iterate,
  ]);

  useInterval(autoIterate, interval);

  return { setIsAutoIterating, isAutoIterating, onAutoIteratingChange };
};
