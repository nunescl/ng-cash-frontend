import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="bg-black flex text-gray-600 text-xs py-1 px-1 pl-2 text-center	select-none">
      <div className="mx-auto flex bg-black">
        <Image
          src="/../public/logo_ng.png"
          alt=""
          className="w-14 "
          sizes="real"
          width={20}
          height={20}
        />
        <h1 className="my-auto mx-2 bg-black text-l">NG.CASH</h1>
      </div>
    </header>
  );
}
