import { Sidebar } from "./sidebar";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <main className="p-2 sm:ml-64">{children}</main>
    </>
  );
};
