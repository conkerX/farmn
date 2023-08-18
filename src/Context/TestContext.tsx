import * as React from "react";

const TestContext = React.createContext(null);

export const TestProvider = (props: any) => {
  const [test, setTest] = React.useState();

  const value = [test, setTest];

  return <TestContext.Provider value={value} />;
};

export const useTest = () => {
  const context = React.useContext(TestContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
