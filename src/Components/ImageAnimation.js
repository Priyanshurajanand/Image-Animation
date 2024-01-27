import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import test2 from '../assets/test2.jpeg'

const animationOrder = {
  initial: 0,
  fadeInEnd: 0.15,
  showParagraphOne: 0.25,
  hideParagraphOne: 0.45,
  showParagraphTwoStart: 0.50,
  showParagraphTwoEnd: 0.55,
  hideParagraphTwo: 0.75,
  createBranchStart: 0.65,
  createBranchEnd: 0.8,
  createBranchFadeInStart: 0.8,
  createBranchFadeInEnd: 0.95,
  endTextFadeInStart: 0.95,
};

export const ImageAnimation = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,
      animationOrder.createBranchEnd,
      animationOrder.endTextFadeInStart,
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.fadeInEnd,

    ],
    [3, 1]
  );
  const x = useTransform(
    scrollYProgress,
    [
      animationOrder.initial,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    ["50%", "50%", "55%", "-50%", "-50%","0%"]
  );

  const paragraph1Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    [0, 1, 0]
  );

  const paragraph1TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.fadeInEnd + 0.02,
      animationOrder.showParagraphOne,
      animationOrder.hideParagraphOne,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const paragraph2Opacity = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    [0, 1, 0]
  );
  const paragraph2TranslateY = useTransform(
    scrollYProgress,
    [
      animationOrder.showParagraphTwoStart,
      animationOrder.showParagraphTwoEnd,
      animationOrder.hideParagraphTwo,
    ],
    ["4rem", "0rem", "-4rem"]
  );

  const newBranchOpacity = useTransform(
    scrollYProgress,
    [
      animationOrder.createBranchFadeInStart,
      animationOrder.createBranchFadeInEnd,
    ],
    [0, 1]
  );

  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  return (
    <section ref={targetRef}>
      <div className="relative h-[300vh]">
        <div className="sticky top-1/2 flex origin-center -translate-y-1/2 justify-center">
          <motion.div
            className="translate-x-centered-offset absolute left-1/2 top-1/2 flex w-[50vw] -translate-y-1/2 scale-[var(--scale)] flex-col items-center justify-center "
            style={{
              opacity,
              "--x": x,
              "--scale": scale,
            }}
          >
            <img src={test2} alt="" className="h-auto w-full" />
            <motion.span
              className="mt-[100px] block text-2xl text-white"
              style={{ opacity: newBranchOpacity }}
            >
              Thank You !!
            </motion.span>
          </motion.div>
        </div>
        <motion.p
          style={{
            opacity: paragraph1Opacity,
            "--y": paragraph1TranslateY,
            position,
          }}
          className="translate-y-centered-offset top-1/2 left-[20px] w-[40%] pl-16 text-4xl leading-tight text-white"
        >
          Image Moved to right side of screen
          
        </motion.p>
        <motion.p
          style={{
            opacity: paragraph2Opacity,
            "--y": paragraph2TranslateY,
            position,
          }}
          className="translate-y-centered-offset top-1/2 right-[20px] w-[40%] pr-16 text-4xl leading-tight text-white"
        >
          Image Moved to left side of screen
          
        </motion.p>
      </div>
    </section>
  );
};
