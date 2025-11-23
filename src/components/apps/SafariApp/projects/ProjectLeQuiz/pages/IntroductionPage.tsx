"use client";

import { useState } from "react";
import Image from "next/image";

const galleryImages = [
  // { id: 1, src: "/project-lequiz/gallery-1.png", alt: "Le Quiz Dashboard" },
  { id: 1, src: "/photos/image-1.png", alt: "Le Quiz Dashboard" },
  { id: 2, src: "/photos/image-2.png", alt: "Quiz Interface" },
  { id: 3, src: "/photos/image-3.png", alt: "Class Management" },
  { id: 4, src: "/photos/image-4.png", alt: "Assignment View" },
  { id: 5, src: "/photos/image-5.png", alt: "Student Portal" },
  { id: 6, src: "/photos/image-6.png", alt: "Teacher Dashboard" },
];

export const IntroductionPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="space-y-6 pb-12">
      <h2 className="mb-4 text-3xl text-black font-bold tracking-tight">
        Introduction
      </h2>
      <div className="space-y-4">
        <p>
          Le Quiz is an <strong>interactive quiz</strong> application designed as a comprehensive <strong>Learning Management System. </strong>
          Students can seamlessly join classes and complete assignments from their teachers, while educators have the power
          to create diverse assessments featuring <strong>multiple choice</strong>, <strong>multiple answers</strong>, <strong>matching</strong>,
          and <strong>true/false</strong> question types. This versatility allows teachers to craft engaging, varied learning
          experiences tailored to different subjects and learning objectives.
        </p>
        <p>
          We used <strong>React Native</strong> for mobile, <strong>Remix React</strong> for web, and <strong>GraphQL</strong> for the database. I
          implemented real-time synchronization where answers were instantly validated and scores updated
          live—creating that satisfying instant feedback users expect.
        </p>
        <h4 className="text-black font-semibold pt-4 tracking-tight">Background Story</h4>
        <p>
          This was our <strong>final school project</strong> on high school, coming
          right after our second internship. I was
          energized, our teachers were supportive,
          and we as a team shared the same <strong>ambitious
            spirit to learn.</strong> We were determined to build a fully functional platform that could genuinely help students and teachers. Everyone committed to
          doing their absolute best work, pushing beyond the minimum requirements to create something we could
          be <strong>truly proud of.</strong>
        </p>
        <p>
          Our <strong>team of four</strong> brought together complementary strengths that made Le Quiz possible.
          As <strong>project manager and web developer</strong>, I orchestrated the development process while building
          out the web platform. We had a talented designer who brought the interface to life with a bold
          <strong> neobrutalism style</strong>—think striking colors, heavy borders, and unapologetically vibrant
          UI elements that made the app feel energetic and engaging. Our backend specialist handled the complex
          <strong> data architecture</strong>, ensuring smooth performance and reliable data management across the platform.
          Together, we transformed individual expertise into a <strong>cohesive, polished product</strong> through constant
          collaboration and shared vision.
        </p>
        <h4 className="text-black font-semibold pt-4 tracking-tight">Quick Look</h4>

        <div className="w-full flex gap-4 mt-6 h-[600px]">
          <div className="flex-[3] h-full">
            <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden border-2 border-black shadow-lg">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex-1 h-full overflow-hidden">
            <div className="flex flex-col gap-3 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative w-full rounded-md overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === index
                    ? "border-black shadow-lg scale-105 z-10"
                    : "border-gray-300 hover:border-gray-500 opacity-70 hover:opacity-100"
                    }`}
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};