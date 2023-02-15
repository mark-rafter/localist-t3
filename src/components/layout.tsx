import { Sidebar } from "./sidebar";

export const Layout = ({ children }: React.PropsWithChildren) => (
  <>
    <Sidebar />
    <main className="p-2 sm:ml-56">{children}</main>
  </>
);
