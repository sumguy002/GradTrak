#!/usr/bin/env node

/* eslint-disable no-console, no-param-reassign */

const db = require('../config/db');

const Course = require('../models/course');
const RequirementSet = require('../models/requirement-set');
const Tag = require('../models/tag');
const User = require('../models/user');

const DUMMY_COURSE_DATA = [
  {
    units: 4,
    title: 'Foundations of Data Science',
    dept: 'COMPSCI',
    no: 'C8',
    id: 'compscic8',
    tagIds: [],
  },
  {
    units: 4,
    title: 'The Beauty and Joy of Computing',
    dept: 'COMPSCI',
    no: '10',
    id: 'compsci10',
    tagIds: [],
  },
  {
    units: 1,
    title: 'Freshman Seminars',
    dept: 'COMPSCI',
    no: '24',
    id: 'compsci24',
    tagIds: [],
  },
  {
    units: 2,
    title: 'CS Scholars Seminar: The Educational Climate in CS & CS61A technical discussions',
    dept: 'COMPSCI',
    no: '36',
    id: 'compsci36',
    tagIds: [],
  },
  {
    units: 1,
    title: 'Completion of Work in Computer Science 61A',
    dept: 'COMPSCI',
    no: '47A',
    id: 'compsci47a',
    tagIds: [],
  },
  {
    units: 1,
    title: 'Completion of Work in Computer Science 61B',
    dept: 'COMPSCI',
    no: '47B',
    id: 'compsci47b',
    tagIds: [],
  },
  {
    units: 1,
    title: 'Completion of Work in Computer Science 61C',
    dept: 'COMPSCI',
    no: '47C',
    id: 'compsci47c',
    tagIds: [],
  },
  {
    units: 4,
    title: 'The Structure and Interpretation of Computer Programs',
    dept: 'COMPSCI',
    no: '61A',
    id: 'compsci61a',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Data Structures',
    dept: 'COMPSCI',
    no: '61B',
    id: 'compsci61b',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Great Ideas of Computer Architecture (Machine Structures)',
    dept: 'COMPSCI',
    no: '61C',
    id: 'compsci61c',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Discrete Mathematics and Probability Theory',
    dept: 'COMPSCI',
    no: '70',
    id: 'compsci70',
    tagIds: [],
  },
  {
    units: 3,
    title: 'Computational Structures in Data Science',
    dept: 'COMPSCI',
    no: '88',
    id: 'compsci88',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Computer Architecture and Engineering',
    dept: 'COMPSCI',
    no: '152',
    id: 'compsci152',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'User Interface Design and Development',
    dept: 'COMPSCI',
    no: '160',
    id: 'compsci160',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Computer Security',
    dept: 'COMPSCI',
    no: '161',
    id: 'compsci161',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Operating Systems and System Programming',
    dept: 'COMPSCI',
    no: '162',
    id: 'compsci162',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Programming Languages and Compilers',
    dept: 'COMPSCI',
    no: '164',
    id: 'compsci164',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Introduction to the Internet: Architecture and Protocols',
    dept: 'COMPSCI',
    no: '168',
    id: 'compsci168',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Software Engineering',
    dept: 'COMPSCI',
    no: '169',
    id: 'compsci169',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Efficient Algorithms and Intractable Problems',
    dept: 'COMPSCI',
    no: '170',
    id: 'compsci170',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Combinatorics and Discrete Probability',
    dept: 'COMPSCI',
    no: '174',
    id: 'compsci174',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Designing, Visualizing and Understanding Deep Neural Networks',
    dept: 'COMPSCI',
    no: 'L182',
    id: 'compscil182',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Designing, Visualizing and Understanding Deep Neural Networks',
    dept: 'COMPSCI',
    no: 'W182',
    id: 'compsciw182',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Foundations of Computer Graphics',
    dept: 'COMPSCI',
    no: '184',
    id: 'compsci184',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Introduction to Database Systems',
    dept: 'COMPSCI',
    no: 'W186',
    id: 'compsciw186',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Introduction to Artificial Intelligence',
    dept: 'COMPSCI',
    no: '188',
    id: 'compsci188',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Introduction to Machine Learning',
    dept: 'COMPSCI',
    no: '189',
    id: 'compsci189',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 3,
    title: 'Quantum Information Science and Technology',
    dept: 'COMPSCI',
    no: 'C191',
    id: 'compscic191',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 1,
    title: 'Special Topics',
    dept: 'COMPSCI',
    no: '194',
    id: 'compsci194',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 1,
    title: 'Social Implications of Computer Technology',
    dept: 'COMPSCI',
    no: '195',
    id: 'compsci195',
    tagIds: ['eecs_ethics'],
  },
  {
    units: 1,
    title: 'Directed Group Studies for Advanced Undergraduates',
    dept: 'COMPSCI',
    no: '198',
    id: 'compsci198',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Designing Information Devices and Systems I',
    dept: 'EECS',
    no: '16A',
    id: 'eecs16a',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Designing Information Devices and Systems II',
    dept: 'EECS',
    no: '16B',
    id: 'eecs16b',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Introduction to Robotics',
    dept: 'EECS',
    no: 'C106A',
    id: 'eecsc106a',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Robotic Manipulation and Interaction',
    dept: 'EECS',
    no: 'C106B',
    id: 'eecsc106b',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Probability and Random Processes',
    dept: 'EECS',
    no: '126',
    id: 'eecs126',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Optimization Models in Engineering',
    dept: 'EECS',
    no: '127',
    id: 'eecs127',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Introduction to Embedded Systems',
    dept: 'EECS',
    no: '149',
    id: 'eecs149',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 3,
    title: 'Introduction to Digital Design and Integrated Circuits',
    dept: 'EECS',
    no: '151',
    id: 'eecs151',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 2,
    title: 'Application Specific Integrated Circuits Laboratory',
    dept: 'EECS',
    no: '151LA',
    id: 'eecs151la',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 2,
    title: 'Field-Programmable Gate Array Laboratory',
    dept: 'EECS',
    no: '151LB',
    id: 'eecs151lb',
    tagIds: ['eecs_upper_div'],
  },
  {
    units: 4,
    title: 'Reading and Composition',
    dept: 'ENGLISH',
    no: 'R1A',
    id: 'englishr1a',
    tagIds: ['rc_a'],
  },
  {
    units: 4,
    title: 'Reading and Composition',
    dept: 'ENGLISH',
    no: 'R1B',
    id: 'englishr1b',
    tagIds: ['rc_b'],
  },
  {
    units: 4,
    title: 'Natural Language Processing',
    dept: 'INFO',
    no: '159',
    id: 'info159',
    tagIds: ['eecs_upper_div', 'linguis_elective'],
  },
  {
    units: 5,
    title: 'American Sign Language I',
    dept: 'LINGUIS',
    no: '1A',
    id: 'linguis1a',
    tagIds: [],
  },
  {
    units: 5,
    title: 'American Sign Language II',
    dept: 'LINGUIS',
    no: '1B',
    id: 'linguis1b',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Endangered Languages: Why does linguistic diversity matter?',
    dept: 'LINGUIS',
    no: 'R1B',
    id: 'linguisr1b',
    tagIds: ['rc_b'],
  },
  {
    units: 4,
    title: 'Language and Linguistics',
    dept: 'LINGUIS',
    no: '5',
    id: 'linguis5',
    tagIds: ['ls_socio'],
  },
  {
    units: 3,
    title: 'The Sounds of English',
    dept: 'LINGUIS',
    no: '10',
    id: 'linguis10',
    tagIds: ['ls_socio'],
  },
  {
    units: 1,
    title: 'Freshman Seminar',
    dept: 'LINGUIS',
    no: '24',
    id: 'linguis24',
    tagIds: ['ls_socio'],
  },
  {
    units: 3,
    title: 'Language and Communication Disorders',
    dept: 'LINGUIS',
    no: '47',
    id: 'linguis47',
    tagIds: ['ls_socio'],
  },
  {
    units: 4,
    title: 'Introduction to Linguistic Science',
    dept: 'LINGUIS',
    no: '100',
    id: 'linguis100',
    tagIds: ['upper_div', 'ls_socio'],
  },
  {
    units: 4,
    title: 'Metaphor',
    dept: 'LINGUIS',
    no: '106',
    id: 'linguis106',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 3,
    title: 'Bilingualism',
    dept: 'LINGUIS',
    no: '109',
    id: 'linguis109',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 4,
    title: 'Phonetics',
    dept: 'LINGUIS',
    no: '110',
    id: 'linguis110',
    tagIds: ['upper_div', 'ls_socio'],
  },
  {
    units: 4,
    title: 'Phonology',
    dept: 'LINGUIS',
    no: '111',
    id: 'linguis111',
    tagIds: ['upper_div', 'ls_socio'],
  },
  {
    units: 4,
    title: 'Morphology',
    dept: 'LINGUIS',
    no: '115',
    id: 'linguis115',
    tagIds: ['upper_div', 'ls_socio'],
  },
  {
    units: 4,
    title: 'Syntax',
    dept: 'LINGUIS',
    no: '120',
    id: 'linguis120',
    tagIds: ['upper_div', 'ls_socio'],
  },
  {
    units: 4,
    title: 'Formal Semantics',
    dept: 'LINGUIS',
    no: '121',
    id: 'linguis121',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 3,
    title: 'Pragmatics',
    dept: 'LINGUIS',
    no: '123',
    id: 'linguis123',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 4,
    title: 'Comparative and Historical Linguistics',
    dept: 'LINGUIS',
    no: '130',
    id: 'linguis130',
    tagIds: ['upper_div', 'ls_socio'],
  },
  {
    units: 3,
    title: 'Field Methods',
    dept: 'LINGUIS',
    no: '140',
    id: 'linguis140',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 3,
    title: 'Language and Thought',
    dept: 'LINGUIS',
    no: 'C142',
    id: 'linguisc142',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 3,
    title: 'Language Acquisition',
    dept: 'LINGUIS',
    no: 'C146',
    id: 'linguisc146',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 3,
    title: 'Phonological Development',
    dept: 'LINGUIS',
    no: '148',
    id: 'linguis148',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 3,
    title: 'Sociolinguistics',
    dept: 'LINGUIS',
    no: '150',
    id: 'linguis150',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 4,
    title: 'Language in the United States: a Capsule History',
    dept: 'LINGUIS',
    no: '155AC',
    id: 'linguis155ac',
    tagIds: ['upper_div', 'ls_hist', 'ls_socio', 'ac', 'linguis_elective'],
  },
  {
    units: 4,
    title: 'Quantitative Methods in Linguistics',
    dept: 'LINGUIS',
    no: 'C160',
    id: 'linguisc160',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 3,
    title: 'History, Structure, and Sociolinguistics of a Particular Language',
    dept: 'LINGUIS',
    no: '170',
    id: 'linguis170',
    tagIds: ['upper_div', 'ls_socio', 'linguis_elective'],
  },
  {
    units: 1,
    title: 'Research Practicum',
    dept: 'LINGUIS',
    no: '197',
    id: 'linguis197',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Calculus',
    dept: 'MATH',
    no: '1A',
    id: 'math1a',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Calculus',
    dept: 'MATH',
    no: '1B',
    id: 'math1b',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Multivariable Calculus',
    dept: 'MATH',
    no: '53',
    id: 'math53',
    tagIds: [],
  },
  {
    units: 4,
    title: 'Physics for Scientists and Engineers',
    dept: 'PHYSICS',
    no: '7A',
    id: 'physics7a',
    tagIds: ['ls_phys'],
  },
  {
    units: 4,
    title: 'Physics for Scientists and Engineers',
    dept: 'PHYSICS',
    no: '7B',
    id: 'physics7b',
    tagIds: ['ls_phys'],
  },
];

const DUMMY_REQUIREMENT_DATA = [
  {
    id: 'uc',
    name: 'University of California',
    parentId: null,
    type: 'unselectable',
    requirementCategories: [
      {
        id: 'uc',
        name: 'UC Requirements',
        type: 'unselectable',
        requirements: [
          {
            id: 'elwr',
            name: 'Entry-Level Writing',
          },
          {
            id: 'ah',
            name: 'American History',
          },
          {
            id: 'ai',
            name: 'American Instutions',
          },
        ],
      },
    ],
  },
  {
    id: 'ucb',
    name: 'UC Berkeley',
    parentId: 'uc',
    type: 'unselectable',
    requirementCategories: [
      {
        id: 'ac',
        name: 'American Cultures',
        requirements: [
          {
            type: 'tag',
            id: 'ac',
            name: 'American Cultures',
            tagId: 'ac',
          },
        ],
      },
    ],
  },
  {
    id: 'coe',
    name: 'College of Engineering',
    parentId: 'ucb',
    type: 'unselectable',
    requirementCategories: [
      {
        id: 'coe_hss',
        name: 'Humanities and Social Sciences',
        type: 'unselectable',
        requirements: [
          {
            type: 'mutex',
            id: 'coe_hss',
            name: 'CoE Humanities and Social Sciences',
            requirements: [
              {
                type: 'tag',
                id: 'coe_r1a',
                name: 'R&C Part A',
                tagId: 'rc_a',
              },
              {
                type: 'tag',
                id: 'coe_r1b',
                name: 'R&C Part B',
                tagId: 'rc_b',
              },
              {
                type: 'poly',
                id: 'coe_hss',
                name: 'H/SS',
                numRequired: 1,
                requirements: [
                  {
                    type: 'tag',
                    id: 'ls_arts',
                    name: 'Arts and Literature',
                    tagId: 'ls_arts',
                  },
                  {
                    type: 'tag',
                    id: 'ls_hist',
                    name: 'Historical Studies',
                    tagId: 'ls_hist',
                  },
                  {
                    type: 'tag',
                    id: 'ls_inter',
                    name: 'International Studies',
                    tagId: 'ls_inter',
                  },
                  {
                    type: 'tag',
                    id: 'ls_philo',
                    name: 'Philosophy and Values',
                    tagId: 'ls_philo',
                  },
                  {
                    type: 'tag',
                    id: 'ls_socio',
                    name: 'Social and Behavioral Science',
                    tagId: 'ls_socio',
                  },
                ],
              },
              {
                type: 'poly',
                id: 'coe_hss',
                name: 'H/SS',
                numRequired: 1,
                requirements: [
                  {
                    type: 'tag',
                    id: 'ls_arts',
                    name: 'Arts and Literature',
                    tagId: 'ls_arts',
                  },
                  {
                    type: 'tag',
                    id: 'ls_hist',
                    name: 'Historical Studies',
                    tagId: 'ls_hist',
                  },
                  {
                    type: 'tag',
                    id: 'ls_inter',
                    name: 'International Studies',
                    tagId: 'ls_inter',
                  },
                  {
                    type: 'tag',
                    id: 'ls_philo',
                    name: 'Philosophy and Values',
                    tagId: 'ls_philo',
                  },
                  {
                    type: 'tag',
                    id: 'ls_socio',
                    name: 'Social and Behavioral Science',
                    tagId: 'ls_socio',
                  },
                ],
              },
              {
                type: 'poly',
                id: 'coe_hss_upper_div',
                name: 'H/SS Upper Division',
                numRequired: 2,
                requirements: [
                  {
                    type: 'poly',
                    id: 'coe_hss',
                    name: 'H/SS',
                    numRequired: 1,
                    requirements: [
                      {
                        type: 'tag',
                        id: 'ls_arts',
                        name: 'Arts and Literature',
                        tagId: 'ls_arts',
                      },
                      {
                        type: 'tag',
                        id: 'ls_hist',
                        name: 'Historical Studies',
                        tagId: 'ls_hist',
                      },
                      {
                        type: 'tag',
                        id: 'ls_inter',
                        name: 'International Studies',
                        tagId: 'ls_inter',
                      },
                      {
                        type: 'tag',
                        id: 'ls_philo',
                        name: 'Philosophy and Values',
                        tagId: 'ls_philo',
                      },
                      {
                        type: 'tag',
                        id: 'ls_socio',
                        name: 'Social and Behavioral Science',
                        tagId: 'ls_socio',
                      },
                    ],
                  },
                  {
                    type: 'tag',
                    id: 'upper_div',
                    name: 'Upper Division Course',
                    tagId: 'upper_div',
                  },
                ],
              },
              {
                type: 'poly',
                id: 'coe_hss_upper_div',
                name: 'H/SS Upper Division',
                numRequired: 2,
                requirements: [
                  {
                    type: 'poly',
                    id: 'coe_hss',
                    name: 'H/SS',
                    numRequired: 1,
                    requirements: [
                      {
                        type: 'tag',
                        id: 'ls_arts',
                        name: 'Arts and Literature',
                        tagId: 'ls_arts',
                      },
                      {
                        type: 'tag',
                        id: 'ls_hist',
                        name: 'Historical Studies',
                        tagId: 'ls_hist',
                      },
                      {
                        type: 'tag',
                        id: 'ls_inter',
                        name: 'International Studies',
                        tagId: 'ls_inter',
                      },
                      {
                        type: 'tag',
                        id: 'ls_philo',
                        name: 'Philosophy and Values',
                        tagId: 'ls_philo',
                      },
                      {
                        type: 'tag',
                        id: 'ls_socio',
                        name: 'Social and Behavioral Science',
                        tagId: 'ls_socio',
                      },
                    ],
                  },
                  {
                    type: 'tag',
                    id: 'upper_div',
                    name: 'Upper Division Course',
                    tagId: 'upper_div',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ls',
    name: 'College of Letters and Sciences',
    parentId: 'ucb',
    type: 'unselectable',
    requirementCategories: [
      {
        id: 'ls_essential',
        name: 'Essential Skills',
        requirements: [
          {
            type: 'tag',
            id: 'ls_r1a',
            name: 'R&C Part A',
            tagId: 'rc_a',
          },
          {
            type: 'tag',
            id: 'ls_r1b',
            name: 'R&C Part B',
            tagId: 'rc_b',
          },
          {
            id: 'ls_quant',
            name: 'Quantitative Reasoning',
          },
          {
            id: 'ls_lang',
            name: 'Foreign Language',
          },
        ],
      },
      {
        id: 'ls_breadth',
        name: 'Breadth Requirements',
        requirements: [
          {
            type: 'mutex',
            id: 'ls_breadth',
            name: 'L&S Breadth Requirements',
            requirements: [
              {
                type: 'tag',
                id: 'ls_arts',
                name: 'Arts and Literature',
                tagId: 'ls_arts',
              },
              {
                type: 'tag',
                id: 'ls_bio',
                name: 'Biological Science',
                tagId: 'ls_bio',
              },
              {
                type: 'tag',
                id: 'ls_hist',
                name: 'Historical Studies',
                tagId: 'ls_hist',
              },
              {
                type: 'tag',
                id: 'ls_inter',
                name: 'International Studies',
                tagId: 'ls_inter',
              },
              {
                type: 'tag',
                id: 'ls_philo',
                name: 'Philosophy and Values',
                tagId: 'ls_philo',
              },
              {
                type: 'tag',
                id: 'ls_phys',
                name: 'Physical Science',
                tagId: 'ls_phys',
              },
              {
                type: 'tag',
                id: 'ls_socio',
                name: 'Social and Behavioral Science',
                tagId: 'ls_socio',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'eecs',
    name: 'EECS Major',
    parentId: 'coe',
    type: 'major',
    requirementCategories: [
      {
        id: 'eecs_math',
        name: 'Math',
        requirements: [
          {
            type: 'course',
            id: 'math1a',
            name: 'MATH 1A',
            courseId: 'math1a',
          },
          {
            type: 'course',
            id: 'math1b',
            name: 'MATH 1B',
            courseId: 'math1b',
          },
          {
            type: 'course',
            id: 'compsci70',
            name: 'COMPSCI 70',
            courseId: 'compsci70',
          },
        ],
      },
      {
        id: 'eecs_physics',
        name: 'Physics',
        requirements: [
          {
            type: 'multi',
            id: 'eecs_physics',
            name: 'EECS Physics',
            numRequired: 1,
            hidden: false,
            requirements: [
              {
                type: 'multi',
                id: 'eecs_physics7',
                name: 'EECS Physics 7A/B',
                numRequired: 2,
                hidden: false,
                requirements: [
                  {
                    type: 'course',
                    id: 'physics7a',
                    name: 'PHYSICS 7A',
                    courseId: 'physics7a',
                  },
                  {
                    type: 'course',
                    id: 'physics7b',
                    name: 'PHYSICS 7B',
                    courseId: 'physics7b',
                  },
                ],
              },
              {
                type: 'multi',
                id: 'eecs_physics5',
                name: 'EECS Physics 5A/B',
                numRequired: 2,
                hidden: false,
                requirements: [
                  {
                    type: 'course',
                    id: 'physics5a',
                    name: 'PHYSICS 5A',
                    courseId: 'physics5a',
                  },
                  {
                    type: 'course',
                    id: 'physics5b',
                    name: 'PHYSICS 5B',
                    courseId: 'physics5b',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'eecs_lower_div',
        name: 'Lower Division',
        requirements: [
          {
            type: 'multi',
            id: 'compsci61a47a',
            name: 'COMPSCI 61A',
            numRequired: 1,
            hidden: true,
            requirements: [
              {
                type: 'course',
                id: 'compsci61a',
                name: 'COMPSCI 61A',
                courseId: 'compsci61a',
              },
              {
                type: 'course',
                id: 'compsci47a',
                name: 'COMPSCI 47A',
                courseId: 'compsci47a',
              },
            ],
          },
          {
            type: 'multi',
            id: 'compsci61b47b',
            name: 'COMPSCI 61B',
            numRequired: 1,
            hidden: true,
            requirements: [
              {
                type: 'course',
                id: 'compsci61b',
                name: 'COMPSCI 61B',
                courseId: 'compsci61b',
              },
              {
                type: 'course',
                id: 'compsci47b',
                name: 'COMPSCI 47B',
                courseId: 'compsci47b',
              },
            ],
          },
          {
            type: 'multi',
            id: 'compsci61c47c',
            name: 'COMPSCI 61C',
            numRequired: 1,
            hidden: true,
            requirements: [
              {
                type: 'course',
                id: 'compsci61c',
                name: 'COMPSCI 61C',
                courseId: 'compsci61c',
              },
              {
                type: 'course',
                id: 'compsci47c',
                name: 'COMPSCI 47C',
                courseId: 'compsci47c',
              },
            ],
          },
          {
            type: 'course',
            id: 'eecs16a',
            name: 'EECS 16A',
            courseId: 'eecs16a',
          },
          {
            type: 'course',
            id: 'eecs16b',
            name: 'EECS 16B',
            courseId: 'eecs16b',
          },
        ],
      },
      {
        id: 'eecs_upper_div',
        name: 'Upper Division',
        requirements: [
          {
            type: 'unit',
            id: 'eecs_upper_div',
            name: 'Upper Division',
            units: 20,
            requirement: {
              type: 'tag',
              id: 'eecs_upper_div_course',
              name: 'EECS Upper Division Course',
              tagId: 'eecs_upper_div',
            },
          },
        ],
      },
      {
        id: 'eecs_ethics',
        name: 'Ethics',
        requirements: [
          {
            type: 'tag',
            id: 'eecs_ethics',
            name: 'EECS Ethics Course',
            tagId: 'eecs_ethics',
          },
        ],
      },
    ],
  },
  {
    id: 'linguis',
    name: 'Linguistics Major',
    parentId: 'ls',
    type: 'major',
    requirementCategories: [
      {
        id: 'linguis100',
        name: 'LINUIGS 100',
        requirements: [
          {
            type: 'course',
            id: 'linguis100',
            name: 'LINGUIS 100',
            courseId: 'linguis100',
          },
        ],
      },
      {
        id: 'linguis_core',
        name: 'Core',
        requirements: [
          {
            type: 'multi',
            id: 'linguis_core',
            name: 'Linguistics Core',
            numRequired: 4,
            requirements: [
              {
                type: 'course',
                id: 'linguis110',
                name: 'LINGUIS 110',
                courseId: 'linguis110',
              },
              {
                type: 'course',
                id: 'linguis111',
                name: 'LINGUIS 111',
                courseId: 'linguis111',
              },
              {
                type: 'course',
                id: 'linguis115',
                name: 'LINGUIS 115',
                courseId: 'linguis115',
              },
              {
                type: 'course',
                id: 'linguis120',
                name: 'LINGUIS 120',
                courseId: 'linguis120',
              },
              {
                type: 'course',
                id: 'linguis130',
                name: 'LINGUIS 130',
                courseId: 'linguis130',
              },
            ],
          },
        ],
      },
      {
        id: 'linguis_electives',
        name: 'Electives',
        requirements: [
          {
            type: 'unit',
            id: 'lingius_electives',
            name: 'Linguistics Electives',
            units: 10,
            requirement: {
              type: 'tag',
              id: 'linguis_elective',
              name: 'Linguistics Elective',
              tagId: 'linguis_elective',
            },
          },
        ],
      },
    ],
  },
];

const DUMMY_TAG_DATA = [
  {
    id: 'upper_div',
    name: 'Upper Division Course',
  },
  {
    id: 'ac',
    name: 'American Cultures',
  },
  {
    id: 'rc_a',
    name: 'Reading and Composition Part A',
  },
  {
    id: 'rc_b',
    name: 'Reading and Composition Part B',
  },
  {
    id: 'ls_arts',
    name: 'L&S Arts and Literature',
  },
  {
    id: 'ls_bio',
    name: 'L&S Biological Science',
  },
  {
    id: 'ls_hist',
    name: 'L&S Historical Studies',
  },
  {
    id: 'ls_inter',
    name: 'L&S International Studies',
  },
  {
    id: 'ls_philo',
    name: 'L&S Philosophy and Values',
  },
  {
    id: 'ls_phys',
    name: 'L&S Physical Science',
  },
  {
    id: 'ls_socio',
    name: 'L&S Social and Behavioral Sciences',
  },
  {
    id: 'eecs_ethics',
    name: 'EECS Ethics Course',
  },
  {
    id: 'eecs_upper_div',
    name: 'EECS Upper Division Course',
  },
  {
    id: 'linguis_elective',
    name: 'Linguistics Elective',
  },
];

const DUMMY_USERS = [
  {
    username: 'admin',
    password: 'admin',
    userdata: {
      semesters: [
        {
          id: 'fa2019',
          name: 'Fall 2019',
          courseIds: [],
        },
        {
          id: 'sp2020',
          name: 'Spring 2020',
          courseIds: [],
        },
        {
          id: 'fa20',
          name: 'Fall 2020',
          courseIds: [],
        },
        {
          id: 'sp2021',
          name: 'Spring 2021',
          courseIds: [],
        },
        {
          id: 'fa21',
          name: 'Fall 2021',
          courseIds: [],
        },
        {
          id: 'sp2022',
          name: 'Spring 2022',
          courseIds: [],
        },
        {
          id: 'fa22',
          name: 'Fall 2022',
          courseIds: [],
        },
        {
          id: 'sp2023',
          name: 'Spring 2023',
          courseIds: [],
        },
      ],
    },
  },
];

db.connect()
  .then((c) => {
    conn = c;
    return Tag.deleteMany({});
  })
  .then(() => {
    return Tag.insertMany(DUMMY_TAG_DATA);
  })
  .then(() => {
    return Course.deleteMany({});
  })
  .then(() => {
    return Course.insertMany(DUMMY_COURSE_DATA);
  })
  .then(() => {
    return RequirementSet.deleteMany({});
  })
  .then(() => {
    return RequirementSet.insertMany(DUMMY_REQUIREMENT_DATA);
  })
  .then(() => {
    return User.deleteMany({});
  })
  .then(() => {
    return User.insertMany(DUMMY_USERS);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    conn.close();
  });
