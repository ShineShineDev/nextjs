
export async function GET(req) {
  return new Response(JSON.stringify({ message: 'User data retrieved successfully' }), {
    status: 200,
  });
}

export async function POST(req) {
  const data = await req.json();
  return new Response(JSON.stringify({ message: 'User created successfully', data }), {
    status: 201,
  });
}
