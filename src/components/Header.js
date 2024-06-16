import React from "react";

const Header = () => (
  <header className="py-10 bg-white">
    <div className="container mx-auto">
      <div className="flex gap-2">
        <div className="flex flex-col gap-[3px]">
          <div className="w-7 h-2 rounded-sm bg-[#cc99ff]"></div>
          <div className="w-5 h-2 rounded-sm bg-[#191b32]"></div>
          <div className="w-5 h-2 ml-2 rounded-sm bg-[#d0fd0b]"></div>
        </div>
        <h1 className="text-lg font-bold">Buildform</h1>
      </div>
    </div>
  </header>
);

export default Header;
