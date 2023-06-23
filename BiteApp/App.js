import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from '@env';
import UserContextProvider from './contexts/UserContextProvider';

if (!REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}


export default function App() { //TODO -> Do this same process to protect MindMap/Profile
    return (
        <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
            <SignedIn>
                <UserContextProvider>
                    <HomeScreen/>
                </UserContextProvider>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
    );
}
