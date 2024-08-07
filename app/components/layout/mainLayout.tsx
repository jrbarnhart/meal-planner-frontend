import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Form, Link, useLocation } from "@remix-run/react";
import Icon from "~/svg/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function InfoHeader({ username }: { username?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-4 py-2 shadow-md flex justify-between items-center">
      <Link to={"/"}>
        <Icon height={48} width={48} />
      </Link>
      <div className="grid grid-flow-col gap-3 items-center">
        <div className="grid grid-flow-col gap-x-1">
          <p>Welcome, </p>
          <Link className="text-green-600 underline" to={"/user"}>
            {username || "Guest"}
          </Link>
        </div>
        {username ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="p-2 aspect-square rounded-full">X</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Log out?</DialogTitle>
              <DialogDescription>
                Your recipe list and meal plans will be there when you come
                back.
              </DialogDescription>
              <Form method="post">
                <Button className="w-full" onClick={() => setOpen(false)}>
                  Logout
                </Button>
              </Form>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    </div>
  );
}

function Nav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { pathname } = useLocation();

  return (
    <Card
      className={`absolute bottom-1/4 left-0 p-2 bg-card transition-all duration-300 ease-in-out rounded-l-none ${
        isOpen
          ? "w-48"
          : "w-20 shadow-none border-transparent bg-transparent opacity-55"
      }`}
    >
      <nav className="flex items-center gap-2">
        <Button
          className={`h-28 flex-shrink-0 w-14 ${isOpen ? "" : "opacity-35"}`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p
            className={`${
              isOpen ? "rotate-180" : ""
            } transition-all duration-300 ease-in-out`}
          >
            &gt;
          </p>
        </Button>
        <div
          className={`flex flex-col space-y-2 overflow-hidden transition-all duration-300 ${
            isOpen ? "w-44 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <Button className="w-full" onClick={() => setIsOpen(false)} asChild>
            <Link to={pathname.endsWith("/recipes") ? "/meals" : "/recipes"}>
              {pathname.endsWith("/recipes") ? "Meals" : "My Recipes"}
            </Link>
          </Button>
          <Button className="w-full" onClick={() => setIsOpen(false)} asChild>
            <Link
              to={
                pathname.startsWith("/recipes/library")
                  ? "/meals"
                  : "/recipes/library"
              }
            >
              {pathname.startsWith("/recipes/library")
                ? "Meals"
                : "Recipe Library"}
            </Link>
          </Button>
        </div>
      </nav>
    </Card>
  );
}

export default function MainLayout({
  children,
  username,
}: {
  children: React.ReactNode;
  username?: string;
}) {
  return (
    <div className="relative h-full grid grid-rows-[min-content_1fr] grid-cols-1 overflow-hidden">
      <InfoHeader username={username} />
      {children}
      <Nav />
    </div>
  );
}
