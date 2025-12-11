"use client";
import { useState } from "react";
import Image from "next/image";

const galleryImages = [
  // { id: 1, src: "/project-lequiz/gallery-1.png", alt: "Le Quiz Dashboard" },
  { id: 1, src: "/photos/image-1.png", alt: "LeQuiz Dashboard" },
  { id: 2, src: "/photos/image-2.png", alt: "Quiz Interface" },
  { id: 3, src: "/photos/image-3.png", alt: "Class Management" },
  { id: 4, src: "/photos/image-4.png", alt: "Assignment View" },
  { id: 5, src: "/photos/image-5.png", alt: "Student Portal" },
  { id: 6, src: "/photos/image-6.png", alt: "Teacher Dashboard" },
];

interface TechIconProps {
  src: string;
  alt: string;
  size?: number;
  containerSize?: number;
  className?: string;
}

const TechIcon = ({ src, alt, className, size = 20, containerSize }: TechIconProps) => {
  const containerWidth = containerSize || Math.max(size + 8, 24);

  return (
    <span
      className={`inline-flex items-center justify-center mx-1 relative${className ? ` ${className}` : ""}`}
      style={{
        width: `${containerWidth}px`,
        height: `${containerWidth}px`,
        top: '-2px'
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="pointer-events-none select-none object-contain"
        style={{ maxWidth: 'none', maxHeight: 'none' }}
        draggable={false}
      />
    </span>
  );
};

interface IntroductionPageProps {
  onTechStackClick: () => void;
}

export const IntroductionPage = ({ onTechStackClick }: IntroductionPageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="space-y-6 pb-12">
      <h2 className="mb-2 text-3xl text-black font-bold tracking-tight">
        Introduction
      </h2>
      <div className="space-y-4 leading-relaxed">
        <p className="leading-relaxed">
          LeQuiz is an <strong>interactive quiz</strong> application designed as a comprehensive <strong>Learning Management System. </strong>
          Students can seamlessly join classes and complete assignments from their teachers, while educators have the power
          to create diverse assessments featuring <strong>multiple choice</strong>, <strong>multiple answers</strong>, <strong>matching</strong>,
          and <strong>true/false</strong> question types. This versatility allows teachers to craft engaging, varied learning
          experiences tailored to different subjects and learning objectives.
        </p>

        <p className="leading-relaxed">
          We used
          <span
            onClick={() => window.open("https://docs.expo.dev", "_blank")}
            className="inline-flex cursor-pointer -translate-y-0.5 mr-1 hover:scale-102 hover:text-blue-500 hover:underline transition-colors align-middle"
          >
            <TechIcon src="/icons/project/expo-logo.png" alt="Expo" size={28} className="translate-y-0.75" containerSize={25} />
            <strong>React Native</strong>
          </span>
          {" "}for mobile,{" "}
          <span
            onClick={() => window.open("https://remix.run/docs", "_blank")}
            className="inline-flex items-center cursor-pointer hover:scale-102 mr-1 hover:text-blue-500 hover:underline transition-colors align-middle"
          >
            <TechIcon src="/icons/project/remix-logo.png" alt="Remix" size={55} className="mx-5" containerSize={25} />
            <strong>React JS</strong>
          </span>
          {" "}for web, and{" "}
          <span
            onClick={() => window.open("https://graphql.org/learn/", "_blank")}
            className="inline-flex cursor-pointer hover:scale-102 hover:text-blue-500 hover:underline transition-colors align-middle"
          >
            <TechIcon src="/icons/project/graphql-logo.png" alt="GraphQL" size={75} className="mx-7 translate-y-0.5" containerSize={25} />
          </span>
          {" "}for the database. I implemented real-time synchronization where answers were instantly validated and scores updated
          live—creating that satisfying instant feedback users expect.
        </p>

        <p className="leading-relaxed">
          Throughout development, we leveraged essential third-party tools to streamline our workflow.{" "}
          <span
            onClick={() => window.open("https://github.com", "_blank")}
            className="inline-flex cursor-pointer -translate-y-0.5 mr-0.5 hover:scale-102 hover:text-blue-500 hover:underline transition-colors align-middle"
          >
            <TechIcon src="/icons/project/github-logo.png" alt="GitHub" size={20} containerSize={28} />
            <strong>GitHub</strong>
          </span>
          {" "}served as our foundation for <strong>version control and team collaboration</strong>, allowing us to work simultaneously without conflicts.{" "}
          <span
            onClick={() => window.open("https://www.mongodb.com/products/tools/compass", "_blank")}
            className="inline-flex cursor-pointer -translate-0.25 hover:scale-102 mr-1 hover:text-blue-500 hover:underline transition-colors align-middle"
          >
            <TechIcon src="/icons/project/mongodb-logo.png" alt="MongoDB Compass" size={10} className="translate-y-3" containerSize={12} />
            <strong>MongoDB Compass</strong>
          </span>
          {" "}provided a visual interface for <strong>database management and query optimization</strong>, making it easier to inspect and manipulate our data structures.{" "}
          <span
            onClick={() => window.open("https://www.postman.com", "_blank")}
            className="inline-flex cursor-pointer -translate-y-0.5 mr-1 hover:scale-102 hover:text-blue-500 hover:underline transition-colors align-middle"
          >
            <TechIcon src="/icons/project/postman-logo.png" alt="Postman" size={20} className="translate-1" containerSize={25} />
            <strong>Postman</strong>
          </span>
          {" "}became our go-to for <strong>API testing and debugging</strong>, enabling us to verify endpoints and troubleshoot issues before integrating them into the frontend. These tools were instrumental in maintaining code quality and accelerating our development process.
          <span
            onClick={onTechStackClick}
            className="cursor-pointer ml-1 hover:text-blue-500 hover:underline transition-colors"
          >
            More information about tech stack... ↗
          </span>
        </p>

        <h1 className="text-black text-xl font-semibold pt-4 mb-2 tracking-tight">Background Story</h1>
        <p className="leading-relaxed">
          This was our <strong>final school project</strong> in high school, coming
          right after our second internship. I was
          energized, our teachers were supportive,
          and we as a team shared the same <strong>ambitious
            spirit to learn.</strong> We were determined to build a fully functional platform that could genuinely help students and teachers. Everyone committed to
          doing their absolute best work, pushing beyond the minimum requirements to create something we could
          be <strong>truly proud of.</strong>
        </p>
        <p className="leading-relaxed">
          Our <strong>team of four</strong> brought together complementary strengths that made LeQuiz possible.
          As <strong>project manager and web developer</strong>, I orchestrated the development process while building
          out the web platform. We had a talented designer who brought the interface to life with a bold
          <strong> neobrutalism style</strong>—think striking colors, heavy borders, and unapologetically vibrant
          UI elements that made the app feel energetic and engaging. Our backend specialist handled the complex
          <strong> data architecture</strong>, ensuring smooth performance and reliable data management across the platform.
          Together, we transformed individual expertise into a <strong>cohesive, polished product</strong> through constant
          collaboration and shared vision.
        </p>

        {/* <h1 className="text-black text-xl mb-2 font-semibold pt-4 tracking-tight">Quick Look</h1> */}
        {/* <div className="w-full flex gap-4 mt-6 h-[600px]">
          <div className="flex-[3] h-full">
            <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border-2 border-black shadow-lg">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
          <div className="flex-1 h-full overflow-hidden">
            <div className="flex flex-col gap-3 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative w-full aspect-video rounded-md overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === index
                    ? "border-black shadow-lg scale-105 z-10"
                    : "border-gray-300 hover:border-gray-500 opacity-70 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};