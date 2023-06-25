import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeScreen from './screens/HomeScreen';
import MindMapScreen from './screens/MindMapScreen';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from '@env';
import UserContextProvider from './contexts/UserContextProvider';

if (!REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

if (typeof global.setImmediate === 'undefined') {
    global.setImmediate = setTimeout;
}

const queryClient = new QueryClient();

export default function App() {
    return (
        <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
            <SignedIn>
                <QueryClientProvider client={queryClient}>
                    <UserContextProvider>
                        <HomeScreen/>
                        {/* <MindMapScreen/> */}
                    </UserContextProvider>
                </QueryClientProvider>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
    );
}
