import React from "react";
import Section from "./Section";
import { user } from "../data/portfolioData";
import useTypingEffect from "../hooks/useTypingEffect";

const Certificates = () => {
  const animatedTitle = useTypingEffect(user.titles);
  return (
    <Section id="certificates" title="cerfiticates">
      <div className="glass-effect p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Certificates
        </h2>
        <ul className="text-gray-300 leading-relaxed space-y-2 list-disc list-inside">
          <li>
            <a
              href="https://www.coursera.org/account/accomplishments/verify/4SJGMDFJ9Z9W"
              target="_blank"
            >
              <u>React Native by Meta</u>
            </a>
          </li>
          <li>
            <a
              href="https://www.udemy.com/certificate/UC-55d8acff-9ce0-417e-8992-dd4b47e57604/"
              target="_blank"
            >
              <u>Java Data Structures & Algorithms + LEETCODE Exercises</u>
            </a>
          </li>
          <li>
            <a
              href="https://www.udemy.com/certificate/UC-29713403-5382-4c81-8a83-4e5db5bf6a14/"
              target="_blank"
            >
              <u>Java for Programmers Crash Course</u>
            </a>
          </li>
          <li>
            <a
              href="https://www.udemy.com/certificate/UC-54bf980a-dc92-473a-b8c9-02119a7d6c1b/"
              target="_blank"
            >
              <u>Git For Beginners</u>
            </a>
          </li>
          <li>
            <a
              href="https://www.hackerrank.com/certificates/001280a13420"
              target="_blank"
            >
              <u>SQL (Basic)</u>
            </a>
          </li>
          <li>
            <a
              href="https://badgr.com/public/assertions/KV0PKt-JR_Sv-5Baex2yUw"
              target="_blank"
            >
              <u>Postman API Fundamentals Student Expert</u>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
};

export default Certificates;
