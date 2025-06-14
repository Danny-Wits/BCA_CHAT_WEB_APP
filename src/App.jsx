import "@mantine/core/styles.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import supabase from "./supabase";
function App() {
  const [messages, setMessages] = useState([]);
  const { data: user } = useQuery({
    queryKey: ["isAuth"],
    queryFn: isAuth,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2,
  });
  if (!user) {
    return <Login></Login>;
  }
  return <Home user={user}></Home>;
}

export async function isAuth() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  if (user) {
    return user;
  } else {
    return false;
  }
}
export async function logout() {
  await supabase.auth.signOut();
  window.location.reload();
}
export default App;
