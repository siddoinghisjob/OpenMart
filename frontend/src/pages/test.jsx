import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function Test() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState();
  const callSecureApi = async (e) => {
    try {
      e.preventDefault();
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("number", number);
      formData.append("email", email);
      formData.append("test", 0);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/test`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "test" : 0,
          "name" : name,
          "email" : email,
          "number" : number
        }),
      });

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div>
      <form>
        <input onChange={(e) => setName(e.target.value)} />
        <input onChange={(e) => setEmail(e.target.value)} />
        <input onChange={(e) => setNumber(e.target.value)} />
        <button onClick={callSecureApi}>Submit</button>
        <span>{message}</span>
      </form>
    </div>
  );
}
