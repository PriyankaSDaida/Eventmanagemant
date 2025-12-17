import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Top Right - Primary Blob */}
                <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-70"></div>
                {/* Bottom Left - Secondary Blob */}
                <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-secondary-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-70"></div>
                {/* Center - Accent Blob */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-70"></div>

                {/* Mesh Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            </div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
