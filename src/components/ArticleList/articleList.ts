import { atom, useRecoilState } from 'recoil';
import{ useEffect } from "react";
import { IArticle } from "../../../services/crud-server/src/models/article";
import api from "../../api";


export const articleListState = atom({
    key: 'articleList',
    default: [] as IArticle[]
});

// Main function that pulls all the articles out of the database
// Is used in many differen't files
export function useArticleList () {

  const [ articleList, setArticleList ] = useRecoilState<IArticle[]>(articleListState);

  useEffect(() => {
    api.article
      .get()
      .then((response) => {
        setArticleList(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  return {
    articleList,
    setArticleList,
  }
}

