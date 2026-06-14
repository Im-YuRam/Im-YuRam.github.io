// src/components/SkillAccordionSequenced.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  openTapeUrl: string;   
  closeTapeUrl: string;  
  children: React.ReactNode;
}

export default function SkillAccordionSequenced({ openTapeUrl, closeTapeUrl, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPeeling, setIsPeeling] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [height, setHeight] = useState('0px');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const handlePeelAndOpen = () => {
    setIsPeeling(true);
    setTimeout(() => { setIsHeaderHidden(true); }, 400);
    setTimeout(() => {
      setIsOpen(true);
      setIsPeeling(false); 
    }, 500);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsHeaderHidden(false);
    setHeight('0px');

    setTimeout(() => {
      if (accordionRef.current) {
        accordionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 150); // 💡元の位置に戻りやすくするため、前回の提案通り 150ms ほどに設定しておくのがおすすめです！
  };

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [isOpen, children]);

  return (
    <div ref={accordionRef} className="w-full flex flex-col items-center scroll-my-[calc(512/1920*100vw)]">
      
      {/* --- 1. タイル背景（ヘッダー部分） --- */}
      <div 
        className={`w-full h-[calc(96/1920*100vw)] transition-all duration-500 ease-in-out ${
          isHeaderHidden 
            ? 'bg-none shadow-none border-transparent' 
            : 'bg-tile shadow-[0px_20px_20px_0px_rgba(0,0,0,0.05)] border-b border-slate-100'
        }`}
      >
        {!isHeaderHidden && (

          <div className="relative w-full h-full flex justify-center px-[calc(798/1920*100vw)]">

            <button
              onClick={handlePeelAndOpen}
              className={`w-full h-full flex items-center justify-center
                        transition-transform hover:scale-105 cursor-pointer z-20 translate-y-[50%]
                        ${isPeeling ? 'animate-tape-peel' : ''}
              `}
            >
              <img 
                src={openTapeUrl} 
                alt="剥がして開く" 
                className="w-full h-auto object-contain" 
              />
            </button>

          </div>
        )}
      </div>

      {/* --- 2. アコーディオンコンテンツ --- */}
      <div
        style={{ maxHeight: height }}
        className={`w-full overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? 'opacity-100 mt-0' : 'opacity-0'
        }`}
      >
        <div ref={contentRef} className="flex flex-col items-center">
          <div className="w-full px-[calc(258/1920*100vw)]">
            {children}
          </div>

          {/* 💡【閉じる用テープへの適用例】
            `w-auto` から `w-full` に変更し、横幅いっぱいに広げた上で
            左右パディング `px-[calc(798/1920*100vw)]` を指定しました。
            これにより、1920pxの画面幅のとき、ボタンの左右にぴったり798pxずつの余白が生まれます。
          */}
          <div className="pb-[calc(48/1920*100vw)] w-full flex justify-center px-[calc(798/1920*100vw)]">
            <button
              onClick={handleClose}
              className="w-full transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <img src={closeTapeUrl} alt="閉じる" className="object-contain w-full h-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}