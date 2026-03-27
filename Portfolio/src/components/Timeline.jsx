"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const [height, setHeight] = useState(0);

  // Veri yüklendiğinde veya pencere boyutu değiştiğinde yüksekliği güncelle
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading">{t("experience_title")}</h2>
      <div ref={ref} className="relative pb-20">
        {data && data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Sol Taraf - Sticky Başlıklar */}
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
              </div>
              <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                <h3 className="text-2xl">{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.experienceCompanyName}</h3>
                <h3 className="text-xl text-neutral-500">{item.experinceMyTitle}</h3>
              </div>
            </div>

            {/* Sağ Taraf - İçerik ve Açıklama */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              {/* Mobil Görünüm Başlıkları */}
              <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
                <h3 className="text-xl">{item.date}</h3>
                <h3 className="text-2xl text-neutral-400">{item.experienceCompanyName}</h3>
                <p className="text-lg text-neutral-500">{item.experinceMyTitle}</p>
              </div>

              {/* Açıklama Alanı */}
              <div className="text-neutral-400 text-lg leading-relaxed max-w-4xl">
                {item.description ? (
                  Array.isArray(item.description) ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.description}</p>
                  )
                ) : (
                  <p className="italic text-neutral-600">Açıklama belirtilmedi.</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Arka Plan Sabit Çizgi */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          {/* Hareket Eden Renkli Çizgi */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;