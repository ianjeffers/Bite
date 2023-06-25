import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomeScreen from './screens/HomeScreen';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { REACT_APP_CLERK_PUBLISHABLE_KEY } from '@env';
import UserContextProvider from './contexts/UserContextProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (!REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

if (typeof global.setImmediate === 'undefined') {
    global.setImmediate = setTimeout;
}

const queryClient = new QueryClient();

export default function App() {
    return (
        <SafeAreaProvider>
        <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
            <SignedIn>
                <QueryClientProvider client={queryClient}>
                    <UserContextProvider>
                        <HomeScreen/>
                    </UserContextProvider>
                </QueryClientProvider>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
        </SafeAreaProvider>
    );
}
