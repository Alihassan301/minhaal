import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

// Signature curves for the whole experience.
CustomEase.create('gift', 'M0,0 C0.23,1 0.32,1 1,1');
CustomEase.create('giftInOut', 'M0,0 C0.77,0 0.175,1 1,1');

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };