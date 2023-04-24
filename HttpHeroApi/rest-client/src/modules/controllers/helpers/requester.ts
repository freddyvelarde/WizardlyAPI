import axios from "axios";
import BodyRequest from "../../../interfaces/bodyRequest";

interface RequestsResponse {
  failed: boolean;
  data: [] | {};
}

export const getRequest = async ({
  url,
  headers,
}: BodyRequest): Promise<RequestsResponse> => {
  try {
    const RESPONSE = await axios.get(url, { headers });
    return { failed: false, data: RESPONSE.data };
  } catch (error) {
    return { failed: true, data: {} };
  }
};
