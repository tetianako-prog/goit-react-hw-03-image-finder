import axios from 'axios';

const API_KEY = '20559470-5ee6005a5b9d05f63754ea23b';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const getPhotos = (searchQuery, currentPage = 1) => {
  return axios
    .get(
      `?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${currentPage}&orientation=horizontal&per_page=12`,
    )
    .then(res => res.data.hits);
};
const photoApi = { getPhotos };

export default photoApi;
