import httpService from "./http.service";

const qualitiesEndPoint = "quality/";

const qualitiesService = {
  get: async () => {
    const { data } = await httpService.get(qualitiesEndPoint);
    console.log(data);
    return data;
  }
};

export default qualitiesService;
