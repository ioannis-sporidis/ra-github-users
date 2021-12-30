import { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  // Geting state from context API
  const { isLoading } = useContext(GithubContext);

  // Displaying pages conditionaly
  // Display if page is loading
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <img src={loadingImage} alt="loading spinner" className="loading-img" />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
