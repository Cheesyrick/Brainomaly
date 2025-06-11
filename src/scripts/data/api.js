import { API_ENDPOINT } from "../config";

const StoryAPI = {
  async getStories() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_ENDPOINT.STORIES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result.listStory;
  },
};

export default StoryAPI;
