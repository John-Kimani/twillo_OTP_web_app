import { createContext, useContext } from "react";
import TwilioAPIClient from './Apiclient';

const ApiContext = createContext();

export default function ApiProvider({children}){

    const api = new TwilioAPIClient();

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export function useAPi(){
    return useContext(ApiContext);
}