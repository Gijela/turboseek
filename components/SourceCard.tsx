import Image from "next/image";
import { ISource } from "./provide/SearchProvide";

const SourceCard = ({ source }: { source: ISource }) => {
  return (
    <div className="flex flex-col rounded border border-solid border-[#C1C1C1] p-4 md:w-auto">
      <div className="flex w-full items-center gap-2.5 ">
        <Image
          unoptimized
          src={`https://www.google.com/s2/favicons?domain=${source.link}&sz=128`}
          alt={source.link}
          className="p-1"
          width={44}
          height={44}
        />
        <div className="flex flex-col justify-center gap-1">
          <a href={source.link} target="_blank" rel="noopener noreferrer">
            <h6 className="line-clamp-2 truncate text-lg font-light font-normal leading-[normal] text-[#1B1B16] text-blue-800 underline-offset-4 hover:text-violet-700 hover:underline lg:w-[900px]">
              {source.title}
            </h6>
          </a>
          <p className="truncate text-sm font-light text-[#1B1B16]/30 lg:w-[900px]">
            {source.link}
          </p>
        </div>
      </div>
      <div className="mt-4 pl-1 pr-8 text-zinc-500">{source.snippet}</div>
    </div>
  );
};

export default SourceCard;
