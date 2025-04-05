import { createContext, useContext } from "react";

const DataContext = createContext(null)






const useData = () =>{

return useContext(DataContext)

}




export {DataContext, useData}