"use client";

import { MainNav } from "./_components/main-nav";
import { Search } from "./_components/search";
import { UserNav } from "./_components/user-nav";

const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
