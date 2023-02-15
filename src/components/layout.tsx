import { Sidebar } from "./sidebar";

export const Layout = ({ children }: React.PropsWithChildren) => {
  const sideBarWidth = 56;
  return (
    <>
      <Sidebar width={sideBarWidth} />
      <main className={`p-2 sm:ml-${sideBarWidth}`}>{children}</main>
    </>
  );
};
