import React, { createContext, useState, useEffect } from 'react';
import {
    auth, db,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,
    doc, setDoc, getDoc
} from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userDoc.data() });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        setUser({ uid: userCredential.user.uid, email, ...userDoc.data() });
        return userCredential.user;
    };

    const register = async (userData) => {
        const { email, password, name, universityId } = userData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name,
            email,
            universityId: universityId || '',
            profile: { academicBackground: '', learningPreferences: [], personalGoals: [] },
            roadmap: [],
            plannerEvents: [],
            createdAt: new Date().toISOString()
        });

        setUser({ uid: userCredential.user.uid, name, email });
        return userCredential.user;
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
