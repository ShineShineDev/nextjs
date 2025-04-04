import Link from 'next/link'
export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link href="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" href="/blog">back to blog</Link>
            </li>
         
        </ul>
        {children}
    </section>
}