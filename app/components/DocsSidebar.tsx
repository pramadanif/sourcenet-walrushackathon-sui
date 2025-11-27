'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    BookOpen,
    Layers,
    Code,
    Lock,
    Upload,
    ShoppingCart,
    FileCode,
    Database,
    Menu,
    X,
    Home,
    ArrowLeft
} from 'lucide-react';

interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    {
        title: 'Introduction',
        href: '/docs',
        icon: Home,
    },
    {
        title: 'Architecture',
        href: '/docs/architecture',
        icon: Layers,
    },
    {
        title: 'Tech Stack',
        href: '/docs/tech-stack',
        icon: Code,
    },
    {
        title: 'Authentication',
        href: '/docs/authentication',
        icon: Lock,
    },
    {
        title: 'Flows',
        href: '/docs/flows',
        icon: BookOpen,
        children: [
            {
                title: 'Seller Flow',
                href: '/docs/flows/seller',
                icon: Upload,
            },
            {
                title: 'Buyer Flow',
                href: '/docs/flows/buyer',
                icon: ShoppingCart,
            },
        ],
    },
    {
        title: 'Smart Contracts',
        href: '/docs/smart-contracts',
        icon: FileCode,
    },
    {
        title: 'API Reference',
        href: '/docs/api-reference',
        icon: Code,
    },
    {
        title: 'Database',
        href: '/docs/database',
        icon: Database,
    },
];

export default function DocsSidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/docs') {
            return pathname === '/docs';
        }
        return pathname.startsWith(href);
    };

    const NavLink = ({ item }: { item: NavItem }) => {
        const Icon = item.icon;
        const active = isActive(item.href);

        return (
            <Link
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${active
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                    }`}
            >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
            </Link>
        );
    };

    const SidebarContent = () => (
        <nav className="space-y-1">
            {navItems.map((item) => (
                <div key={item.href}>
                    <NavLink item={item} />
                    {item.children && (
                        <div className="ml-8 mt-1 space-y-1">
                            {item.children.map((child) => (
                                <NavLink key={child.href} item={child} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-300 rounded-lg text-black shadow-lg"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-30"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-300 p-6 transition-transform duration-300 z-40 overflow-y-auto ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-black mb-2">📘 Docs</h2>
                    <p className="text-sm text-gray-600">SourceNet Documentation</p>
                </div>

                <Link href="/" className='flex items-center p-2 mb-5'>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <h2 className="text-xl font-medium text-black">Back to Home</h2>
                </Link>

                <SidebarContent />

                <div className="mt-8 pt-6 border-t border-gray-300">
                    <p className="text-xs text-gray-500 mb-2">External Links</p>
                    <a
                        href="https://sui.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-gray-700 hover:text-black mb-2 font-medium"
                    >
                        SUI Documentation →
                    </a>
                    <a
                        href="https://docs.walrus.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-gray-700 hover:text-black font-medium"
                    >
                        Walrus Documentation →
                    </a>
                </div>
            </aside>
        </>
    );
}
