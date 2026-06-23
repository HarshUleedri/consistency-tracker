import Sidebar from "@/components/common/Sidebar";

export default async function layout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
