import { redirect } from "next/navigation";
import useAuth from "./useAuth";


export default function Protected({ children }) {
  const isAuth = useAuth();


  return isAuth ? children : redirect("/");
}