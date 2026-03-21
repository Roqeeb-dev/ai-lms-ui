import Image from "next/image";

export function CourseThumbnail({
  url,
  title,
}: {
  url?: string;
  title: string;
}) {
  if (url) {
    return (
      <div className="relative w-full h-36">
        <Image
          src={url}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    );
  }
  return (
    <div className="w-full h-36 bg-muted flex items-center justify-center">
      <span className="text-3xl opacity-20">📚</span>
    </div>
  );
}
