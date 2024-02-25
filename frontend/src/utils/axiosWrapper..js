import { useAuth0 } from "@auth0/auth0-react";

export default function useAxios(url, method, data) {
  const { getAccessTokenSilently } = useAuth0();
  const callSecureApi = async () => {
    const token = await getAccessTokenSilently();

    let response;
    if (data) {
      response = await fetch(`${import.meta.env.VITE_SERVER_URL}/` + url, {
        method: method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
    } else {
      response = await fetch(`${import.meta.env.VITE_SERVER_URL}/` + url, {
        method: method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    const responseData = await response?.json();
    if (!responseData.success) throw new Error("Error at success.");
    
    return responseData;
  };
  return callSecureApi;
}
