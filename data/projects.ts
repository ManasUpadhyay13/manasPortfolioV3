export type ProjectType = 'Frontend' | 'Backend' | 'Full Stack';

export interface Project {
    title: string;
    description: string;
    tags: string[];
    type: ProjectType;
    link: string;
    github: string;
}

export const projects: Project[] = [
    {
        title: 'Interview Saathi',
        description:
            'Mock interview platform powered by Google’s Gemini API. Users practice interviews with AI feedback on job descriptions and experience. Features real-time voice interaction and performance analysis.',
        tags: ['Next.js', 'Gemini API', 'AI'],
        type: 'Full Stack',
        link: '#',
        github: '#'
    },
    {
        title: 'Form Builder',
        description:
            'Drag-and-drop form builder allowing businesses to create ready-to-use forms. Supports multiple instances per user, complex validation logic, and real-time submission analytics.',
        tags: ['React', 'DnD', 'SaaS'],
        type: 'Frontend',
        link: '#',
        github: '#'
    },
    {
        title: 'Manas Discord',
        description:
            'Full-featured Discord clone with real-time messaging via Socket.io, authentication with Clerk, and video/voice calls. Includes server management and channel creation.',
        tags: ['Next.js', 'Socket.io', 'MySQL'],
        type: 'Full Stack',
        link: '#',
        github: '#'
    },
    {
        title: 'E-Commerce Dashboard',
        description:
            'A comprehensive admin dashboard for e-commerce platforms, featuring real-time sales tracking, inventory management, and customer analytics visualization.',
        tags: ['React', 'Tremor', 'Tailwind'],
        type: 'Frontend',
        link: '#',
        github: '#'
    },
    {
        title: 'Task Management API',
        description:
            'Robust RESTful API for task management systems. Includes advanced filtering, pagination, role-based access control, and automated email notifications.',
        tags: ['Node.js', 'Express', 'PostgreSQL'],
        type: 'Backend',
        link: '#',
        github: '#'
    },
    {
        title: 'AI Image Generator',
        description:
            'SaaS application allowing users to generate images from text prompts using Stable Diffusion. Includes credit system, gallery, and social sharing features.',
        tags: ['Next.js', 'Replicate', 'Stripe'],
        type: 'Full Stack',
        link: '#',
        github: '#'
    },
    {
        title: 'Portfolio V2',
        description:
            'Previous iteration of personal portfolio focusing on 3D interactions using Three.js and heavy animations. Showcased WebGL capabilities.',
        tags: ['Three.js', 'React Three Fiber', 'GSAP'],
        type: 'Frontend',
        link: '#',
        github: '#'
    },
    {
        title: 'Auth Microservice',
        description:
            'Scalable authentication microservice handling JWT issuance, rotation, and OAuth provider integrations. built for high-throughput distributed systems.',
        tags: ['Go', 'gRPC', 'Redis'],
        type: 'Backend',
        link: '#',
        github: '#'
    }
];
