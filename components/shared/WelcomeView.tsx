import React from "react";

interface WelcomeViewProps {
    children: React.ReactNode;
    }


export const WelcomeView = (props: WelcomeViewProps) => {
    return (
        <div className="relative flex justify-center items-center w-screen h-screen bg-welcome-background bg-cover bg-center">
  <div className="absolute inset-0 bg-black opacity-60"></div>
  <div className="relative z-10">
    {props.children} 
    </div>
    </div>
    );
    };