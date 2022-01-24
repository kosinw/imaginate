import axios from "axios";

// const fetcher = url => axios.get(url).then(res => res.data);
const fetcher = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    if (err.response) {
      throw err.response.data.error
    }
  }
};

export default fetcher;