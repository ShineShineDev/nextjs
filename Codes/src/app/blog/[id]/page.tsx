"use client"
import { useParams } from 'next/navigation';

export default function Home() {
  const { id } = useParams(); // Access the dynamic parameter directly using useParams()

  return (
    <div>
      Blog id: {id}
    </div>
  );
}
