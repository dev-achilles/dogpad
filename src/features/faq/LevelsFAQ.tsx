import { SectionTitle } from "~common/ui/SectionTitle";
import { TELEGRAM_ANNO_URL } from "~config/constants";
import { FAQItem } from "~features/faq/index";
import Link from "next/link";
import React from "react";
import registrationBtnImg from "./registration-button.png";

export function LevelsFAQ() {
  return (
    <div id="faq" className="bg-black bg-opacity-70">
      <SectionTitle className="mb-6">FAQ</SectionTitle>
      <FAQItem question="#1 How do I participate in IDOs?" expanded>
        <div className="flex justify-between flex-col md:flex-row">
          <ul className="w-full md:w-3/4 space-y-2">
            <li>
              Step 1. Go to{" "}
              <Link href="/levels">
                <a>"IDO Staking"</a>
              </Link>{" "}
              page
            </li>
            <li>Step 2. Connect your wallet</li>
            <li>
              Step 3. Stake enough $BLOK to get one of the levels. You can see
              the required amount to stake in the list of levels
            </li>
            <li>
              Step 4. <b>Register for an IDO</b> you want to participate in.
              When IDO registration period starts (usually 48h before the IDO
              start), you need to open the{" "}
              <Link href="/#pools">
                <a>Pools</a>
              </Link>{" "}
              page and click the "Register" button in an IDO pool card.
            </li>
          </ul>
          <div className="w-full md:w-1/4 text-center">
            <img
              src={registrationBtnImg.src}
              alt="Example Registration button"
              className=""
            />
            <span className="text-sm opacity-50">
              Example of a Registration button you need to click to participate
              in an IDO
            </span>
          </div>
        </div>
      </FAQItem>
      <FAQItem question="#2 What are the steps of an IDO?">
        <ul className="space-y-2">
          <li>1. IDO registration opens 48 hours before the IDO sale start</li>
          <li>2. Registration closes 6 hours before the sale start</li>
          <li>3. Lottery levels winners and whitelist winners are announced</li>
          <li>
            4. Base allocation is calculated. It depends on the number of
            participants and ensures that there are enough tokens for guaranteed
            allocation.
          </li>
          <li>
            5. IDO sale starts, registered participants with guaranteed
            allocation, lottery and whitelist winners are allowed to fund their
            allocations in the pool.
          </li>
          <li>6. FCFS round starts 1 hour before the IDO sale end</li>
          <li>
            7. Once sale is finished, we collect the funding data. The token
            distribution and listing information can be found on the{" "}
            <a href={TELEGRAM_ANNO_URL} target="_blank" rel="noreferrer">
              BlokPad Announcements
            </a>{" "}
            Telegram channel.
          </li>
        </ul>
      </FAQItem>
      <FAQItem
        question={`#3 What is First Come First Serve (FCFS) sale? And who can participate in it?`}
      >
        FCFS round opens 1 hour before the sale end if a pool is not sold out.{" "}
        <br />
        <br />
        All stakers with their level higher than "NONE", including
        non-registered or wildcard participants who were not drawn in the
        lottery can participate.
        <br />
        All participants get an additional allocation on top of their level
        allocation: 35% first 15 minutes, 80% next 15 minutes, then 150%, then
        unlimited.
        <br /> <br />
        Whitelist winners DO NOT get an additional allocation.
      </FAQItem>
      <FAQItem question="#4 Do I need to unstake/restake for each IDO?">
        No. You are eligible for any IDOs as long as your $BLOK remain staked.
        The amount staked will be matched to the current level system.
      </FAQItem>
      <FAQItem question="#5 Can I unstake after each IDO?">
        Once registered for an IDO, your account will be locked. You still can
        unstake but with a fee.
      </FAQItem>
      <FAQItem question="#6 Do I have to stake my $BLOK for 5 days to qualify for IDO?">
        No, BlokPad does not implement a pre-IDO staking policy.
      </FAQItem>
      <FAQItem question="#7 I have staked X $BLOK and have Y level, yet the pool page shows 'You level NONE is too low to participate'. Why?">
        To participate in an IDO you need to register. Please refer to item #1.
      </FAQItem>
      <FAQItem question="#8 What is the difference between guaranteed allocation and lottery levels?">
        Lottery levels — Tier 1, Tier 2, Tier 3 — only give you a chance to win
        in a lottery for each IDO. Once the registration period ends, you will
        be able to see if you're a winner on a pool page. <br />
        Guaranteed levels guarantee you the allocation calculated based on the
        base allocation and your level multiplier.
      </FAQItem>
      <FAQItem
        question={`#9 I have registered for an upcoming IDO with a certain amount of $BLOK already staked. 
        If I purchase more $BLOK and stake them after registering, will my level be upgraded?`}
      >
        Registration takes an on chain snap transaction to determine level. As
        such, if registration has already taken place, added $BLOK will not be
        applied to change your level for the IDO you intend to partake in.
        However, they can be added to an existing stake pool to upgrade your
        tier for future IDOs.
      </FAQItem>
      <FAQItem question={`#10 Do I have to register for each IDO?`}>
        Yes. This way we can ensure only stakers who want to participate are
        considered for base allocation calculation. This gives a better, bigger
        allocation for participants.
      </FAQItem>
      <FAQItem
        question={`#11 For IDO registration purposes, is there any benefit to stake an amount slightly over the tier requirement?`}
      >
        No, any amount between the predetermined number of $BLOK in the level
        system will be rounded down.
      </FAQItem>
      <FAQItem question={`#12 When will I find out about my allocation?`}>
        Allocations will only be calculated and released shortly after the
        registration period end. The amount you will receive depends on the
        number of participants and the amount raised by the pool originator.
      </FAQItem>
      <FAQItem question={`#13 How long do I have to fund my IDO allocation?`}>
        The time depends on pool originators, you can see the timeline for
        registration start/end, sale start/end and FCFS period start on the pool
        page.
      </FAQItem>
      <FAQItem question={`#14 What can I fund my allocation with?`}>
        Most of the time it's USDT. You can see the pair (for example "BLOK /
        USDT") under the pool title.
      </FAQItem>
      <FAQItem
        question={`#15 How do I find the token address for the project I just invested in?`}
      >
        Generally, the official address will be shared by the respective
        projects. Also, you can see it on the pool page (you might need to
        refresh the page), as soon as BlokPad team receives this information.
      </FAQItem>
    </div>
  );
}
