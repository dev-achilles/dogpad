import { tpadLogoImg } from "assets";
import { UserWallet } from "~common/Wallet/UserWallet";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlokNavLogo from "./BlokPadHeader.svg";
import { DEFAULT_FORMAT } from "~utils";
 
export function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <header>
      <nav className="navbar flex flex-col lg:flex-row container">
        <Link href="/">
            <a className="text-white no-underline pr-4 flex items-center no-hover mb-3 lg:mb-0">
              <img
                src={'/brand/watchdog-logo-neue.svg'}
                alt="Logo"
                className="mr-2 -mb-1 h-45.34"
                style={{width: '300px'}}
              />
            </a>
        </Link>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:ml-auto">
          <div className="lg:mr-3 py-3 lg:py-0 flex items-center flex-wrap">
            {children}
          </div>

          <div className="relative py-3 wallet-connector">
            <UserWallet connectSize="sm" />
            <div className="absolute right-0">
              <CurrentTime />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function CurrentTime() {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="opacity-70 text-gray-300 tracking-wide"
      style={{ fontSize: "0.75rem" }}
    >
      {now.utc().format(DEFAULT_FORMAT)} UTC
    </div>
  );
}
