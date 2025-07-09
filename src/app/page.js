import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import HomepageCard from "@/components/HomepageCard";

const features = [
  {
    title: "Create Folders",
    description: "Organize your files into custom folders for easier access.",
    icon: "📁",
  },
  {
    title: "Upload Files",
    description: "Easily upload documents, images, and more to the cloud.",
    icon: "📤",
  },
  {
    title: "Access Anywhere",
    description:
      "Your files are available whenever and wherever you need them.",
    icon: "🌐",
  },
];

export default function Home() {
  return (
    <div className="h-full bg-gradient-to-r from-blue-900  to-blue-400 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:cursor-pointer mt-10 mr-12 rotate-90 text-3xl text-white">
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
        <div className="text-center text-white px-4 mt-18">
          <h1 className="text-6xl font-semibold tracking-tight">FileNest</h1>
          <p className="mt-8">
            Secure, simple file management - Create folders, upload your files,
            and access them anywhere. Organize your digital life effortlessly
            with FileNest.
          </p>
        </div>
        <div className="mt-18 pb-4 px-4 flex flex-col gap-6 items-center">
          {features.map((feature, i) => (
            <HomepageCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
