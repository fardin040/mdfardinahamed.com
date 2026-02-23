'use client'

import React, { useEffect, useState } from 'react'

const themes = [
    { name: 'blue', color: 'bg-blue-500' },
    { name: 'emerald', color: 'bg-emerald-500' },
    { name: 'violet', color: 'bg-violet-500' },
    { name: 'rose', color: 'bg-rose-500' },
]

export default function ThemeColorPicker() {
    const [currentTheme, setCurrentTheme] = useState('blue');

    useEffect(() => {
        const savedTheme = localStorage.getItem('site-theme') || 'blue';
        setCurrentTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const changeTheme = (theme: string) => {
        setCurrentTheme(theme);
        localStorage.setItem('site-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    return (
        <div className="flex items-center gap-1.5 p-1 glass rounded-full">
            {themes.map((t) => (
                <button
                    key={t.name}
                    onClick={() => changeTheme(t.name)}
                    aria-label={`Switch to ${t.name} theme`}
                    className={`w-6 h-6 rounded-full ${t.color} transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border ${currentTheme === t.name ? 'ring-2 ring-offset-2 ring-border shadow-md scale-105' : ''
                        }`}
                />
            ))}
        </div>
    );
}
