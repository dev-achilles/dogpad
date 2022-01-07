import React from "react";
import { DefaultNavbar, Jumbo, Layout } from "../src/common/Layout";
import { StandardCard } from "../src/common/UI";
import { ScheduleCalendar } from "../src/features/calendar";

export default function Schedule() {
  return (
    <Layout>
      <DefaultNavbar />
      <Jumbo>
        <StandardCard cardClassName="bg-opacity-75">
          <ScheduleCalendar />
        </StandardCard>
      </Jumbo>
    </Layout>
  );
}
