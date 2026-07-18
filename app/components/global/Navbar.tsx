import Link from "next/link";
import Logo from "../shared/Logo";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <UnmountStudio>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap py-4 md:px-16 px-6">
          <Link href="/" aria-label="jay.dev home">
            <Logo variant="mark" size="sm" />
          </Link>

          <NavLinks />

          <div className="flex items-center gap-4">
            <div className="md:flex hidden">
              <Theme />
            </div>
            <div className="md:hidden flex items-center gap-3">
              <Theme />
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
