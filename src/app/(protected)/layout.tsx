import Sidebar from "@/components/common/Sidebar";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-10 sm:pt-0">{children}</main>
      </div>
    </>
  );
}
