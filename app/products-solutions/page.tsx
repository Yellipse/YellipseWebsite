import Link from 'next/link';

export default function ProductsSolutions() {
    return (
        <>
            <div className="content">
                <h1 className="brand-name text-5xl mb-4">Products & Solutions</h1>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Innovative tools and platforms built by students, for the future.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link
                        href="/"
                        className="btn-purple"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="footer">
                &copy; 2025 Yellipse. All rights reserved.
            </div>
        </>
    );
}
