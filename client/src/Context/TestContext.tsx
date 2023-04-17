import * as React from "react";

const TestContext = React.createContext(null);

const TestProvider = () => {
  const [test, setTest] = React.useState();

  const value = [test, setTest];

  return <TestContext.Provider value={value} />;
};

const useTest = () => {
  const context = React.useContext(TestContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
