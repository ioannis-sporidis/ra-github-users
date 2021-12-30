import { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  // github user, repos and followers states
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // remaining requests states
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error state
  const [error, setError] = useState({ show: false, msg: "" });

  // Toggle error
  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  // check remaining requests
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };

  // Search github user
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    console.log(response);
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, "select another username");
    }
    checkRequests();
    setIsLoading(false);
  };

  // UseEffect
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
