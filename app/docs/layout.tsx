import DocsSidebar from '../components/DocsSidebar';
import './docs.css';

export const metadata = {
    title: 'SourceNet Documentation',
    description: 'Comprehensive documentation for SourceNet decentralized data marketplace',
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#FAF8F1]">
            <DocsSidebar />

            <main className="flex-1 lg:ml-0">
                <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
                    <div className="docs-content">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
