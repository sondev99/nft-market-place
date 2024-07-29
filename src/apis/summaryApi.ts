import axiosClient from "@/axios/apiConfig";
import { API_URL_SUMMARY } from "@/constant/apiConstant";

const url = API_URL_SUMMARY;
const summaryApi = {
  getSummary: () => {
    return axiosClient.get(`${url}`);
  },
};

export default summaryApi;
