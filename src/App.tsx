import React from 'react';
import { GiftExperience } from './components/GiftExperience';

interface AppProps {
  /** Play the gift-box opening before the experience. */
  showOpening?: boolean;
}

export function App({ showOpening = true }: AppProps) {
  return <GiftExperience showOpening={showOpening} />;
}