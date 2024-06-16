import Image from "next/image";

export default function PoweredBy({
  iconPath,
  name,
  url
}: {
  iconPath: string;
  name: string;
  url: string
}) {
  return (
    <a
      className="mb-4 inline-flex h-7 shrink-0 items-center gap-[9px] rounded-[50px] border-[0.5px] border-solid border-[#E6E6E6] bg-white px-3 py-4 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)]"
      href={url}
      target="_blank"
    >
      <Image src={iconPath} alt="logo" width={20} height={20}></Image>
      <span className="text-center text-base font-light leading-[normal] text-[#1B1B16]">
        Powered by {name}
      </span>
    </a>
  );
}
