'use client';

import React, { ReactNode } from 'react'
import * as animationData from '../../public/Animation - 1713123755738.json'

//export default function Spinner1() {

//    const defaultOptions = {
//      loop: true,
//      autoplay: true, 
//      animationData: animationData,
//      rendererSettings: {
//        preserveAspectRatio: 'xMidYMid slice'
//      }
//    };

//    return <Lottie options={defaultOptions}
//            height={400}
//            width={400}
//            isStopped={false}
//            isPaused={false}/>
//} 

export const Spinner: React.FC<{ isLoading: boolean, className?: string, children?: ReactNode }> = ({ isLoading, className, children }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    if (isLoading)
        // return <Lottie options={defaultOptions}
        //     height={400}
        //     width={400}
        //     isStopped={false}
        //     isPaused={false} />
        return <p>Loading feed...</p>
    else return <div className={className}>{children}</div>
};