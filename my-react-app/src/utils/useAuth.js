import { createContext, useContext, useMemo} from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { API,USERS } from "../constants";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    //add code to compare username and password, if match then go below code
      const email = data.email;
      //console.log(email);
      try{
      const url = API + USERS + `/${email}`;
      const response = await axios.get(url);
      //console.log(response.data);
      
      const  {user_password } = response.data[0];
       //console.log("show res :" + user_password);
      if (user_password === data.password)
      {  //doning something
        //console.log("good news , your login successfully!") ;
        setUser(response.data[0]);
        navigate("/", { replace: true });
      }
      else{

      }
    }
    catch(error){
      console.error(error);
    }
   
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};
