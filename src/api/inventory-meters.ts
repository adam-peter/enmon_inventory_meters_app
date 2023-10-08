import axios from "axios";

export const getMeters = async (authData: AuthData): Promise<Meter[]> => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_INVENTORY_API_FIELDS,
      {
        data: authData,
      },
    );
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const updateMeter = async (authData: AuthData, updatedData: Meter) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_INVENTORY_API}/${updatedData.id}`,
      {
        jwt: authData.jwt,
        user: authData.user,
        data: updatedData,
      },
    );
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
