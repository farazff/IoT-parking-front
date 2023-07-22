import { createContext, useEffect, useState } from "react";
import { getSessionToken } from "../utils/LocalStorage";

export const GeneralDataContext = createContext<any>(null);

export const GeneralDataProvider = (props: any) => {
  const [logedIn, setLogedIn] = useState(false);
  const sessiontoken = getSessionToken();

  useEffect(() => {
    if (sessiontoken) {
      setLogedIn(true);
    }
  }, [sessiontoken]);

  return (
    <GeneralDataContext.Provider value={[logedIn, setLogedIn]}>
      {props.children}
    </GeneralDataContext.Provider>
  );
};
