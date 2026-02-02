import { db, doc, getDoc, setDoc, updateDoc, collection, addDoc, getDocs, query, orderBy } from '../firebase';

// Roadmap Services
export const getRoadmap = async (userId) => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    let roadmap = userDoc.data()?.roadmap || [];

    if (roadmap.length === 0) {
        // Generate default roadmap
        roadmap = [
            { id: '1', task: 'Complete "Know Your Campus" Orientation', status: 'todo', resources: ['Student Handbook', 'Campus Map App'] },
            { id: '2', task: 'Join One Technical or Social Club', status: 'todo', resources: ['Student Union List', 'Seniors Advice'] },
            { id: '3', task: 'Master the Basics: First Year Maths', status: 'todo', resources: ['Khan Academy - Calculus', 'Library - Engg Math'] },
            { id: '4', task: 'Meet your Academic Mentor', status: 'todo', resources: ['Department Office', 'Email Guide'] },
            { id: '5', task: 'Set up a comfortable Hostel/Study space', status: 'todo', resources: ['Ergonomic Tips', 'Roommate Agreements'] }
        ];
        await updateDoc(doc(db, 'users', userId), { roadmap });
    }
    return roadmap;
};

export const updateRoadmapStatus = async (userId, taskId, status) => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const roadmap = userDoc.data()?.roadmap || [];
    const updatedRoadmap = roadmap.map(item =>
        item.id === taskId ? { ...item, status } : item
    );
    await updateDoc(doc(db, 'users', userId), { roadmap: updatedRoadmap });
    return updatedRoadmap;
};

// Planner Services
export const getPlannerEvents = async (userId) => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.data()?.plannerEvents || [];
};

export const addPlannerEvent = async (userId, event) => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const events = userDoc.data()?.plannerEvents || [];
    const newEvent = { ...event, id: Date.now().toString() };
    events.push(newEvent);
    await updateDoc(doc(db, 'users', userId), { plannerEvents: events });
    return events;
};

// Discussion Services
export const getDiscussions = async () => {
    const q = query(collection(db, 'discussions'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createDiscussion = async (discussionData) => {
    const docRef = await addDoc(collection(db, 'discussions'), {
        ...discussionData,
        replies: [],
        createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...discussionData };
};

export const addReply = async (discussionId, reply) => {
    const discussionRef = doc(db, 'discussions', discussionId);
    const discussionDoc = await getDoc(discussionRef);
    const replies = discussionDoc.data()?.replies || [];
    replies.push({ ...reply, createdAt: new Date().toISOString() });
    await updateDoc(discussionRef, { replies });
    return replies;
};
