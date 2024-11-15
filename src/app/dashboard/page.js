"use client";
import { PinContainer } from "@/components/ui/3d-pin";
import { cn } from "@/lib/utils";
import React from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { div } from "framer-motion/client";

const cards = [
    {
      title: "Egg Salad",
      src: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/507ef705-d362-441a-839e-18e9251ca1cd-33-bibimbap.jpg"
    },
    {
      title: "Bruschetta",
      src: "https://hips.hearstapps.com/hmg-prod/images/delish-bruschetta-chicken-stuffed-avocados-still003-1531514230.jpg"
    },
    {
      title: "Quinoa Salad",
      src: "https://www.eatingbirdfood.com/wp-content/uploads/2021/03/easy-quinoa-salad-4.jpg"
    },
    {
      title: "Tacos",
      src: "https://img.freepik.com/premium-photo/plate-tasty-looking-food-with-vegetables-spices_1176913-26774.jpg"
    },
]

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
  );
  const items = [
    {
      title: "Your Budget",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      header: <Skeleton />,
      className: "md:col-span-2 text-5xl",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
      backgroundImage: "url('/path-to-image1.jpg')",
    },
    {
      title: "",
      description: "",
      header: <Skeleton />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
      backgroundImage: "url('https://www.shutterstock.com/image-illustration/shopping-basket-foods-on-receipt-260nw-2144658119.jpg')",
    },
    {
        title: "",
        description: "",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/5f8ceed2e11880c542eca6b1/Woman-shopping-at-the-grocery-store-wearing-a-facemask/960x0.jpg?format=jpg&width=960')",
      },
      {
        title: "Shopping Time",
        description: "We'll tell you what to buy and when to buy",
        header: <Skeleton />,
        className: "md:col-span-2 text-5xl",
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        backgroundImage: "url('/path-to-image1.jpg')",
      },

    
    // Add other items with their respective background images
  ];
  
  const page = () => {
    return (
      <div style={{ background: 'linear-gradient(135deg, pink, green )' }}>
        <div className="h-20 w-full">Navbar</div>
        <div className="w-full text-center mb-20 text-7xl font-bold ">
          Welcome Home
        </div>
        <div className="flex gap-10 w-screen mt-8">
          <div className="w-7/12 ml-20">
            <BentoGrid className="w-full mx-auto md:auto-rows-[20rem]">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={
                    <div
                      style={{
                        backgroundImage: item.backgroundImage,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100%",
                        borderRadius: "1rem", // Optional for rounded corners
                      }}
                    >
                      {item.header}
                    </div>
                  }
                  className={item.className}
                  icon={item.icon}
                />
              ))}
            </BentoGrid>
          </div>
          <div className="transform animate-spin-slow my-10 mx-10">
            <img
              className=""
              src="https://happygrub.in/img/indian-plate.png"
              alt="Rotating Image"
            />
          </div>
        </div>
        <div className="h-[400px] w-full flex justify-between mt-32">
        <div className="w-[900px] h-[480px] ml-32 rounded-3xl">
            <div className="text-6xl font-bold p-12">Your Comunity</div>
            <div className="font-semibold text-2xl p-12 pt-2">Collaborate with your friends to make meals TOGETHER for EVERYONE. Get ranked for your meals and be the number 1 cook in your PG.Community support plays a central role by fostering a nurturing and collaborative environment for PG students</div>
        </div>
        <div className="mr-48 mt-16">

        <PinContainer
            title="/ui.aceternity.com"
            href="https://twitter.com/mannupaaji"
        >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[450px] h-[450px] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                Your Community
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                A platform for students to connect, share meals, and support each other in maintaining a healthy lifestyle.
                </span>
            </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            <img className="w-full h-full object-cover" src="https://img.freepik.com/free-photo/lifestyle-people-learning-make-sushi_23-2149865312.jpg" alt="" />
            </div>
        </PinContainer>
        </div>
        </div>
        <div className="h-[400px] w-full flex justify-between mt-32">
        <div className="ml-48 mt-16">

        <PinContainer
            title="/ui.aceternity.com"
            href="https://twitter.com/mannupaaji"
        >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[450px] h-[450px] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Mothers Recipies
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                We bridge the emotional gap for those missing home-cooked meals, fostering both independence and connection
                </span>
            </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            <img className="w-full h-full object-cover" src="https://media.istockphoto.com/id/1164904650/photo/stirring-some-love-into-it.jpg?s=612x612&w=0&k=20&c=hV-aCNUQWwpuWMe_gbH8tz3NauokN0QCBDYUbtrX2dA=" alt="" />
            </div>
        </PinContainer>
        </div>
        <div className="w-[900px] h-[480px] mr-32 rounded-3xl">
            <div className="text-6xl font-bold p-12">Mothers Recipies</div>
            <div className="font-semibold text-2xl p-12 pt-2">Mother-Narrated Recipes in Aasra offer a comforting and personalized cooking experience for PG students. Recipes are narrated in a warm, motherly tone, mimicking the guidance and care of a parent. This feature helps students feel emotionally supported while learning to cook, making meal preparation less daunting and more enjoyable. It bridges the emotional gap for those missing home-cooked meals, fostering both independence and connection.</div>
        </div>
        </div>
        <div className="h-[400px] w-full flex justify-between mt-32">
        <div className="w-[900px] h-[480px] ml-32 rounded-3xl">
            <div className="text-6xl font-bold p-12">Change your MOOD, with our FOOD</div>
            <div className="font-semibold text-2xl p-12 pt-2">The Mood-Based Support feature in Aasra addresses eating disorders by integrating mood tracking with personalized food recommendations. Users can log their emotions, and the platform suggests meals tailored to uplift their mood or provide comfort. For example, a stressful day might prompt calming recipes, while low moods could inspire energy-boosting dishes.</div>
        </div>
        <div className="mr-48 mt-16">

        <PinContainer
            title="/ui.aceternity.com"
            href="https://twitter.com/mannupaaji"
        >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[450px] h-[450px] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Change your MOOD, with our FOOD
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                Lift up your mood, by just eating the food we provide.
                </span>
            </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            <img className="w-full h-full object-cover" src="https://tb-static.uber.com/prod/image-proc/processed_images/e2b77448345e785576e3300a78a4cfb7/c9252e6c6cd289c588c3381bc77b1dfc.jpeg" alt="" />
            </div>
        </PinContainer>
        </div>
        </div>
        <div className="h-[400px] w-full flex justify-between mt-32">
        <div className="ml-48 mt-16">

        <PinContainer
            title="/ui.aceternity.com"
            href="https://twitter.com/mannupaaji"
        >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[450px] h-[450px] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                Your Progress
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                This motivates you to stay consistent, celebrate small wins, and make informed adjustments to your lifestyle
                </span>
            </div>
            <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            <img className="w-full h-full object-cover" src="https://media.istockphoto.com/id/1323668558/photo/healthy-food-in-heart-and-progress-bar-loading-with-message-healthy-heart-on-blackboard-diet.jpg?s=612x612&w=0&k=20&c=AyvNyQEFOj8X0fQ_sWUaCpPqKd3lqer5cTic1k26poE=" alt="" />
            </div>
        </PinContainer>
        </div>
        <div className="w-[900px] h-[480px] mr-32 rounded-3xl">
            <div className="text-6xl font-bold p-12">Your Progress</div>
            <div className="font-semibold text-2xl p-12 pt-2">The Progress Page in Aasra helps PG students track their journey toward healthier eating and emotional well-being. It provides insights into their dietary habits, milestones achieved, and emotional progress over time. Visual metrics like meal plan adherence, budgeting efficiency, and anxiety management are displayed through graphs and trackers.</div>
        </div>
        </div>

        <div className="mt-52 mx-11 flex-col pb-44">
            <div className="my-20 pb-5 h-[50px] text-5xl font-bold text-center">New Recipes</div>
            <div>
                <FocusCards cards={cards} />
            </div>
        </div>
      </div>
    );
  };
  
  export default page;
  