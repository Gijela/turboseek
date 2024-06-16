import Image from "next/image";
import { useSearch } from "./provide/SearchProvide";

const SimilarTopics = ({
  similarQuestions,
}: {
  similarQuestions: string[];
}) => {
  const { setPromptValue } = useSearch();

  return (
    <>
      <div className="flex h-auto w-full shrink-0 gap-4 bg-white">
        <div className="hidden lg:block">
          <Image
            unoptimized
            src="/favicon.png"
            alt="footer"
            width={24}
            height={24}
          />
        </div>
        <div className="flex-1 divide-y divide-[#E5E5E5]">
          <div className="flex gap-4 pb-3">
            <Image
              unoptimized
              src="/favicon.png"
              alt="footer"
              width={24}
              height={24}
              className="block lg:hidden"
            />
            <h3 className="text-base font-bold uppercase text-slate-700">
              相关搜索:
            </h3>
          </div>

          <div className="flex flex-wrap justify-between">
            {similarQuestions.map((item) => (
              <button
                className="flex w-2/6 cursor-pointer items-center gap-4 pt-3.5"
                key={item}
                onClick={() => {
                  setPromptValue(item);
                }}
              >
                <div className="flex items-center">
                  <Image
                    unoptimized
                    src="/img/arrow-circle-up-right.svg"
                    alt="footer"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-sm font-light leading-[normal] text-[#1B1B16] [leading-trim:both] [text-edge:cap]">
                  {item}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarTopics;
