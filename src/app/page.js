import HomepageCard from "@/components/HomepageCard";
import Nav from "@/components/Nav";

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
      <Nav />
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
