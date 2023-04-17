import * as React from "react";

const TestContext = React.createContext(null);

const TestContextProvider = () => {
  const [test, setTest] = React.useState("");

  return <TestContext.Provider value={[test, setTest]} />;
};

const useTest = () => {
  const context = React.useContext(TestContext);

  if (!context) {
    throw new Error("useTest must be wrapped inside a TestContextProvider");
  }

  return context;
};
