import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/session";
import LogoutBtn from "@/components/LogoutBtn";

const Nav = async () => {
  const session = await getSession();

  return (
    <nav className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:cursor-pointer mt-2 mr-2 md:mt-12 md:mr-12 rotate-90 text-3xl md:text-4xl text-white">
          |||
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!session?.user ? (
            <>
              <DropdownMenuItem>
                <a href="/register">Register</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/login">Login</a>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <LogoutBtn />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Nav;
