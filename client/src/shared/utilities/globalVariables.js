// dev or prod
const dev_prod_flag = 'dev';
const api_dev_server = 'http://localhost:5001';
const api_prod_server = '';

export const api_server_url = (() => {
  if (dev_prod_flag === 'dev') {
    return api_dev_server;
  }
  if (dev_prod_flag === 'prod') {
    return api_prod_server;
  }
})();
