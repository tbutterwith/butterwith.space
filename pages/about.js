import React from "react";
const jobs = [
  {
    title: "Senior Group Engineer Manager",
    company: "VEED.io",
    date: "Feb 2023 - Present",
    description: [],
  },
  {
    title: "Engineer Manager",
    company: "Skyscanner",
    date: "Oct 2020 - Feb 2023",
    description: [],
  },
  {
    title: "Senior Software Engineer",
    company: "Skyscanner",
    date: "Jul 2018 - Oct 2022",
    description: [],
  },
  {
    title: "Software Engineer",
    company: "Skyscanner",
    date: "Sep 2015 - Jul 2018",
    description: [],
  },
];

const About = () => {
  return (
    <div className="container flex justify-center">
      <div className="max-w-prose font-serif leading-relaxed">
        <h2 className="text-2xl">Summary</h2>
        <p className="pt-2">
          I&apos;m a Director of Engineering based in Worthing, UK, currently
          working for VEED.io. I manage teams, coach and develop great software
          engineering leaders, and build full-stack applications using wide
          range of technologies including NodeJs, React, Python, Java, and
          various cloud technologies.
        </p>
        <p className="pt-2">
          Outside of work I spend my time teaching with Code First:Girls and
          mentoring at codebar.io.
        </p>
        <h2 className="pt-6 text-2xl">Things I&apos;ve Worked On</h2>
        <h3 className="semi pt-2 text-lg">Skyscanner Homepage Consolidation</h3>
        <ul className="ml-8 list-disc">
          <li>
            Built a team of 12 developers, consisting of varying levels and
            company tenure across 3 offices
          </li>
          <li>
            Worked with designers, copywriters, and accessibility specialists to
            build and release a completely new version of Skyscanner&apos;s
            homepage
          </li>
          <li>
            The team contributed to Backpack, Skyscanner&apos;s open-source
            design system
          </li>
        </ul>
        <h3 className="semi pt-2 text-lg">Payments Processing Platform</h3>
        <ul className="ml-8 list-disc">
          <li>
            Merged two existing teams into single, distributed team of 10 across
            3 offices
          </li>
          <li>
            Oversaw the design and deployment of a payment processing solution,
            handling all of Skyscanner&apos;s on-site payments (~7k daily)
          </li>
        </ul>

        <h3 className="semi pt-2 text-lg">Flight Emissions Pipeline</h3>
        <ul className="ml-8 list-disc">
          <li>
            Designed and built a pipeline for displaying CO2 emissions to
            travellers during flight search
          </li>
          <li>
            Java Dropwizard Microservice with protobuf gRPC endpoints, rendered
            using React JS
          </li>
          <li>
            Emissions calculated using Apache Spark, persisted to Redis via AWS
            Batch
          </li>
          <li>
            Deployed using io to AWS ECS, processing 4 million requests per
            minute
          </li>
        </ul>

        <h3 className="semi pt-2 text-lg">Cross Platform Event Logging</h3>
        <ul className="ml-8 list-disc">
          <li>
            Created a framework for designing user tracking events consistently
            across Skyscanner
          </li>
          <li>
            Designed 12 core event schemas and implemented them across 30+
            microservices
          </li>
          <li>
            Built tooling to collate events and enable data scientists to access
            data from web, Android and iOS events simultaneously using PySpark
          </li>
        </ul>
        <h3 className="semi pt-2 text-lg">Revenue and Billing Microservices</h3>
        <ul className="ml-8 list-disc">
          <li>
            Maintained and improved a large C# .net application enabling
            Skyscanner to collate partner data and issue invoices
          </li>
          <li>Integrated SOX compliant tooling and revenue alerting</li>
          <li>
            Designed and built an event based Accruals service for tracking and
            managing outstanding payments using Express.js and React with
            Apache{" "}
          </li>
          Kafka event BUS
          <li>
            Maintained an MSSQL based revenue forecasting system enabling
            Skyscanner to track and forecast £16m monthly revenue
          </li>
        </ul>
        <h2 className="pt-6 text-2xl">Experience</h2>
        {jobs.map((job) => (
          <>
            <div className="flex justify-between pt-5">
              <h3 className="text-xl">{job.title}</h3>
              <h3 className="text-xl">{job.company}</h3>
            </div>
            <p>{job.date}</p>
            {job.description.map((desc, id) => (
              <p key={id}>{desc}</p>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default About;
