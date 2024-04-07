import FeedWrapper from "@/components/feed-wrapper";
import Header from "@/components/header";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import React from "react";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            imageSrc: "/es.svg",
            title: "Spanish",
          }}
          hearts={5}
          points={99}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
