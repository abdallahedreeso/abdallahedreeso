import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { CinematicViewportLayout } from '@/components/layout/CinematicViewportLayout';

const Index: React.FC = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <CinematicViewportLayout />
    </LazyMotion>
  );
};

export default Index;
