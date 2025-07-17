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
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-400 font-[family-name:var(--font-geist-sans)]">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center text-white mt-20 md:mt-32">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            FileNest
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg max-w-2xl mx-auto">
            Secure, simple file management - Create folders, upload your files,
            and access them anywhere. Organize your digital life effortlessly
            with FileNest.
          </p>
        </div>

        <div className="mt-16 md:mt-24 pb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
