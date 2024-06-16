"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ISearchContextProp {
  promptValue: string;
  setPromptValue: Dispatch<SetStateAction<string>>;
  googleSearch: (question: string) => void;
  sources: any[];
  similarQuestions: string[];
  loading: boolean
  reset: () => void
}

const SearchContext = createContext<ISearchContextProp>(
  {} as ISearchContextProp,
);

export interface ISource {
  title: string;
  link: string;
  snippet: string;
}

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [promptValue, setPromptValue] = useState<string>("");
  const [sources, setSources] = useState<ISource[]>([]);
  const [similarQuestions, setSimilarQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const googleSearch = async (question: string) => {
    setLoading(true);

    let result = await fetch("/api/google/search", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    let {
      organic,
      relatedSearches = [],
      peopleAlsoAsk = [],
    } = await result.json();
    setSources(organic);

    let similarQuestions: string[] = [
      ...(relatedSearches
        ? relatedSearches.map((item: any) => item.query || item.title)
        : []),
      ...(peopleAlsoAsk ? peopleAlsoAsk.map((item: any) => item.question) : []),
    ];
    setSimilarQuestions(similarQuestions);

    setLoading(false);
  };

  const reset = () => {
    setPromptValue('')
    setSources([])
    setSimilarQuestions([])
    setLoading(false)
  }

  useEffect(() => {
    promptValue && googleSearch(promptValue);
  }, [promptValue]);

  return (
    <SearchContext.Provider
      value={{
        promptValue,
        setPromptValue,
        googleSearch,
        sources,
        similarQuestions,
        loading,
        reset
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext) as ISearchContextProp;
};
