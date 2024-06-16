import Image from "next/image";
import { FC, useEffect, useState } from "react";

type TInputAreaProps = {
  jumpPage?: () => void;
};

import { useSearch } from "./provide/SearchProvide";

const InputArea: FC<TInputAreaProps> = ({ jumpPage }) => {
  const { promptValue, setPromptValue } = useSearch();
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    promptValue && setInputValue(promptValue);
  }, [promptValue]);

  return (
    <div className="w-full max-w-[708px] cursor-pointer">
      <form
        className="mx-auto flex h-[66px] w-full transform items-center justify-between rounded-2xl border bg-white px-3 transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-[2px_2px_38px_0px_rgba(0,0,0,0.25),0px_-2px_4px_0px_rgba(0,0,0,0.25)_inset,1px_2px_4px_0px_rgba(0,0,0,0.25)_inset]"
        onSubmit={(e) => {
          e.preventDefault();
          setPromptValue(inputValue);
          jumpPage && jumpPage();
        }}
      >
        <input
          type="text"
          placeholder="在 Google 中搜索，或输入网址"
          className="focus-visible::outline-0 my-1 w-full pl-5 font-light not-italic leading-[normal] text-[#1B1B16]/30 text-black outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-xl"
          value={inputValue}
          required
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[3px] disabled:pointer-events-none disabled:opacity-75"
        >
          <Image
            unoptimized
            src={"/search.png"}
            alt="search"
            width={36}
            height={36}
          />
        </button>
      </form>
    </div>
  );
};

export default InputArea;
