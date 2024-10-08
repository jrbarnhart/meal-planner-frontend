import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Form, Link, useLocation } from "@remix-run/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FavIcon from "../icons/favIcon";

function InfoHeader({ username }: { username?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4 py-2 shadow-md md:shadow-none flex justify-between items-center 2xl:max-w-[1920px] 2xl:w-full 2xl:justify-self-center 2xl:py-0">
      <Link to={"/"}>
        <img
          src="/meal-planner/titleOpt.svg"
          alt="Munchlify title"
          className="hidden lg:inline w-24 h-auto"
        />
        <FavIcon className="size-10 lg:hidden" />
      </Link>
      <div className="max-w-52 h-[52px] sm:max-w-max grid grid-flow-col gap-3 items-center md:self-start bg-background shadow-inner border pr-1 pl-2 py-1 md:p-2 rounded-l-[25px] rounded-r-[25px] md:rounded-md md:my-2">
        <div className="grid grid-flow-col gap-x-1 md:align-top">
          <p className="md:text-lg">Welcome, </p>
          <Link
            className="text-accent underline md:text-lg pr-1 text-nowrap truncate"
            to={"/user"}
          >
            {username || "Guest"}
          </Link>
        </div>
        {username ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="p-2 aspect-square rounded-full md:rounded-md md:min-w-20 md:h-9">
                <span className="md:hidden">X</span>
                <span className="hidden md:inline">Logout</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Log out?</DialogTitle>
              <DialogDescription>
                Your recipe list and meal plans will be there when you come
                back.
              </DialogDescription>
              <Form method="post" className="flex justify-center">
                <Button
                  className="w-full md: max-w-72"
                  onClick={() => setOpen(false)}
                >
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

function MobileNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { pathname } = useLocation();

  return (
    <Card
      className={`absolute md:hidden top-0 left-16 p-2 pt-[10px] bg-transparent border-none shadow-none transition-all duration-300 ease-in-out rounded-l-none ${
        isOpen ? "h-48" : "h-20"
      }`}
    >
      <Button
        className={`h-12 flex-shrink-0 w-14 self-start mb-1`}
        onClick={() => setIsOpen((prev) => !prev)}
        asChild
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </Button>
      <nav
        className={`p-2 flex flex-col items-center gap-2 rounded-md ${
          isOpen ? "bg-card border shadow-md" : "bg-transparent"
        }`}
      >
        <div
          className={`w-44 flex flex-col space-y-2 overflow-hidden transition-all duration-300 ${
            isOpen ? "h-auto opacity-100" : "h-0 opacity-0"
          }`}
        >
          <Button
            variant={pathname === "/meals" ? "secondary" : "default"}
            className="w-full"
            onClick={() => setIsOpen(false)}
            asChild
          >
            <Link to={"/meals"}>Meals</Link>
          </Button>
          <Button
            variant={pathname === "/recipes" ? "secondary" : "default"}
            className="w-full"
            onClick={() => setIsOpen(false)}
            asChild
          >
            <Link to={"/recipes"}>Recipes</Link>
          </Button>
          <Button
            variant={pathname === "/recipes/library" ? "secondary" : "default"}
            className="w-full"
            onClick={() => setIsOpen(false)}
            asChild
          >
            <Link to={"/recipes/library"}>Recipe Library</Link>
          </Button>
        </div>
      </nav>
    </Card>
  );
}

function Nav() {
  const { pathname } = useLocation();

  return (
    <nav className="items-center hidden md:flex w-full justify-center">
      <div
        aria-hidden
        className="shadow-md border-b flex-grow border-b-1 h-full"
      />
      <Button
        variant={pathname === "/meals" ? "ghost" : "default"}
        className={`rounded-br-none rounded-bl-none border-b shadow-md hover:bg-background hover:text-foreground ${
          pathname === "/meals"
            ? "border-b-transparent shadow-inner bg-background"
            : ""
        }`}
        asChild
      >
        <Link to={"/meals"}>Meals</Link>
      </Button>
      <div aria-hidden className="shadow-md w-2 border-b h-full" />
      <Button
        variant={pathname === "/recipes" ? "ghost" : "default"}
        className={`rounded-br-none rounded-bl-none border-b shadow-md hover:bg-background hover:text-foreground ${
          pathname === "/recipes"
            ? "border-b-transparent shadow-inner bg-background"
            : ""
        }`}
        asChild
      >
        <Link to={"/recipes"}>Recipes</Link>
      </Button>
      <div aria-hidden className="shadow-md w-2 border-b h-full" />
      <Button
        variant={pathname === "/recipes/library" ? "ghost" : "default"}
        className={`rounded-br-none rounded-bl-none border-b shadow-md hover:bg-background hover:text-foreground ${
          pathname === "/recipes/library"
            ? "border-b-transparent shadow-inner bg-background"
            : ""
        }`}
        asChild
      >
        <Link to={"/recipes/library"}>Recipe Library</Link>
      </Button>
      <div aria-hidden className="shadow-md w-2 border-b h-full" />
      <Button
        variant={pathname === "/recipes/add" ? "ghost" : "default"}
        className={`rounded-br-none rounded-bl-none border-b shadow-md hover:bg-background hover:text-foreground ${
          pathname === "/recipes/add"
            ? "border-b-transparent shadow-inner bg-background"
            : ""
        }`}
        asChild
      >
        <Link to={"/recipes/add"}>Custom Recipe</Link>
      </Button>
      <div aria-hidden className="shadow-md flex-grow border-b-1 h-full" />
    </nav>
  );
}

export default function MainLayout({
  children,
  username,
}: {
  children: React.ReactNode;
  username?: string;
}) {
  const { pathname } = useLocation();
  return (
    <div className="relative h-full grid grid-rows-[min-content_1fr] md:grid-rows-[min-content_1fr] grid-cols-1 overflow-hidden">
      {pathname !== "/" && pathname !== "/signup" ? (
        <div className="grid relative">
          <InfoHeader username={username} />
          <Nav />
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
            style={{ backgroundImage: "url('/meal-planner/splash.jpeg')" }}
          ></div>
          <div className="absolute inset-0 w-full h-full -z-10 bg-white opacity-70 backdrop-blur-md"></div>
        </div>
      ) : null}
      {children}
      {pathname !== "/" && pathname !== "/signup" ? <MobileNav /> : null}
    </div>
  );
}
