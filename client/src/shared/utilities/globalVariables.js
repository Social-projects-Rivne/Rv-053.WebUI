// dev or prod
const dev_prod_flag = 'prod';
const api_dev_server = 'http://localhost:5001';
const api_prod_server = 'http://eeeeevent-rv053-webui-back.herokuapp.com';

export const api_server_url = (() => {
  if (dev_prod_flag === 'dev') {
    return api_dev_server;
  }
  if (dev_prod_flag === 'prod') {
    return api_prod_server;
  }
})();
