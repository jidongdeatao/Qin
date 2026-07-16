import type { Metadata } from "next";
import { DocumentReader } from "@/components/DocumentReader";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "阅读档案",
};

export default async function ReaderPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <DocumentReader fileId={id} />
    </div>
  );
}
