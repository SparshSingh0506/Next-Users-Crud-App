import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

//export type User = typeof users.$inferSelect; // all values are required
export type NewUser = typeof users.$inferInsert; // makes default values like defaultRandom(), defaultNow() etc optional.

/*
  this drizzle feature automatically creates ts type as
  type User = {
    id: string;
    email: string;
    username: string;
    ...
  };
*/

/*
TABLE: users
┌─────────────────────────────────────┐
│ id       │ UUID      │ PRIMARY KEY  │
│ email    │ TEXT      │ UNIQUE       │
│ username │ TEXT      │ UNIQUE       │
│ password │ TEXT      │ NOT NULL     │
└─────────────────────────────────────┘
......
*/