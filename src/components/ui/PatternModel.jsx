import React from 'react';

export default function PatternModel() {
  return (
    <div className="w-full px-6 py-12 flex justify-center bg-surface border-y border-borderLine overflow-hidden relative">
      <div className="w-full max-w-5xl h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-borderLine relative group cursor-pointer">
        <div className="pattern-container"></div>
      </div>
    </div>
  );
}
