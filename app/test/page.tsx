// app/test/page.tsx

import  prisma  from "@/lib/db";

export default async function TestPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>

      {users.map((u) => (
        <div key={u.id}>
          {u.name}
          {u.email}
          {u.createdAt.toISOString()}
          {u.updatedAt.toISOString()}
          {u.createdAt.toISOString() === u.updatedAt.toISOString() ? " (not updated)" : " (updated)"}
        </div>
      ))}
    </div>
  );
}