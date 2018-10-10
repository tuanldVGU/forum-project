import request from 'superagent';
function getData()
{
  return request
    .get('/api/category/getDetail')
    .then((res) => {
      const result = res.body;
      if (result.status === 'successful') {
       return result.data;
      } else {
        return "";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
