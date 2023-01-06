import axios,{AxiosRequestConfig,AxiosResponse} from "axios";

// we will use this amazing free dog api and declare our client
const client = (() => {
  return axios.create({
    baseURL: "https://swapi.dev/api/"
  });
})();

// the request function which will destructure the response
// as it's shown in the Dog CEO API
const request = async function<T> (options:AxiosRequestConfig) {
  // success handler
  const onSuccess = function (response:AxiosResponse<T>) {
    console.log(response.data);
    
    return response.data;
  };

  // error handler
  const onError = function (error:any) {
    console.log(error);
    
    return Promise.reject(error.response);
  };

  // adding success and error handlers to client
  return client<T>(options).then(onSuccess).catch(onError);
};

export default request;
