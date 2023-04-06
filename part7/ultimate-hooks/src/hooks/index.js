import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (baseUrl)
      axios
        .get(baseUrl)
        .then(({ data }) => setResources(data))
        .catch(() => setResources([]));
    else setResources([]);
  }, [baseUrl]);

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((response) => setResources(resources.concat(response.data)));
  };

  const service = {
    create,
  };

  return [resources, service];
};
