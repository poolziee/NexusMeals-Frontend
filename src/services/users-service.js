import req from "./nex-axios";

const browseChefs = async (address) => {
  return req.post("/users/chefs", address).then((response) => {
    return Promise.resolve(response.data);
  });
};

export default {
  browseChefs,
};
