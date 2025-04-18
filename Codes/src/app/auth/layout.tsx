
export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="max-w-xl mx-auto">
            {children}
        </section>
    )
}