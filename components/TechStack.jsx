import LogoLoop from './LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiRedux,
  SiDocker,
//   SiAmazonaws,
  SiApachekafka,
  SiGraphql,
  SiGit,
} from 'react-icons/si';

const techLogos = [
  // Frontend
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiReact />, title: 'React.js', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiRedux />, title: 'React Redux', href: 'https://redux.js.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },

  // Backend
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
  { node: <SiGraphql />, title: 'GraphQL', href: 'https://graphql.org' },

  // Databases
  { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },

  // DevOps & Tools
  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiApachekafka />, title: 'Kafka', href: 'https://kafka.apache.org' },
//   { node: <SiAmazonaws />, title: 'AWS', href: 'https://aws.amazon.com' },
];

export default function TechStack() {
  return (
    <section className="">

      <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
        <LogoLoop
          logos={techLogos}
          speed={70}
          direction="left"
          logoHeight={40}
          gap={50}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology stack"
        />
      </div>
    </section>
  );
}