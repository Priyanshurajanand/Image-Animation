import { ImageAnimation } from "../Components/ImageAnimation";
import { Hero } from "../Components/Hero";

export default function Home() {
  return (
    <>
      <main>
        <div className="relative w-full overflow-x-clip">
          <Hero />
          <ImageAnimation />
        </div>
      </main>
    </>
  );
}