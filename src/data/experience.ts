import { Briefcase, GraduationCap, Student } from 'phosphor-react';

export const EXPERIENCES = [
    {
        role: 'Software Engineer Intern',
        company: 'Global Wavenet',
        companyUrl: 'https://www.globalwavenet.com',
        period: 'July 2025 – January 2026',
        description: [
            'Implemented a combined RAG workflow using Python enabling unified Azure OCR image search + document search.',
            'Enhanced backend APIs by adding search mode selector API parameter and improved result validation and return consistency.',
            'Implemented context-enrichment features (summarization & keyword extraction) to boost RAG accuracy.',
            'Integrated Azure Computer Vision for OCR and improved the chatbot\'s conversation-to-RAG query flow.',
            'Tested and debugged the pipeline using Postman and XShell, resolving errors and deploying stable builds to Bitbucket.'
        ],
        skills: ['Python', 'Retrieval-Augmented Generation (RAG)', 'Postman API', 'Prompt Engineering', 'JavaScript', 'Agile Project Management'],
        icon: Briefcase,
        side: 'left'
    },
    {
        role: 'Bachelor of Science – BSc (Hons) in Software Engineering',
        company: 'University of Lancashire',
        companyUrl: 'https://www.lancashire.ac.uk',
        period: 'February 2024 – Present',
        description: 'Pursuing a comprehensive degree in software engineering, focusing on core principles of software development, system design, and practical application through coursework and projects.',
        icon: GraduationCap,
        side: 'right'
    },
    {
        role: 'High School',
        company: 'Lyceum International School',
        companyUrl: 'https://www.lyceum.lk',
        period: 'September 2009 – April 2023',
        description: 'Completed primary, middle, and high school (O/Ls and A/Ls) education following the Cambridge International Curriculum.',
        icon: Student,
        side: 'left'
    }
];
