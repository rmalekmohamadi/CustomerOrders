'use client'

import React, { ComponentProps, FC, ReactNode } from 'react'
import { Alert } from 'flowbite-react'
import type { FlowbiteColors } from 'flowbite-react';

export const AppAlertClient: React.FC<{ condition: boolean, title?: string, message?: string, icon?: FC<ComponentProps<"svg">>, color?: keyof FlowbiteColors, className?: string, children?: ReactNode }> = 
    ({ condition, title, message, icon, color, className, children }) => {
    if (condition)
        return (<Alert color={color} icon={icon} className="mt-4">
                    <span className="font-medium">{title}</span> {message}
                </Alert>)
    else return <div className={className}>{children}</div>
};