import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-900  to-blue-400 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:cursor-pointer mt-10 mr-12 rotate-90 text-2xl text-white">
            |||
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="/register">Register</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/login">Login</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <main className="">
        <div className="text-center text-white px-4 mt-16">
          <h1 className="text-6xl font-semibold tracking-tight">FileNest</h1>
          <p className="mt-8">
            Secure, simple file management - Create folders, upload your files,
            and access them anywhere. Organize your digital life effortlessly
            with FileNest.
          </p>
        </div>
        <div></div>
      </main>
    </div>
  );
}
