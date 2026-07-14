// Safe, standalone script that seeds ONLY the Solution collection.
// It does NOT delete or touch Users or QuizSets.
//
// Run from the project root with: node seedSolutionsOnly.js

const db = require('./server/config/connection');
const { Solution } = require('./server/models');

const solutions = [
    // Depression solutions
    {
        condition: 'depression',
        title: 'Cognitive Behavioral Therapy (CBT)',
        summary: 'A brief evidence-based therapy to help you recognize and reframe unhelpful thoughts that contribute to depression.',
        description: 'Work with a therapist to identify and change negative thought patterns.',
        category: 'professional-help',
        steps: [
            'Find a licensed therapist trained in CBT',
            'Attend regular sessions',
            'Practice thought-challenging exercises at home',
            'Monitor your mood and thoughts in a journal'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'depression',
        title: 'Physical Exercise',
        summary: 'Regular physical activity can lift your mood, help manage stress, and improve energy levels.',
        description: 'Regular exercise can significantly improve mood and reduce depressive symptoms.',
        category: 'lifestyle',
        steps: [
            'Start with 10-15 minute walks daily',
            'Gradually increase to 30 minutes of moderate activity',
            'Try activities you enjoy (dancing, sports, cycling)',
            'Exercise with a friend for accountability'
        ],
        resources: ['Mayo Clinic Exercise Guide', 'Local gym or fitness classes']
    },
    {
        condition: 'depression',
        title: 'Connect with Others',
        summary: 'Regular social support can reduce feelings of isolation and provide practical help during difficult times.',
        description: 'Social connection is crucial for managing depression.',
        category: 'coping-strategy',
        steps: [
            'Reach out to one friend or family member today',
            'Join a support group (online or in-person)',
            'Schedule regular social activities',
            "Be honest about how you're feeling"
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'She Writes Woman']
    },
    {
        condition: 'depression',
        title: 'Crisis Resources',
        summary: 'If you are in immediate danger or having self-harm thoughts, seek help now using crisis or emergency services.',
        description: "If you're having thoughts of self-harm, reach out immediately.",
        category: 'emergency',
        steps: [
            'Contact a trusted friend or family member immediately',
            'Visit your nearest hospital or emergency medical center',
            'Reach out to a local mental health support organization',
            'Call local emergency services if you are in immediate danger'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    // Anxiety solutions
    {
        condition: 'anxiety',
        title: 'Deep Breathing Exercises',
        summary: 'Controlled breathing can quickly lower feelings of panic and help you feel grounded.',
        description: 'Simple breathing techniques can calm your nervous system.',
        category: 'coping-strategy',
        steps: [
            'Find a quiet place to sit',
            'Inhale slowly for 4 counts',
            'Hold for 4 counts',
            'Exhale for 4 counts',
            'Repeat 5-10 times'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'anxiety',
        title: 'Gradual Exposure Therapy',
        summary: 'Facing fears step by step with a trained therapist can reduce anxiety over time.',
        description: 'Safely face anxiety triggers with professional guidance.',
        category: 'professional-help',
        steps: [
            'Work with a therapist to identify triggers',
            'Create a hierarchy of feared situations',
            'Practice exposure in safe, controlled settings',
            'Celebrate progress and build confidence'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'anxiety',
        title: 'Limit Caffeine and Sleep',
        summary: 'Small lifestyle changes can ease physical anxiety symptoms and improve overall calm.',
        description: 'Lifestyle changes can reduce anxiety symptoms.',
        category: 'lifestyle',
        steps: [
            'Reduce coffee intake to 1-2 cups daily',
            'Aim for 7-9 hours of sleep',
            'Avoid screens 1 hour before bed',
            'Keep a consistent sleep schedule'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'Mind Matters Nigeria']
    },
    {
        condition: 'anxiety',
        title: 'Progressive Muscle Relaxation',
        summary: 'This technique helps reduce bodily tension, which can lower feelings of anxiety.',
        description: 'Tense and release muscle groups to release physical tension.',
        category: 'coping-strategy',
        steps: [
            'Start with your toes; tense for 5 seconds',
            'Release and notice the relaxation',
            'Move up through each muscle group',
            'End with your face and head'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    // PTSD solutions
    {
        condition: 'ptsd',
        title: 'Trauma-Focused Cognitive Behavioral Therapy',
        summary: 'A therapy that helps process traumatic memories safely while reducing PTSD symptoms.',
        description: 'Evidence-based therapy specifically designed for PTSD.',
        category: 'professional-help',
        steps: [
            'Find a trauma-specialized therapist',
            'Attend regular sessions (typically 8-12)',
            'Work on processing the traumatic memory',
            'Learn coping strategies for triggers'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'ptsd',
        title: 'Create a Safety Plan',
        summary: 'A written plan can help you respond calmly when PTSD symptoms arise.',
        description: 'Develop strategies to feel safe and manage triggers.',
        category: 'coping-strategy',
        steps: [
            'Identify your personal triggers',
            'List calming activities that help',
            'Plan safe places you can go',
            'Share your plan with trusted people'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    // Schizophrenia solutions
    {
        condition: 'schizophrenia',
        title: 'Medication Management',
        summary: 'Consistent medication under medical supervision is key to managing schizophrenia symptoms.',
        description: 'Antipsychotic medications are a cornerstone of treatment.',
        category: 'professional-help',
        steps: [
            'Work with a psychiatrist to find the right medication',
            'Take medication as prescribed',
            'Attend regular check-ups',
            'Report side effects to your doctor'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'schizophrenia',
        title: 'Build a Support Network',
        summary: 'Strong support from family, peers, and professionals helps stabilize daily life and recovery.',
        description: 'Family and peer support is essential for recovery.',
        category: 'coping-strategy',
        steps: [
            'Educate family members about schizophrenia',
            'Attend support groups',
            'Find a peer specialist or advocate',
            'Maintain regular contact with supportive people'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'schizophrenia',
        title: 'Maintain Routine and Structure',
        summary: 'A stable daily routine can reduce confusion and support mental wellness.',
        description: 'Daily routine supports stability and recovery.',
        category: 'lifestyle',
        steps: [
            'Wake up and go to bed at consistent times',
            'Plan daily activities',
            'Include exercise and social time',
            'Limit stress and alcohol'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    // Addiction solutions
    {
        condition: 'addiction',
        title: 'Professional Treatment Programs',
        summary: 'Structured treatment programs can provide medical, psychological, and social support for recovery.',
        description: 'Seek evidence-based addiction treatment.',
        category: 'professional-help',
        steps: [
            'Contact a local addiction treatment center',
            'Explore inpatient or outpatient programs',
            'Attend counseling sessions',
            'Consider medication-assisted treatment if advised'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'addiction',
        title: 'Join a Support Group',
        summary: 'Peer support groups can keep you accountable and motivated through recovery.',
        description: 'Connect with others in recovery for ongoing support.',
        category: 'coping-strategy',
        steps: [
            'Find a local addiction support group',
            'Attend regularly (daily if possible)',
            'Get a sponsor or accountability partner',
            'Practice recovery routines with peers'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria']
    },
    {
        condition: 'addiction',
        title: 'Identify and Avoid Triggers',
        summary: 'Recognizing triggers is a strong first step toward reducing the risk of relapse.',
        description: 'Recognize and plan for situations that may lead to relapse.',
        category: 'coping-strategy',
        steps: [
            'List your personal triggers',
            'Plan alternative activities',
            'Remove access to substances',
            'Tell others about your recovery goals'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'The Lighthouse Nigeria', 'Local recovery support groups']
    },
    {
        condition: 'addiction',
        title: 'Rebuild Your Life',
        summary: 'Positive routines and meaningful goals can support long-term recovery and wellbeing.',
        description: 'Focus on meaningful activities and relationships.',
        category: 'lifestyle',
        steps: [
            'Reconnect with positive relationships',
            'Pursue hobbies and interests',
            'Set realistic goals',
            'Take care of your physical health'
        ],
        resources: ['Mentally Aware Nigeria Initiative (MANI)', 'Mind Matters Nigeria']
    }
];

db.once('open', async () => {
    try {
        for (const solution of solutions) {
            const exists = await Solution.findOne({
                condition: solution.condition,
                title: solution.title,
            });
            if (!exists) {
                await Solution.create(solution);
                console.log(`Added: [${solution.condition}] ${solution.title}`);
            } else {
                console.log(`Skipped (already exists): [${solution.condition}] ${solution.title}`);
            }
        }
        console.log('Solutions seeding complete. No users or quiz data were touched.');
    } catch (err) {
        console.error('Error seeding solutions:', err.message);
    } finally {
        process.exit(0);
    }
});