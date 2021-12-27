// Imports
import { useContext } from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  // Using Context API to access global state.
  // Fetching the repos states
  const { repos } = useContext(GithubContext);

  // Iterate through repos with the "reduce" method
  let languages = repos.reduce((total, item) => {
    // deconstruct the language property from each repo
    const { language } = item;
    // if that language doesn't exists (is null), return and do nothing
    if (!language) return total;
    // if the language exists but it's not it the object that we construct,
    // add it and set the value to 1
    if (!total[language]) {
      total[language] = { label: language, value: 1 };
      // if the language is already in the object,
      // copy the previous properties with the spread operator,
      // update the value property by adding one to the laready existing one
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      };
    }
    // The reduce method requires us to return the constructed object
    return total;
  }, {});

  // In order not to over-populate the chart, we are going to display
  // only the 5 most popular languages.
  // In order to do that, we will transform the object back to an array
  // and slice it to only keep the first 5 instances

  // To achieve that we use the Object.values method.
  // It transforms the object to an array of the values.
  languages = Object.values(languages)
    // chain the sort method to get them in order from
    // most to least popular
    .sort((a, b) => {
      return b.value - a.value;
    })
    // slice the array to keep only the top 5.
    .slice(0, 5);
  console.log(languages);

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* Pass the data dynamically to the chart */}
        <Pie3D data={languages} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
