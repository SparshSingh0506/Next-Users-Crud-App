"use server";

import { db } from '@/db/index';
import { users, type NewUser } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllUsers() {
  try {
    return await db.select().from(users); // SELECT * FROM users
    // await is also optional, as drizzle functions return promises itself
  }

  catch (error) {
    console.error(error);
    throw new Error("Failed to get Users." );
  }
}

export async function createUser(newUser: NewUser) {
  try {
    await db.insert(users).values(newUser); // INSERT INTO users({a, b}) VALUE ({newUser})
  }

  catch (error) {
    console.error(error);
    throw new Error("Failed to create User");
  }
}

export async function updateUser(id: string, user: NewUser) {
  try {
    await db.update(users).set(user).where(eq(users.id, id)); // INSERT INTO users({a, b}) VALUE ({user})
  }

  catch (error) {
    console.error(error);
    throw new Error("Failed to update user.");
  }
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
  }

  catch (error) {
    console.error(error);
    throw new Error("Failed to delete user." );
  }
}

/*
  Function will be called as:
  await createUser({
    id: "123",
    email: "abc@gmail.com",
    username: "rahul"
  });
*/
