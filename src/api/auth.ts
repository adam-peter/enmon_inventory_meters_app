import axios from "axios";

export const getAuthData = async (
  identifier: string,
  password: string,
): Promise<AuthData> => {
  try {
    const response = await axios.post(import.meta.env.VITE_AUTH_API, {
      identifier,
      password,
    });

    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
