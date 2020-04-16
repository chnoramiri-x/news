import React from "react";
const NewsContext = React.createContext();

const NewsProvider = props => {
  const [state, setState] = React.useState({
    news: [],
    addNews: newEntry => {
      const news = state.news;
      news.push(newEntry);
      setState({
        ...state,
        news
      });
    }
  });

  return (
    <NewsContext.Provider value={state}>{props.children}</NewsContext.Provider>
  );
};
const NewsConsumer = NewsContext.Consumer;

export default NewsProvider;
export { NewsConsumer };
